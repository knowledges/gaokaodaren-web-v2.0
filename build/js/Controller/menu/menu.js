/**
 * Created by qbl on 2015/10/16.
 */
'use strict';
require(['app'],function(app){
    app.constant("navURL_1","../JSON/nav.html");
    app.controller("menuCtl",['$scope','$location','AJAX','provinceURL','navURL_1',function($scope,$location,AJAX,provinceURL,navURL_1){
        $scope.menu = {
            name:"",
            provincelist:"",
            html:""
        };
        $scope.menu.parame = $location.$$search.parame;

        if($scope.menu.parame == 1){
            $scope.menu.name ="各省、直辖市"
        }

        AJAX.getRequest(provinceURL,'GET','')
            .success(function(data,status){
                $scope.menu.provincelist = data.response.list;
            });

        $scope.navigation = function(){
            AJAX.getRequest(navURL_1,'GET','')
                .success(function(data,status){
                    $scope.menu.html = data;
                });
        };

        $scope.proEvent = function(id){
            AJAX.getRequest("../JSON/city.json",'GET',"")
                .success(function(data,status){
                    data.response.list;
                });
        };
    }]);
});