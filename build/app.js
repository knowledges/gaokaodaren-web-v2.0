/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP",[
    "ui.router",
    "gaokaoAPP.home",
    "gaokaoAPP.hope",
    "gaokaoAPP.chance",
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
    "gaokaoAPP.temp.example",
    "gaokaoAPP.refer",
    "gaokaoAPP.pay",
    "gaokaoAPP.myInfo.myScore"
])
.run(['$rootScope',function($rootScope){
        $rootScope.defaultPage = "#/home";
        $rootScope.studentId = "";
}])
.constant("logoutURL","/logout")
.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when("", "/home");
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "html/home/home.html",
                data: { isPublic: true},
                controller:"homeCtr"
            })
            .state("chance", {
                url: "/chance",
                templateUrl: "html/chance/chance.html",
                data: { isPublic: false},
                controller:"chanceCtr"
            })
            .state("hope", {
                url: "/hope",
                data: { isPublic: false},
                templateUrl: "html/hope/hope.html"
            })
            .state("login", {
                url: "/login",
                data: { isPublic: true},
                templateUrl: "html/login/login.html"
            })
            .state("refer",{
                url:"/refer",
                templateUrl:"html/refer/refer.html",
                data: { isPublic: false},
                controller:'referCtr'
            })
            .state("pay",{
                url:"/pay",
                templateUrl:"html/pay/pay.html",
                data: { isPublic: false},
                controller:'payCtr'
            })
            .state('refer1',{
                url:"/refer1",
                templateUrl:"html/refer/refer1.html",
                data: { isPublic: true}
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
        }
    }
    return {
        getRequest : function(path,method,data){
            return request(path,method,data);
        }
    }
}])
.factory('userService',['$rootScope','$timeout','$q',function ($rootScope,$timeout, $q) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    return {
        // async way how to load user from Server API
        getAuthObject: function () {
            var deferred = $q.defer();

            // later we can use this quick way -
            // - once user is already loaded
            if (user) {
                return $q.when(user);
            }

            // server fake call, in action would be $http
            $timeout(function () {
                // server returned UN authenticated user
                user = {isAuthenticated: false };
                // here resolved after 500ms
                deferred.resolve(user)
            }, 500)

            return deferred.promise;
        },

        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
            return user !== null
                && user.isAuthenticated;
        }
    };
}])
.run(['$rootScope','$state','userService',function ($rootScope, $state, userService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //TODO 路由限制
            //debugger;
            // if already authenticated...
            var isAuthenticated = userService.isAuthenticated();
            // any public action is allowed
            var isPublicAction = angular.isObject(toState.data)
                && toState.data.isPublic === true;

            if (isPublicAction || isAuthenticated) {
                return;
            }

            // stop state change
            event.preventDefault();

            // async load user
            userService.getAuthObject().then(function (user) {

                    var isAuthenticated = user.isAuthenticated === true;

                    if (isAuthenticated) {
                        // let's continue, use is allowed
                        $state.go(toState, toParams)
                        return;
                    }
                    // log on / sign in...
                    $state.go("login");
                })
        })
}])
.controller("appCtr",['$scope','$rootScope','$http','logoutURL','isShowModel',"AJAX",function($scope,$rootScope,$http,logoutURL,isShowModel,AJAX){
        $scope.user = {
            islogin : false,
            name : "",
        }
        $scope.isShow = false;
        $scope.user.name = sessionStorage.getItem('usernumber');

        if($scope.user.name != null && $scope.user.name.length>= 1){
            $scope.user.islogin = true;
        }else{
            $scope.user.islogin = false;
        }

        $scope.$watch('studentId',function(newValue,oldValue){
            if(newValue !=""){
                $scope.user.name = $rootScope.studentId;
                $scope.user.islogin = true;
            }
        })

        $scope.login = function(){
            var url =  window.location.hash.indexOf('hope');
            if(url>=0){
                $scope.isShow = true;
            }else{
                window.location.href = "#/login";
            }
        }

        $scope.close = function(){
            $scope.isShow = false;
        }

        $scope.logoff = function(){
            AJAX.getRequest(logoutURL,'GET',"")
                .success(function(data,status){
                    $scope.user.islogin = false;
                    sessionStorage.setItem('usernumber',"");
                    $scope.user.name ="";
                    window.location.reload();
                });
        }

}])
.controller("pageJumpCtr",['$scope','$window',function($scope,$window){
        $scope.pageJump = function(type,user_level){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level;
            $window.location.reload();
        }
}])

