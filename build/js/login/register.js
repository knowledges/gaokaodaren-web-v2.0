/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("registerURL", "/user/register");
    app.controller("registerCtr", ["$scope","$rootScope","$window","$http","registerURL",'loocha',function ($scope, $rootScope,$window,$http,registerURL,loocha) {
        $scope.user = {
            username: "",
            password: "",
            mobile: "",
            newpassword: "",
            code: "",
            img: ""
        }

        $("#mask-register").fadeIn('500');
        $(".close").click(function(){
            $("#mask-register").fadeOut('800');
        });

        getCodes();

        $scope.repeat = function () {
            getCodes();
        };

        function getCodes() {
            $http.get(loocha+"/user/code?time=" + new Date().getTime()).success(function(data){
                $scope.user.img = data;
            });
        }

        $scope.showlogin = function () {
            $rootScope.isShowLogin = true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        };

        $scope.registered = function () {
            var param = {};
            param.name = $scope.user.username;
            param.password = $scope.user.password;
            param.newpassword = $scope.user.newpassword;
            param.code = $scope.user.code;
            //param.mobile = $scope.user.mobile;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+registerURL,param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(promise){
                if (promise.status == -1) {
                    alert("验证码有错误");
                    getCodes();
                    return;
                } else if (promise.status == 3) {
                    alert("此账户已存在");
                    return;
                } else if (promise.status == 6) {
                    alert('参数错误');
                    return;
                }
                alert("注册成功,请登陆");
                window.sessionStorage.setItem('usernumber', $scope.user.username);
                $window.location.href = "#/login";
            });
        };

        $scope.agreen = function(){
            $("#mask-register").fadeOut();
        }

    }]);
});