/**
 * Created by qbl on 2015/11/25.
 */
define(['app','jquery','bootstrap'],function(app,$,bootstrap){

    app.controller("homeCtrl",['$scope','$window','$sce','AJAX','homeService','data_province','data_HomeModel2','data_HomeModel3','data_HomeModel4','data_HomeModel5','data_HomeModel6','data_HomeModel7','displayService',function($scope,$window,$sce,AJAX,homeService,data_province,data_HomeModel2,data_HomeModel3,data_HomeModel4,data_HomeModel5,data_HomeModel6,data_HomeModel7,displayService) {
        $scope.table = {
            tbyl:"",
            fsfx:"",
            zszc:"",
            byqx:"",
            gxtz:"",
            zxxl:""
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
            $scope.table.tbyl = data_HomeModel2.data.response.list;
            $scope.table.fsfx = data_HomeModel3.data.response.list;
            $scope.table.zszc = data_HomeModel4.data.response.list;
            $scope.table.byqx = data_HomeModel5.data.response.list;
            $scope.table.gxtz = data_HomeModel6.data.response.list;
            $scope.table.zxxl = data_HomeModel7.data.response.list;
        }
    }]);
});