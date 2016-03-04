/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("codeURL", "/loocha/user/code?time=" + new Date().getTime());
    app.constant("loginURL", "/loocha/login?time=" + new Date().getTime());
    app.constant("registerURL", "/loocha/user/register");
    app.constant("referinURL", "/loocha/user/reset");
    app.factory("isShowModel", function () {
        return {
            isSigin: ""
        }
    });
    app.controller("forgetCtr", ["$scope", "$rootScope","$http", "codeURL", "referinURL", "isShowModel", "AJAX", function ($scope, $rootScope, $http,codeURL, referinURL, isShowModel, AJAX) {
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
            $http.get("/loocha/user/code?time=" + new Date().getTime()).success(function(data){
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
            AJAX.getRequest(referinURL, 'POST', param)
                .then(function (data, status) {
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