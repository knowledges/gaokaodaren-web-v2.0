/**
 * Created by qbl on 2015/11/25.
 */
define(['app','jquery','bootstrap'],function(app,$,bootstrap){

    app.controller("homeCtrl",['$scope','$window','$sce','AJAX','homeService','data_province','displayService',function($scope,$window,$sce,AJAX,homeService,data_province,displayService) {
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