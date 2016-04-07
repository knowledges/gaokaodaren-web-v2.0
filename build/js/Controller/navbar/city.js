/**
 * Created by qbl on 2015/10/16.
 */
'use strict';
require(['app'],function(app){
    app.directive('onFinishRender',['$rootScope','$timeout',function($rootScope,$timeout){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last === true) {
                    $rootScope.loading = false;
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
    app.controller("cityCtr",['$scope','$location','$http','$stateParams','loocha','provinceURL',function($scope,$location,$http,$stateParams,loocha,provinceURL){

        $scope.menu = {
            provincelist: ""
        };

        init();
        function init() {
            $http.get(loocha+provinceURL)
                .success(function (data, status) {
                    $scope.menu.provincelist = data.response.list;
                    $scope.loading=false;
                });
        }

        $scope.$on("methodname", function (ngRepeatFinishedEvent) {
            var idx = $stateParams.code !=undefined ? $stateParams.code :0;
            $(".ulcollapse li").removeClass('actived').eq(idx).addClass("actived");

            $(".ulcollapse li").on('click',function(e){
                $(".ulcollapse li").removeClass('actived');
                $(this).addClass('actived');
            });
        })

    }]);
});