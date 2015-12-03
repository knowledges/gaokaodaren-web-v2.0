/**
 * Created by Administrator on 2015/12/3.
 */
'use strict';
require(['app'],function(app){
   app.controller('schlCtl',['$scope','$sce','homeService',function($scope,$sce,homeService){
       $scope.ishide = true;
       $scope.service = homeService;
       $scope.insertHTML = "";
       $scope.$watch('service',function(newValue){
           console.log('jinlaile');
           if(newValue.htmlPage!="" && newValue.htmlPage!=undefined){
               $scope.ishide = false;
               $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
           }
       },true);
   }]);
});