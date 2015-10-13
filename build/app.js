/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP",[
    "ui.router",
    "gaokaoAPP.home",
    "gaokaoAPP.hope",
    //"gaokaoAPP.login",
    "gaokaoAPP.login.childApp"
])
.constant("logoutURL","/logout")
.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/home");
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "html/home/home.html",
                controller:"homeCtr"
            })
            .state("hope", {
                url: "/hope",
                templateUrl: "html/hope/hope.html"
            })
            .state("login", {
                url: "/login",
                templateUrl: "html/login/login.html"
            });
})
.factory('DATA',['$http',function($http){
    var request = function(path,method,data){
        return $http({
            url:path,
            method: method,
            dataType: "json",
            data:data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
    }
    return {
        getRequest : function(path,method,data){
            return request(path,method,data);
        }
    }
}])
.controller("appCtr",['$scope','$http','logoutURL','isShowModel',function($scope,$http,logoutURL,isShowModel){
        $scope.user = {
            islogin : false,
            name : "",
        }

        $scope.user.name = isShowModel.isSigin;

        if($scope.user.name.length>0){
            $scope.user.islogin = true;
        }

        $scope.logoff = function(){
            $http({
                url:logoutURL,
                method:"GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).success(function(data,status){
                debugger;
                isShowModel.isSigin = "";
                $scope.user.islogin = false;
            });
        }
}]);
