/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("registerURL", "/user/register");
    app.controller("registerCtr", ["$scope","$rootScope","$window","$http","registerURL","loocha",function ($scope, $rootScope,$window,$http,registerURL,loocha) {
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
        };

        $scope.showlogin = function () {
            $rootScope.isShowLogin = true;
            $rootScope.isShowRegistered = false;
            $rootScope.isShowForget = false;
        };

        $scope.register = function(){
            var param = {};
                param.j_username = $scope.user.username;
                param.j_password = $scope.user.password;
                param.code = $scope.user.code;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+"/user/register?time=" + new Date().getTime(),param,{
                headers:{"Content-type":'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data){
                if(data.status==-1){
                    alert('验证码失效');
                    $scope.user.code="";
                    getCodes();
                    return ;
                }else if (data.status == 1){
                    alert('系统错误');
                    $scope.user.code="";
                    getCodes();
                    return ;
                }else if (data.status == 3){
                    alert('用户已存在,请去登陆');
                    $scope.user.code="";
                    getCodes();
                    return ;
                }else if (data.status == 4||data.status == 6){
                    alert('验证码错误');
                    $scope.user.code="";
                    getCodes();
                    return ;
                }
                $scope.signin();
            })
        };

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


        //window.setTimeout(function(){
        //    $("#hiddenIframe").load(function(){
        //        $("#form_update_2").trigger("click");
        //    });
        //
        //    $("#hiddenIframe_2").load(function(){
        //        if (JSON.parse(this.contentWindow.document.body.innerText).status == -1){
        //            alert('验证码失效');
        //            $scope.user.code="";
        //            getCodes();
        //            return ;
        //        }else if (JSON.parse(this.contentWindow.document.body.innerText).status == 1){
        //            alert('系统错误');
        //            $scope.user.code="";
        //            getCodes();
        //            return ;
        //        }else if (JSON.parse(this.contentWindow.document.body.innerText).status == 3){
        //            alert('用户已存在');
        //            $scope.user.code="";
        //            getCodes();
        //            return ;
        //        }else if (JSON.parse(this.contentWindow.document.body.innerText).status == 4||JSON.parse(this.contentWindow.document.body.innerText).status == 6){
        //            alert('验证码错误');
        //            $scope.user.code="";
        //            getCodes();
        //            return ;
        //        }
        //        //路由权限
        //        sessionStorage.setItem("user",JSON.stringify({"isAuthenticated": true}));
        //        sessionStorage.setItem("usernumber", JSON.parse(this.contentWindow.document.body.innerText).response.name);
        //        sessionStorage.setItem("user_id",JSON.parse(this.contentWindow.document.body.innerText).response.id);
        //        $rootScope.studentId = JSON.parse(this.contentWindow.document.body.innerText).response.name;
        //        $http.get(loocha+"/uscore").success(function(data){
        //            if(data.response!=null && data.response.length>0){
        //                sessionStorage.setItem("uScore",JSON.stringify(data.response[0]));
        //            }
        //        });
        //        if($rootScope.isFromDepth == true){
        //            window.location.href = "#/depth/depthInfo/batch="+localStorage.getItem("depthbatch");
        //        }else{
        //            window.location.href = "#/all/allScore";
        //        }
        //    });
        //},600);

        $scope.agreen = function(){
            $("#mask-register").fadeOut();
        }
    }]);
});