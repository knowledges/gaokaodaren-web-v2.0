/**
 * Created by qbl on 2015/10/16.
 */
'use strict';
require(['app'],function(app){
    app.directive('isActive',['$stateParams',function($stateParams){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                var idx = $stateParams.code !=undefined ? $stateParams.code :0;
                $(".ulcollapse li").removeClass('active').eq(idx).addClass("active");

                $(".ulcollapse li").on('click',function(e){
                    $(".ulcollapse li").removeClass('active');
                    $(this).addClass('active');
                });
            }
        }
    }]);
    app.controller("cityCtr",['$scope','$location','$http','loocha','provinceURL',function($scope,$location,$http,loocha,provinceURL){

        $scope.menu = {
            provincelist: ""
        };

        init();
        function init() {
            $http.get(loocha+provinceURL)
                .success(function (data, status) {
                    $scope.menu.provincelist = data.response.list;
                });
        }
    }]);
});