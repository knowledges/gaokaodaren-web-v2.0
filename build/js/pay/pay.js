/**
 * Created by qbl on 2015/10/28.
 */
require(['app'],function(app){
    app.directive('tabs',function(){
        return {
            restrict:'ACEM',
            template:'<ul class="nav nav-tabs"><li><a class="btn" data-type="1">支付宝</a></li><li><a class="btn" data-type="2">网银支付</a></li> <li><a class="btn" data-type="3">银行汇款</a></li></ul>',
            replace:true,
            link:function(scope, element, attrs,controller){
                element.bind('click',function(element){
                    scope.$apply(function(){
                        var type = element.target.getAttribute("data-type");
                        if(type == 1){
                            id(type).style.display = "block";
                            id(2).style.display = "none";
                            id(3).style.display = "none";
                        }else if (type == 2){
                            id(1).style.display = "none";
                            id(3).style.display = "none";
                            id(type).style.display = "block";
                        }else if(type == 3){
                            id(1).style.display = "none";
                            id(2).style.display = "none";
                            id(type).style.display = "block"
                        }
                        function id(id){
                            return document.getElementById('div'+id);
                        }
                    })
                });
            }
        }
    });
    app.directive('pay',['$http','$window','$location','$timeout','loocha','baidubaike',function($http,$window,$location,$timeout,loocha,baidubaike){
        return function(scope, element, attrs){
            element.bind('click',function(event){
                scope.$apply(function(){
                    var out_trade_no = $location.$$search.order_id;
                    var type = event.target.getAttribute("pay-type");
                    $http.get(loocha+"/user?t="+new Date().getTime().toString())
                        .success(function(data){
                            var users = data.response;
                            if(users.free == 2){
                                if(users.remain>=scope.pay.money){
                                    window.location.href=loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type=3";
                                    return;
                                }else{
                                    alert("该注册号余额已不足支付，请联系：13914726090");
                                    return;
                                }
                            }else{
                                /***
                                 * /exam/buy
                                 * type:0 支付宝
                                 * type:1 网页
                                 * type:2 微信
                                 */
                                switch(type){
                                    case "zhifubao":
                                        window.location.href=loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type=0";
                                        //baidubaike.openwin(loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type=0");
                                        break;
                                    case "bank":
                                        var code = event.target.getAttribute("bank-code");
                                        window.open(loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type=1&bank="+code);
                                        break;
                                    case "yinhanghuikuan":
                                        document.getElementById('modal').style.display = "block";
                                        break;
                                }
                            }
                        });
                });
            })
        }
    }]);
    app.controller('payCtr',['$rootScope','$scope','$window','$location','$interval','$timeout','$http','loocha',function($rootScope,$scope,$window,$location,$interval,$timeout,$http,loocha){

        $scope.pay = {
            list:"",
            orderId:"",
            money:"",
            expired:false,
            sweep:false,
            wxMoney:"",
        };

        $scope.countdown = 60;

        init();

        $scope.close = function(){
            document.getElementById('modal').style.display = "none";
        };

        function init(){
            $rootScope.loading = false;
            $scope.pay.orderId = $location.$$search.order_id;
            $scope.pay.money = $location.$$search.money;
            var interval;
            var _zfbTimer  = null;
            $scope.runTiming  = function(){
                $timeout(function(){
                    interval = $interval(function(){
                        if ($scope.countdown <= 1) {
                            $scope.stop();
                        } else {
                            $scope.countdown--;
                        }
                    },1000);
                });

                return interval;
            };

            $scope.stop = function(){
                if(angular.isDefined(interval)){
                    $scope.pay.expired = !$scope.pay.expired;
                    $interval.cancel(interval);
                    $timeout.cancel(_zfbTimer);
                    interval = undefined;
                }
            };

            $scope.again = function(){
                $rootScope.loading = true;
                if(angular.isDefined(interval)){
                    return;
                }

                $http.get(loocha+"/weixin/qrcode?out_trade_no="+$scope.pay.orderId+"&t="+new Date().getTime().toString())
                    .success(function(data){
                        if(data.status == "-1"){
                            alert("登陆失效，请重新登陆");
                            $window.location.href="#/login"
                        }else if(data.status==0){
                            var url = data.response.code_url;
                            $scope.countdown = 60;
                            $scope.pay.wxMoney = data.response.money;
                            $scope.pay.expired = false;
                            $scope.runTiming();
                            $scope.qrcode.makeCode(url);
                        }else {
                            alert("获取失败!");
                        }
                        $rootScope.loading = false;
                    });
                $timeout(function(){
                    zhifubaoLoop();
                },5100);
            };

            $scope.promptenter = function(){
                $scope.pay.sweep = !$scope.pay.sweep;
            };

            $scope.promptleave = function(){
                $scope.pay.sweep = !$scope.pay.sweep;
            };

            $scope.weixinzhifu = function(){
                $rootScope.loading = true;

                $http.get(loocha+"/user?t="+new Date().getTime().toString())
                    .success(function(data){
                        var users = data.response;
                        if(users.free == 2){
                            $rootScope.loading = false;
                            if(users.remain>=$scope.pay.money){
                                window.location.href=loocha+"/exam/buy?out_trade_no="+$scope.pay.orderId+"&type=3";
                                return;
                            }else{
                                alert("该注册号余额已不足支付，请联系：13914726090");
                                return;
                            }
                        }else{
                            $("#qrcode").empty();
                            $scope.qrcode = new QRCode(document.getElementById("qrcode"), {
                                width : 200,//设置宽高
                                height : 200
                            });

                            $http.get(loocha+"/weixin/qrcode?out_trade_no="+$scope.pay.orderId+"&t="+new Date().getTime().toString())
                                .success(function(data){
                                    $rootScope.loading = false;
                                    if(data.status == "-1"){
                                        alert("登陆失效，请重新登陆");
                                        $window.location.href="#/login"
                                    }else if(data.status==0){
                                        var url = data.response.code_url;
                                        $scope.pay.wxMoney = data.response.money;
                                        $scope.qrcode.makeCode(url);
                                        $("#weixin").show();
                                        $scope.runTiming();
                                    }else {
                                        alert("获取失败!");
                                    }
                                });

                            $timeout(function(){
                                zhifubaoLoop();
                            },5100);
                        }
                    });
            };

            function zhifubaoLoop(){
                $http.get(loocha+"/weixin/qrcode/status?out_trade_no="+$scope.pay.orderId+"&t="+new Date().getTime().toString())
                    .success(function(data){
                        if(data.status == "-1"){
                            alert("登陆失效，请重新登陆");
                            $window.location.href="#/login"
                        }else if(data.status =="1004"){
                            _zfbTimer = $timeout(function(){
                                zhifubaoLoop()
                            },5100);
                        }else if(data.status ==0){
                            window.location.href="#"+data.response.split("#")[1];
                            $timeout.cancel(_zfbTimer);
                        }
                    });
            }
            $scope.other = function(){
                $scope.countdown = 60;
                $scope.pay.expired = false;
                $interval.cancel(interval);
                $timeout.cancel(_zfbTimer);
                interval = undefined;
                $("#weixin").hide();
            };
        }
    }]);
});

