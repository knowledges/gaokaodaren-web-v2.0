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

        console.log($stateParams.cityType);

        init();

        function init(){
            AJAX.getRequest(provinceURL,'GET','')/**省份*/
                .success(function(data,status){
                    $scope.menu.provincelist = data.response.list;
                });

            getRequed();
        }

        $scope.navigation = function(){/**导航*/
            getRequed();
        }

        function getRequed(){
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.menu.html = data;
                });
        }

}])