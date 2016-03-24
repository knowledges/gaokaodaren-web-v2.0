/**
 * Created by qbl on 2015/10/16.
 */
'use strict';
require(['app'],function(app){
    app.controller("menuCtl",['$scope','$location','$http','loocha','provinceURL',function($scope,$location,$http,loocha,provinceURL){
        $scope.menu = {
            name:"",
            provincelist:"",
            html:""
        };
        $scope.menu.parame = $location.$$search.parame;

        if($scope.menu.parame == 1){
            $scope.menu.name ="各省、直辖市"
        }

        $http.get(loocha+provinceURL)
            .success(function(data,status){
                $scope.menu.provincelist = data.response.list;
            });
    }]);
});
