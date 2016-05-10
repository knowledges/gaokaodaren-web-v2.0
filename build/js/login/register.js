/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("registerURL", "/user/register");
    app.controller("registerCtr", ["$scope","$rootScope","$window","$http","registerURL","loocha",function ($scope, $rootScope,$window,$http,registerURL,loocha) {
        /*$scope.$on("$includeContentLoaded",function(){
         alert('加载完毕');
         });*/
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

        window.setTimeout(function(){
            $("#hiddenIframe").load(function(){
                $("#form_update_2").trigger("click");
            });

            $("#hiddenIframe_2").load(function(){
                if (JSON.parse(this.contentWindow.document.body.innerText).status == -1){
                    alert('验证码失效');
                    $scope.user.code="";
                    getCodes();
                    return ;
                }
                //路由权限
                sessionStorage.setItem("user",JSON.stringify({"isAuthenticated": true}));
                sessionStorage.setItem("usernumber", JSON.parse(this.contentWindow.document.body.innerText).response.name);
                sessionStorage.setItem("user_id",JSON.parse(this.contentWindow.document.body.innerText).response.id);
                $rootScope.studentId = JSON.parse(this.contentWindow.document.body.innerText).response.name;
                $http.get(loocha+"/uscore").success(function(data){
                    if(data.response!=null && data.response.length>0){
                        sessionStorage.setItem("uScore",JSON.stringify(data.response[0]));
                    }
                });
                if($rootScope.isFromDepth == true){
                    window.location.href = "#/depth/depthInfo/batch="+localStorage.getItem("depthbatch");
                }else{
                    window.location.href = "#/all/allScore";
                }
            });
        },600);

         $scope.agreen = function(){
            $("#mask-register").fadeOut();
         }
    }]);
});