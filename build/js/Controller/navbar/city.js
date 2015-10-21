/**
 * Created by qbl on 2015/10/16.
 */
angular.module("gaokaoAPP.navbar.citymenu",['ui.router'])
.controller("cityCtl",['$scope','$location','AJAX','provinceURL',function($scope,$location,AJAX,provinceURL){

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