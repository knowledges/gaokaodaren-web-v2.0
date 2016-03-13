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
    app.controller("cityCtr",['$scope','$location','AJAX','provinceURL',function($scope,$location,AJAX,provinceURL){

        $scope.menu = {
            provincelist: ""
        }

        init();
        function init() {
            AJAX.getRequest(provinceURL, 'GET', '')/**省份*/
                .success(function (data, status) {
                    $scope.menu.provincelist = data.response.list;
                });
        }
    }]);
});