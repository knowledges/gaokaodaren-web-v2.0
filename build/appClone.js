/**
 * Created by qbl on 2015/11/18.
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

        deassign();
        window.onresize = function(){
            deassign();
        }

        function deassign(){
            var clientHeight = window.innerHeight;
            document.getElementById('content').style.minHeight = (clientHeight-50-54)+"px";
        }

    }])
    .constant("logoutURL","/logout")
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when("", "/home");
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "html/home/home.html",
                controller:"homeCtr",
                data: { isPublic: true}
            })
            .state("chance", {
                url: "/chance",
                templateUrl: "html/chance/chance.html",
                controller:"chanceCtr",
                data: { isPublic: false,isScore: false}
            })
            .state("hope", {
                url: "/hope",
                templateUrl: "html/hope/hope.html",
                data: { isPublic: false}
            })
            .state("login", {
                url: "/login",
                templateUrl: "html/login/login.html",
                controller:"logonCtr",
                data: { isPublic: true}
            })
            .state("register", {
                url: "/register",
                data: { isPublic: true},
                templateUrl: "html/login/register.html",
                controller:"registerCtr"
            })
            .state("forget", {
                url: "/forget",
                templateUrl: "html/login/forget.html",
                controller:"forgetCtr",
                data: { isPublic: true}
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
                controller:'payCtr',
                data: { isPublic: false}
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
                    return dfd.resolve(response) ;
                });
                return dfd.promise;
            }
        }
        return {
            getRequest : function(path,method,data){
                return request(path,method,data);
            }
        }
    }])
    .factory('userService',['$rootScope','$timeout','$q',function ($rootScope,$timeout, $q) {
        var user ={},score={};
        return {
            getAuthObject: function () {
                user = JSON.parse(sessionStorage.getItem('user'));
                var deferred = $q.defer();
                if (user) {
                    return $q.when(user);
                }
                $timeout(function () {
                    user = {isAuthenticated: false};
                    deferred.resolve(user)
                }, 500)
                return deferred.promise;
            },
            getSchoolReport: function () {
                score = JSON.parse(localStorage.getItem('isscore'));
                var deferred = $q.defer();
                if (score) {
                    return $q.when(score);
                }
                $timeout(function () {
                    score = {isAttestation: false};
                    deferred.resolve(score)
                }, 500);
                return deferred.promise;
            },
            isAuthenticated: function () {
                user = JSON.parse(sessionStorage.getItem('user'));
                return user !== null
                    && user.isAuthenticated;
            },
            isAttestation: function () {
                user = JSON.parse(sessionStorage.getItem('user'));
                score = JSON.parse(localStorage.getItem('isscore'));
                return user !== null && user.isAuthenticated && score !== null && score.isAttestation;
            }
        };
    }])
    .run(['$rootScope','$state','$window','$location','userService',function ($rootScope, $state,$location ,$window , userService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if(toState.name =="chance"){
                var isAttestation = userService.isAttestation();
                var isPublicScore = angular.isObject(toState.data) && toState.data.isScore === true;
                if(isAttestation || isPublicScore){
                    return ;
                }
                event.preventDefault();
                userService.getSchoolReport().then(function(score){
                    var isAttestation = score.isAttestation === true;
                    if (isAttestation) {
                        $state.go(toState, toParams)
                        return;
                    }
                    alert('请先创建一份高考成功');
                    $state.go("all");
                })
            }else{
                var isAuthenticated = userService.isAuthenticated();
                var isPublicAction = angular.isObject(toState.data)
                    && toState.data.isPublic === true;
                if (isPublicAction || isAuthenticated) {
                    return;
                }
                event.preventDefault();
                userService.getAuthObject().then(function (user) {
                    var isAuthenticated = user.isAuthenticated === true;
                    if (isAuthenticated) {
                        $state.go(toState, toParams)
                        return;
                    }
                    $state.go("login");
                })
            }
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
                    sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": false}));
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

