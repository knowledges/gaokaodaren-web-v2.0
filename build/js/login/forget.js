/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("referinURL", "/user/reset");
    app.controller("forgetCtr", ["$scope", "$rootScope","$http", "referinURL", "loocha", function ($scope, $rootScope, $http, referinURL, loocha) {
        $scope.$on("$includeContentLoaded",function(){
            /*setTimeout(function(){
                $("input").placeholder();
            },500);*/
        });
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
            }).success(function(data){
                if(data.status == 2){
                    alert('用户不存在');
                }else if(data.status == 4||data.status == 6){
                    alert('验证码错误');
                }else if(data.status == 0){
                    alert('修改成功');
                    window.location.href="#/login";
                }
            });

        };

        $scope.showlogin = function () {
            $rootScope.isShowLogin = true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        };
    }]);

});