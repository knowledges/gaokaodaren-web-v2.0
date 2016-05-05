/**
 * Created by Administrator on 2015/12/3.
 */
'use strict';
require(['app'],function(app){
    app.directive('onFinishRender',['$rootScope','$timeout',function($rootScope,$timeout){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
   app.controller('schlCtl',['$scope','$sce','$stateParams','homeService',function($scope,$sce,$stateParams,homeService){
       $scope.ishide = true;
       $scope.service = homeService;
       $scope.insertHTML = "";
       $scope.$watch('service',function(newValue){
           if(newValue.htmlPage!="" && newValue.htmlPage!=undefined){
               $scope.ishide = false;
               $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
           }
       },true);

       init ();
       function init (){
           setTimeout(function(){
               var idx =window.location.href.split("#/school/")[1];
               $(".navli,.navli > a").removeClass("actived");

               $.each($(".navli"),function(i,v){
                   if($(v).attr("idx") == idx){
                       $(v).addClass("actived");
                   }
               })

           },1000)
       }

       $scope.addClkCss = function(e){
            var that = $(e.target);
           $(".navli,.navli > a").removeClass("actived");
           that.addClass("actived");
       };
       $scope.back = function(){
           $scope.ishide = true;
           $scope.insertHTML = "";
       };
   }]);
});