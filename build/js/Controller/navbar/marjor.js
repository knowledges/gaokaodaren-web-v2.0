/**
 * Created by qbl on 2015/10/21.
 */

require(['app','jquery'],function(app,jquery){
    app.constant("departURL","/depart/new");
    app.constant("findMarjorURL",'/depart');
    app.controller("marjorConCtl",['$scope','$stateParams','$sce','AJAX','departURL','findMarjorURL',function($scope,$stateParams,$sce,AJAX,departURL,findMarjorURL){

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
            AJAX.getRequest('/article/show/'+id,'GET','')
               .success(function(data,status){
                   $scope.marjor.strHtml = $sce.trustAsHtml(data);
               });
       }

       $scope.findMarjor = function(){
           $scope.marjor.seacrChCon = true;
           $scope.marjor.content = false;
           $scope.search = true;
           var param = {};
           param.depart_type = $stateParams.type;
           param.key = $scope.marjor.key;
           AJAX.getRequest(findMarjorURL,'GET',param)
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
           var param = {};
           param.depart_type = $stateParams.type;
           AJAX.getRequest(departURL,'GET', param)
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
