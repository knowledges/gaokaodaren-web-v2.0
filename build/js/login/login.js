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
    app.controller("logCtr", ["$scope", "$rootScope", "$window", "$http",'getLoginUserInfo','loocha',function ($scope, $rootScope, $window,$http,getLoginUserInfo,loocha) {
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

        $rootScope.isShowLogin = true;
        $rootScope.isShowRegistered = false;
        $rootScope.isShowForget = false;

        getCodes();

        $scope.repeat = function () {
            getCodes();
        };

        function getCodes() {
            $http.get(loocha+"/user/code?time=" + new Date().getTime()).success(function(data){
                $scope.user.img = data;
            });
        }

        //window.setTimeout(function(){
        //    $("#hiddenIframe_3").load(function(){
        //        /* JSON.parse(this.contentWindow.document.body.innerText).status ;
        //         JSON.parse(this.contentWindow.document.body.innerText).response ;*/
        //        if (JSON.parse(this.contentWindow.document.body.innerText).status == -1){
        //            alert('验证码失效');
        //            $scope.user.code="";
        //            getCodes();
        //            return ;
        //        }
        //        //路由权限
        //        sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));
        //        sessionStorage.setItem('usernumber', JSON.parse(this.contentWindow.document.body.innerText).response.name);
        //        sessionStorage.setItem('user_id',JSON.parse(this.contentWindow.document.body.innerText).response.id);
        //        $rootScope.studentId = JSON.parse(this.contentWindow.document.body.innerText).response.name;
        //
        //        $http.get(loocha+"/uscore").success(function(data){
        //            if(data.response!=null && data.response.length>0){
        //                sessionStorage.setItem('uScore',JSON.stringify(data.response[0]));
        //            }
        //        });
        //        if($rootScope.isFromDepth == true){
        //            window.location.href = "#/depth/depthInfo/batch="+localStorage.getItem("depthbatch");;
        //        }else{
        //            window.location.href = "#/home";
        //        }
        //
        //
        //        /*if(localStorage.getItem('score')!=null){
        //         window.location.href = "#/home";
        //         }else{
        //         window.location.href="#/all/allScore";
        //         }*/
        //
        //        /*   setInterval(function(){
        //         getLoginUserInfo.isLogoin();
        //         },600000);*/
        //
        //    });
        //},400);


        $scope.signin = function () {

            var param = {};
                param.j_username = $scope.user.username;
                param.j_password = $scope.user.password;
                param.code = $scope.user.code;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+"/login?time=" + new Date().getTime(),param,{
                headers:{"Content-type":'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data){
                if (data.status == -1){
                    alert('登录失败，重新登录！');
                    getCodes();
                    return ;
                }else if (data.status == 1){
                    alert('系统出错');
                    getCodes();
                    return ;
                }else if (data.status == 12) {
                    alert('验证码错误');
                    getCodes();
                    return;
                }else if (data.status == 13){
                    alert('用户名或密码错误');
                    getCodes();
                    return;
                }
                //路由权限
                sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));
                sessionStorage.setItem('usernumber', data.response.name);
                sessionStorage.setItem('user_id',data.response.id);
                $rootScope.studentId = data.response.name;

                $http.get(loocha+"/uscore").success(function(data){
                    if(data.response!=null && data.response.length>0){
                        sessionStorage.setItem('uScore',JSON.stringify(data.response[0]));
                    }
                });

                if($rootScope.isFromDepth == true){
                    window.location.href = "#/depth/depthInfo/batch="+localStorage.getItem("depthbatch");
                }else{
                    window.location.href = "#/home";
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