/**
 * Created by Administrator on 2015/12/3.
 */
'use strict';
require(['app'],function(app){
    app.controller('marjorCtl',['$scope','$sce','homeService',function($scope,$sce,homeService){
        $scope.ishide = true;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);
        init ();
        function init (){
            setTimeout(function(){
                var idx =window.location.href.split("#/marjor/")[1];
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