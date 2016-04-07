/**
 * Created by Administrator on 2015/12/3.
 */
'use strict';
require(['app'],function(app){
   app.controller('uniqueCtr',['$scope','$sce','homeService',function($scope,$sce,homeService){
       $scope.ishide = true;
       $scope.service = homeService;
       $scope.insertHTML = "";
       $scope.$watch('service',function(newValue){
           if(newValue.htmlPage!=""){
               $scope.ishide = false;
               $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
           }
       },true);
       $scope.back = function(){
           $scope.ishide = true;
           $scope.insertHTML = "";
       };
   }]);
});
