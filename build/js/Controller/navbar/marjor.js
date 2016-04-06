/**
 * Created by qbl on 2015/10/21.
 */

require(['app','jquery'],function(app,jquery){
    app.constant("departURL","/depart/new");
    app.constant("findMarjorURL",'/depart');
    app.controller("marjorConCtr",['$scope','$stateParams','$sce','$http','loocha','departURL','findMarjorURL',function($scope,$stateParams,$sce,$http,loocha,departURL,findMarjorURL){

        $scope.search = true;
        $scope.marjor = {
            info:false,
            content:true,
            seacrChCon:false,
            key:""
        }

       loading();

       $scope.showInfo = function(id){
            $scope.marjor.info = true;
            $scope.marjor.seacrChCon = false;
            $scope.marjor.content = false;
            $scope.search = false;
            $http.get(loocha+'/article/show/'+id)
               .success(function(data,status){
                   $scope.marjor.strHtml = $sce.trustAsHtml(data);
               });
       }

       $scope.findMarjor = function(){
           $scope.marjor.seacrChCon = true;
           $scope.marjor.content = false;
           $scope.search = true;
           $http.get(loocha+'/depart?depart_type='+$stateParams.type+'&key='+$scope.marjor.key)
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

       function loading(){
           $http.get(loocha+'/depart/new?depart_type='+$stateParams.type)
               .success(function(data,status){
                   $scope.marjorType = data.response;
               })
       }
        $scope.information = function(event){
            $('#myTab li').removeClass();
            $(event.target).parent().addClass('active');
            $(".tab-pane").hide();
            $("#"+$(event.target).data('name')).show();
        }

   }]);
});
