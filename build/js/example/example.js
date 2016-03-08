/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.controller('exampleAllCtr',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $rootScope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
    }]);
})