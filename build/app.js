/**
 * Created by qbl on 2015年11月25日15:04:44
 */
define(function(require,exports,module){
    var angular  = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('oclazyLoad');
    require('angular-ui-router');
    require('jquery-placeholder');

    var app = angular.module('JS-gaokao',['ui.router','oc.lazyLoad']);
    app.factory('homeService',function(){
        return {
            htmlPage:""
        }
    });
    app.factory('displayService',function(){
        return {
            isShow:true
        }
    });
    //  拦截器
    app.run(['$rootScope','$state','$window','$location','userService','homeService','displayService',function ($rootScope, $state,$location ,$window , userService,homeService,displayService) {
        $rootScope.$on('$stateChangeError',function (event, toState, toParams, fromState, error){
            console.log(error);
        });
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $(".modal-backdrop").hide();
            homeService.htmlPage="";
            displayService.isShow = true;
            $rootScope.loading = true;
            if(fromState.name != ""){
                if(fromState.name  == "depth.info" ){
                    $rootScope.isFromDepth = true;
                    /*}else{
                     $rootScope.isFromDepth = false;*/
                }
                if(fromState.name != "all.will" && fromState.name != "all.score" && fromState.name != "refer"){ //是否为刷新 "" 就是刷新
                    localStorage.removeItem("type");
                }
                if(fromState.name != "all.will" && fromState.name !="refer" && fromState.name !="all.chance" && fromState.name !="allChance"){
                    sessionStorage.removeItem("admitFlag");
                }
            }
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
    }]);
    app.factory('userService',['$rootScope','$timeout','$q',function ($rootScope,$timeout, $q) {
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
    }]);

    //  initialze app module for async loader
    asyncLoader.configure(app);
    module.exports = app;
});


