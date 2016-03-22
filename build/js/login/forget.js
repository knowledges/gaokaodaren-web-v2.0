/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("referinURL", "/user/reset");
    app.controller("forgetCtr", ["$scope", "$rootScope","$http", "codeURL", "referinURL", "loocha", function ($scope, $rootScope, $http,codeURL, referinURL, loocha) {
        $scope.user = {
            username: "",
            password: "",
            mobile: "",
            newpassword: "",
            code: "",
            img: ""
        };

        getCodes();

        $scope.repeat = function () {
            getCodes();
        };

        function getCodes() {
            $http.get(loocha+"/user/code?time=" + new Date().getTime()).success(function(data){
                $scope.user.img = data;
            });
        }

        $scope.showRegistered = function () {
            $rootScope.isShowLogin = false;
            $rootScope.isShowRegistered = true;
            $rootScope.isShowForget = false;
        };

        $scope.referin = function () {
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.newpassword = $scope.user.newpassword;
            param.code = $scope.user.code;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+referinURL,param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(promise){
                showlogin();
            });

        };

        $scope.showlogin = function () {
            $rootScope.isShowLogin = true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        };
    }]);

});