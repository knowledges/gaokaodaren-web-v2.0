/**
 * Created by qbl on 2015/11/25.
 */
define(['app','jquery','bootstrap'],function(app,$,bootstrap){
    app.directive('isLoading',['$rootScope',function($rootScope){
        return{
            restrict: 'A',
            link:function(scope){
                if(scope.$last == true){
                    $rootScope.loading=false;
                }
            }
        }
    }]);
    app.controller("homeCtrl",['$rootScope','$scope','$window','$sce','homeService','data_province','displayService',function($rootScope,$scope,$window,$sce,homeService,data_province,displayService) {
        $scope.table = {
            provincelist:""
        };

        $scope.ishide = displayService.isShow;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);

        init();

        function init() {
            $('.carousel').carousel({
                interval: 5000
            });
            $scope.table.provincelist = data_province.data.response.list;
        }
    }]);
});