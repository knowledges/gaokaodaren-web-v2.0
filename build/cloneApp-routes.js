/**
 * Created by qbl on 2015/11/25.
 */
'use strict';
angular.module("gaokaoAPP",[
    "ui.router",
    "gaokaoApp.factory",
    "gaokaoAPP.home",
    "gaokaoAPP.hope",
    "gaokaoAPP.chance",
    "gaokaoAPP.login.childApp",
    "gaokaoAPP.temp.city",
    "gaokaoAPP.navbar.citymenu",
    "gaokaoAPP.navbar",
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
    "gaokaoAPP.myInfo.myScore",
    "gaokaoApp.home.new",
    "gaokaoApp.banner.hope",
    "gaokaoApp.banner.chance",
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
    .factory('userService',['$rootScope','$timeout','$q',function ($rootScope,$timeout, $q) {
        var user ={};
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
            isAuthenticated: function () {
                user = JSON.parse(sessionStorage.getItem('user'));
                return user !== null
                    && user.isAuthenticated;
            }
        };
    }])
    .run(['$rootScope','$state','$window','$location','userService','homeService',function ($rootScope, $state,$location ,$window , userService,homeService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            homeService.htmlPage="";
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

        })
    }])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/home");
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "html/home/home.html",
                controller:"homeCtr",
                data: { isPublic: true},
                resolve:{
                    data_province: function(newService) {
                        return newService.getProvinceURL();
                    },
                    data_HomeModel2:function(newService){
                        return newService.getHomeModel2();
                    },
                    data_HomeModel3:function(newService){
                        return newService.getHomeModel3();
                    },
                    data_HomeModel4:function(newService){
                        return newService.getHomeModel4();
                    },
                    data_HomeModel5:function(newService){
                        return newService.getHomeModel5();
                    },
                    data_HomeModel6:function(newService){
                        return newService.getHomeModel6();
                    },
                    data_HomeModel7:function(newService){
                        return newService.getHomeModel7();
                    }
                }
            })
            .state("chance", {
                url: "/chance",
                templateUrl: "html/chance/chance.html",
                controller:"chanceCtr",
                data: { isPublic: false}
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

