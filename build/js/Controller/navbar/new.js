/**
 * Created by qbl on 2015/11/18.
 */
angular.module('gaokaoApp.home.new',[])
.constant('homeNewUrl','/menu/main/0?article_limit=999&menu_limit=999')
.controller('LhomeNewCtl',['$scope','$sce','AJAX','homeNewUrl','htmlService',function($scope,$sce,AJAX,homeNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService.htmlPage;
        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.left;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService = data;
                });
        }

}])
.controller('RhomeNewCtl',['$scope','$sce','AJAX','homeNewUrl','htmlService',function($scope,$sce,AJAX,homeNewUrl,htmlService){
        $scope.new = "";
        $scope.htmlService = htmlService.htmlPage;
        AJAX.getRequest(homeNewUrl,'GET','')
            .success(function(data,status){
                $scope.new = data.response.right;
            });

        $scope.info = function(id){
            AJAX.getRequest('/article/show/'+id,'GET','')
                .success(function(data,status){
                    $scope.htmlService = data;
                });
        }
}])