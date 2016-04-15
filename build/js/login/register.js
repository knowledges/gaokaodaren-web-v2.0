/**
 * Created by Administrator on 2015/12/2.
 */
'use strict';
require(['app'],function(app){
    app.constant("registerURL", "/user/register");
    app.controller("registerCtr", ["$scope","$rootScope","$window","$http","registerURL",'loocha',function ($scope, $rootScope,$window,$http,registerURL,loocha) {
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
                /*JSON.parse(this.contentWindow.document.body.innerText).status ;
                 JSON.parse(this.contentWindow.document.body.innerText).response ;*/
                /*$("#code").val(JSON.parse(this.contentWindow.document.body.innerText).response);
                window.sessionStorage.setItem('usernumber', $scope.user.username);*/
                $("#form_update_2").trigger("click");
            });

            $("#hiddenIframe_2").load(function(){
                /* JSON.parse(this.contentWindow.document.body.innerText).status ;
                 JSON.parse(this.contentWindow.document.body.innerText).response ;*/
                if (JSON.parse(this.contentWindow.document.body.innerText).status == -1){
                    alert('验证码失效');
                    getCodes();
                    return ;
                }
                //路由权限
                sessionStorage.setItem('user',JSON.stringify({"isAuthenticated": true}));
                sessionStorage.setItem('usernumber', JSON.parse(this.contentWindow.document.body.innerText).response.name);
                sessionStorage.setItem('user_id',JSON.parse(this.contentWindow.document.body.innerText).response.id);
                $rootScope.studentId = JSON.parse(this.contentWindow.document.body.innerText).response.name;

                if(localStorage.getItem('score')!=null){
                    window.location.href = "#/home";
                }else{
                    window.location.href="#/all/allScore";
                }
            });
        },600);

        $scope.agreen = function(){
            $("#mask-register").fadeOut();
        }
    }]);
});