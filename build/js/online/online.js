/**
 * Created by Administrator on 2015/12/3.
 */
'use strict';
require(['app'],function(app){
    app.controller('onlineCtr',['$scope','$sce','homeService','displayService',function($scope,$sce,homeService,displayService){
        $scope.ishide = displayService.isShow;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue,oldValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
    }]);
});