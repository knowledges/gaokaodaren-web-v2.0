/**
 * Created by qbl on 2015/10/21.
 */

require(['app','jquery'],function(app,jquery){
    app.constant("departURL","/depart/new");
    app.constant("findMarjorURL",'/depart');
    app.directive('onFinishRender',['$rootScope','$timeout',function($rootScope,$timeout){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last === true) {
                    $rootScope.loading = false;
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
    app.controller("marjorConCtr",['$scope','$stateParams','$sce','$http','loocha','departURL','findMarjorURL',function($scope,$stateParams,$sce,$http,loocha,departURL,findMarjorURL){

        $scope.search = true;
        $scope.marjor = {
            info:false,
            content:true,
            seacrChCon:false,
            key:""
        };

       loading();

        function loading(){
            $http.get(loocha+'/depart/new?depart_type='+$stateParams.type)
                .success(function(data,status){
                    $scope.marjorType = data.response;
                })
        }
       $scope.showInfo = function(id){
           if(id>0){
               $scope.marjor.info = true;
               $scope.marjor.seacrChCon = false;
               $scope.marjor.content = false;
               $scope.search = false;
               $http.get(loocha+'/article/show/'+id)
                   .success(function(data,status){
                       $scope.marjor.strHtml = $sce.trustAsHtml(data);
                   });
           }else{
               alert("没遇到找到对应的文章！");
           }

       }

       $scope.findMarjor = function(){
           $scope.marjor.seacrChCon = true;
           $scope.marjor.content = false;
           $scope.search = true;
           $http.get(loocha+'/depart?depart_type='+$stateParams.type+'&key='+encodeURI($scope.marjor.key))
               .success(function(data,status){
                   $scope.findList =  data.response;
               });
       }

       $scope.findBack = function(){
           $scope.marjor.info = false;
           $scope.marjor.seacrChCon = false;
           $scope.marjor.content = true;
           $scope.search = true;
       }

        $scope.information = function(event){
            $('#myTab li').removeClass();
            $(event.target).parent().addClass('active');
            $(".tab-pane").hide();
            $("#"+$(event.target).data('name')).show();
        }

        $scope.$on('methodname',function(){
            var idx = $stateParams.type !=undefined ? $stateParams.type :0;
            $(".panel-body li").removeClass('actived').eq(idx).addClass("actived");

            $(".panel-body li").on('click',function(e){
                $(".panel-body li").removeClass('actived');
                $(this).addClass('actived');
            });
        })

   }]);
});
