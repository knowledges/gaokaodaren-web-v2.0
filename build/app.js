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
    "gaokaoAPP.group.recipe.list",
    "gaokaoAPP.temp.score",
    "gaokaoAPP.group.score",
    "gaokaoAPP.temp.policy",
    "gaokaoAPP.group.policy",
    "gaokaoAPP.temp.job",
    "gaokaoAPP.group.job",
    "gaokaoAPP.temp.unique",
    "gaokaoAPP.group.unique",
    "gaokaoAPP.temp.online",
    "gaokaoAPP.group.online",
    "gaokaoAPP.temp.online.showInfo",
    "gaokaoAPP.about",
    "gaokaoAPP.temp.all",
    "gaokaoAPP.group.all",
    "gaokaoAPP.refer"

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
            .state("refer",{
                url:"/refer",
                templateUrl:"html/refer/refer.html",
                controller:'referCtr'
            })
})
.factory('AJAX',['$http',"$q",function($http,$q){
    var request = function(path,method,data){
        if(method == undefined || method == 'GET'){
            return $http({
                url:path,
                method: 'GET',
                params:data,
            })
        }else{
            var dfd = $q.defer();
            var transform = function (data) {
                return $.param(data);
            }
            var postCfg = {
                transformRequest:transform,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }
            var promise = $http.post(path,data,postCfg).then(function (response) {
                return response;
            });
            return promise;

            //return $http({
            //    url:path,
            //    method: 'POST' ,
            //    dataType: "json",
            //    data:data,
            //    headers: {
            //        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            //    }
            //})
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

        $scope.user.name = sessionStorage.getItem('usernumber');

        if($scope.user.name != null && $scope.user.name.length>= 1){
            $scope.user.islogin = true;
        }else{
            $scope.user.islogin = false;
        }

        $scope.logoff = function(){
            AJAX.getRequest(logoutURL,'GET',"")
                .success(function(data,status){
                    $scope.user.islogin = false;
                    sessionStorage.setItem('usernumber',"");
                    $scope.user.name ="";
                });
        }

}])
.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
}]);
