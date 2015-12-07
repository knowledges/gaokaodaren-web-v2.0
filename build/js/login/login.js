/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("codeURL", "/user/code?time=" + new Date().getTime());
    app.constant("loginURL", "/login?time=" + new Date().getTime());
    app.constant("registerURL", "/user/register");
    app.constant("referinURL", "/user/reset");
    app.factory("isShowModel", function () {
        return {
            isSigin: "",
        }
    });

    app.controller("registerCtr", ["$scope", "$rootScope", "$window", "codeURL", "registerURL", "isShowModel", "AJAX", function ($scope, $rootScope, $window, codeURL, registerURL, isShowModel, AJAX) {
        $scope.user = {
            username: "",
            password: "",
            mobile: "",
            newpassword: "",
            code: "",
            img: ""
        }

        getCodes();

        $scope.repeat = function () {
            getCodes();
        };

        function getCodes() {
            AJAX.getRequest(codeURL, 'GET', "")
                .success(function (data, status) {
                    $scope.user.img = data;
                });
        }

        $scope.showlogin = function () {
            $rootScope.isShowLogin = true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        }

        $scope.registered = function () {
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.newpassword = $scope.user.newpassword;
            param.code = $scope.user.code;
            param.mobile = $scope.user.mobile;
            AJAX.getRequest(registerURL, 'POST', param)
                .then(function (promise, status) {
                    if (promise.data.status == -1) {
                        alert("验证码有错误");
                        return;
                    } else if (promise.data.status == 3) {
                        alert("此账户已存在");
                        return;
                    } else if (promise.data.status == 6) {
                        alert('参数错误');
                        return;
                    }
                    window.sessionStorage.setItem('usernumber', $scope.user.username);
                    //isShowModel.isSigin = $scope.user.username;
                    locationHref();
                });
        }

        function locationHref() {
            $window.location.href = "#/home";
            $window.location.reload();
        }

    }])
    app.controller("forgetCtr", ["$scope", "$rootScope", "codeURL", "referinURL", "isShowModel", "AJAX", function ($scope, $rootScope, codeURL, referinURL, isShowModel, AJAX) {

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
            AJAX.getRequest(codeURL, 'GET', "")
                .success(function (data, status) {
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
    }])
    app.controller("logonCtr", ["$scope", "$rootScope", "$window", "$http", "codeURL", "loginURL", "isShowModel", "AJAX", function ($scope, $rootScope, $window,$http, codeURL, loginURL, isShowModel, AJAX) {
        $scope.user = {
            username: "",
            password: "",
            mobile: "",
            newpassword: "",
            code: "",
            img: ""
        };

        $rootScope.isShowLogin = true;
        $rootScope.isShowRegistered = false;
        $rootScope.isShowForget = false;

        getCodes();

        $scope.repeat = function () {
            getCodes();
        };

        function getCodes() {
            //regCode.getCode(codeURL)
            AJAX.getRequest(codeURL, 'GET', "")
                .success(function (data, status) {
                    $scope.user.img = data;
                });
        }

        $scope.signin = function () {
            var param = {};
            param.j_username = $scope.user.username;
            param.j_password = $scope.user.password;
            param.code = $scope.user.code;

            AJAX.getRequest(loginURL, 'POST', param)
                .then(function (promise, status) {
                    if (promise.data.status == -1) {
                        alert("验证码失效");
                        return;
                    }
                    //路由权限
                    sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));

                    sessionStorage.setItem('usernumber', promise.data.response.name);
                    $rootScope.studentId = promise.data.response.name;

                    if(localStorage.getItem('score')!=null){
                        $window.location.href = "#/home";
                    }else{
                        var set = confirm("你还没有完善考试成绩，是否完善！");
                        if(set){
                            $window.location.href="#/all/allScore";
                        }else{
                            $window.location.href = "#/home";
                        }
                    }
                });
        };

        $scope.showRegistered = function () {
            $rootScope.isShowLogin = false;
            $rootScope.isShowRegistered = true;
            $rootScope.isShowForget = false;
        };

        $scope.forgetPwd = function () {
            $rootScope.isShowLogin = false;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = true;
        };
    }])
});