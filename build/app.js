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
    "gaokaoAPP.temp.city",
    "gaokaoAPP.navbar.citymenu",//city.js
    "gaokaoAPP.navbar",//nav.js
    "gaokaoAPP.city.content",
    "gaokaoAPP.temp.school",
    "gaokaoAPP.navbar.School",
    "gaokaoAPP.temp.marjor",
    "gaokaoAPP.navbar.marjor",
    "gaokaoAPP.temp.recipe",
    "gaokaoAPP.group.recipe",
    "gaokaoAPP.group.recipe.list"

])
.constant("logoutURL","/logout")
.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when("", "/home");
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
})
.factory('AJAX',['$http',function($http){
    var request = function(path,method,data){
        if(method == undefined || method == 'GET'){
            return $http({
                url:path,
                method: 'GET',
                params:data,
            })
        }else{
            return $http({
                url:path,
                method: method ,
                dataType: "json",
                data:data == undefined ? "":data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
        }
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
