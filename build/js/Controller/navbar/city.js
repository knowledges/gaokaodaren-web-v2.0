/**
 * Created by qbl on 2015/10/16.
 */
angular.module("gaokaoAPP.navbar.city",['ui.router'])
//.constant("navURL_1","/article/show/3289")
.constant("navURL_1","../JSON/nav.html")
.controller("cityCtl",['$scope','$location','AJAX','provinceURL','navURL_1','$stateParams',function($scope,$location,AJAX,provinceURL,navURL_1,$stateParams){
        $scope.menu = {
            cityType:"",
        };

        $scope.menu.cityType = $stateParams;

        init();

        function init() {
            AJAX.getRequest(provinceURL, 'GET', '')/**省份*/
                .success(function (data, status) {
                    $scope.menu.provincelist = data.response.list;
                });
        }
}]);