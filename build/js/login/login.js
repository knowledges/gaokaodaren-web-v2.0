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
    app.controller("logCtr", ["$scope", "$rootScope", "$window", "$http", '$ocLazyLoad',function ($scope, $rootScope, $window,$http,$ocLazyLoad) {
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
            $http.get("/loocha/user/code?time=" + new Date().getTime()).success(function(data){
                console.log('img i come in');
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

            $http.post("/loocha/login?time=" + new Date().getTime(),param,{
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
                    //var set = confirm("你还没有完善考试成绩，是否完善！");
                    //if(set){
                    $window.location.href="#/all/allScore";
                    //}else{
                    //    $window.location.href = "#/home";
                    //}
                }
            });

            //AJAX.getRequest(loginURL, 'POST', param)
            //    .then(function (promise, status) {
            //        console.log(JSON.stringify(promise) );
            //        if (promise.data.status == -1) {
            //            alert("验证码失效");
            //            getCodes();
            //            return;
            //        }
            //        //路由权限
            //        sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));
            //
            //        sessionStorage.setItem('usernumber', promise.data.response.name);
            //        $rootScope.studentId = promise.data.response.name;
            //
            //        if(localStorage.getItem('score')!=null){
            //            $window.location.href = "#/home";
            //        }else{
            //            var set = confirm("你还没有完善考试成绩，是否完善！");
            //            if(set){
            //                $window.location.href="#/all/allScore";
            //            }else{
            //                $window.location.href = "#/home";
            //            }
            //        }
            //    });
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