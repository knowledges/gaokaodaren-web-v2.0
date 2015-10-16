/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP",[
    "ui.router",
    "gaokaoAPP.home",
    "gaokaoAPP.hope",
    //"gaokaoAPP.login",
    "gaokaoAPP.login.childApp",
    "gaokaoApp.city.menu"
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
            })
            .state("city",{
                url:"/city",
                templateUrl:"html/city/city.html"
            });
})
.factory('AJAX',['$http',function($http){
    var request = function(path,method,data){
        return $http({
            url:path,
            method: method == undefined ? 'GET':method,
            dataType: "json",
            data:data == undefined ? "":data,
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
.controller("appCtr",['$scope','$http','logoutURL','isShowModel',"AJAX",function($scope,$http,logoutURL,isShowModel,AJAX){
        $scope.user = {
            islogin : false,
            name : "",
        }

        $scope.user.name = isShowModel.isSigin;

        if($scope.user.name.length>0){
            $scope.user.islogin = true;
        }

        $scope.logoff = function(){
            AJAX.getRequest(logoutURL,'GET',"")
                .success(function(data,status){
                    debugger;
                    isShowModel.isSigin = "";
                    $scope.user.islogin = false;
                });
        }

}])
.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
}]);
