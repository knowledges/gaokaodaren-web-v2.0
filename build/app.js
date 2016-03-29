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
    })
    //  拦截器
    app.run(['$rootScope','$state','$window','$location','userService','homeService','displayService',function ($rootScope, $state,$location ,$window , userService,homeService,displayService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            homeService.htmlPage="";
            displayService.isShow = true;
            $rootScope.loading = true;
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


