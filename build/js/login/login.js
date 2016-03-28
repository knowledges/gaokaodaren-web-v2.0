/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("loginURL", "/login?time=" + new Date().getTime());
    app.factory("isShowModel", function () {
        return {
            isSigin: ""
        }
    });
    app.controller("logCtr", ["$scope", "$rootScope", "$window", "$http",'loocha',function ($scope, $rootScope, $window,$http,loocha) {
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
            $rootScope.loading=false;
            $http.get(loocha+"/user/code?time=" + new Date().getTime()).success(function(data){
                $scope.user.img = data;
            });
        }

        $scope.signin = function () {

            var param = {};
                param.j_username = $scope.user.username;
                param.j_password = $scope.user.password;
                param.code = $scope.user.code;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+"/login?time=" + new Date().getTime(),param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(responseDate){
                if (responseDate.status == -1){
                    alert('验证码失效');
                    getCodes();
                    return ;
                }
                //路由权限
                sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));
                sessionStorage.setItem('usernumber', responseDate.response.name);
                sessionStorage.setItem('user_id',responseDate.response.id);
                $rootScope.studentId = responseDate.response.name;

                if(localStorage.getItem('score')!=null){
                    $window.location.href = "#/home";
                }else{
                    $window.location.href="#/all/allScore";
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
    }]);
});