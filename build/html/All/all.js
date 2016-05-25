/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'], function (app) {
    //app.constant('willUrl','/exam/request/all?index=0&limit=999');
    app.constant('referUrl2', '/exam/order/all?flag=0&index=0&limit=999&type=1');
    app.constant('referUrl3', '/exam/order/all?flag=0&index=0&limit=999&type=1');
    app.constant('referUrl4', '/exam/order/all?flag=4&index=0&limit=999&type=1');
    app.constant('referUrl5', '/exam/order/all?flag=5&index=0&limit=999&type=1');
    app.controller('referenceCtr', ['$scope', '$http', 'loocha', 'referUrl2', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl2, getLoginUserInfo) {
        $scope.will = {
            isShowWill: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl2)
            .success(function (data) {
                if(data.status == "4"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    return;
                }
                $scope.will.list = data.response.list;
                $scope.will.isShowWill = true;
            });

        $scope.seeHope = function (orderId,flag,type) {
            if(flag == 4){
                window.location.href = "#/chance/batch="+type+"&out_trade_no="+orderId;
            }else{
                $http.get(loocha + '/exam/intention?out_trade_no=' + orderId).success(function (data) {
                    if(data.status == "4"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                        return;
                    }
                    localStorage.setItem("intention", JSON.stringify(data.response));
                    localStorage.setItem("type", data.response.type);
                    window.location.href = "#/hope/batch="+type+"&out_trade_no="+orderId;
                });
            }
        }
    }]);
    app.controller('willCtr', ['$scope', '$http', 'loocha', 'referUrl3', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl3, getLoginUserInfo) {

        $scope.refer = {
            isShowRefer: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl3)
            .success(function (data, status) {
                if(data.status == "4"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    return;
                }
                $scope.refer.isShowRefer = true;
                $scope.refer.list = data.response.list;
            });
    }]);
    app.controller('allChanceCtr', ['$scope', '$http', 'loocha', 'referUrl4', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl4, getLoginUserInfo) {
        $scope.chance = {
            isShowWill: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl4)
            .success(function (data) {
                if(data.status == "4"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    return;
                }
                $scope.chance.list = data.response.list;
                $scope.chance.isShowWill = true;
            });

        $scope.seeHope = function (orderId,flag,type) {
            if(flag == 4){
                window.location.href = "#/chance/batch="+type+"&out_trade_no="+orderId;
            }else{
                $http.get(loocha + '/exam/intention?out_trade_no=' + orderId).success(function (data) {
                    if(data.status == "4"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                        return;
                    }
                    localStorage.setItem("intention", JSON.stringify(data.response));
                    localStorage.setItem("type", data.response.type);
                    window.location.href = "#/hope/batch="+type+"&out_trade_no="+orderId;
                });
            }
        }
    }]);
    app.controller('alldepthCtr', ['$scope', '$http', 'loocha', 'referUrl5', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl5, getLoginUserInfo) {
        $scope.depth = {
            isShowWill: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl5)
            .success(function (data) {
                if(data.status == "4"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    return;
                }
                $scope.depth.list = data.response.list;
                $scope.depth.isShowWill = true;
            });

        /*$scope.seeHope = function (orderId,flag) {
            $http.get(loocha + "/exam/order/info?out_trade_no=" + orderId)
                .success(function (data) {
                    if(flag == 4){
                        localStorage.setItem("type",data.response.type);
                        sessionStorage.setItem("admitFlag",data.response.admitFlag);
                        sessionStorage.setItem("order_id",data.response.orderId);
                        sessionStorage.setItem("admits",JSON.stringify(data.response.admits));
                        window.location.href = "#/chance/batch="+data.response.type;
                    }else{
                        //var intentionId = data.response.intentionId;
                        $http.get(loocha + '/exam/intention?out_trade_no=' + orderId).success(function (data) {
                            if(data.status == "4"){
                                alert('您还没有登陆，先去登陆吧！');
                                window.location.href = "#/login";
                                return;
                            }
                            localStorage.setItem("intention", JSON.stringify(data.response));
                            localStorage.setItem("type", data.response.type);
                            window.location.href = "#/hope/batch="+data.response.type;
                            window.location.hash = window.location.hash + "/see=" + data.response.type;
                        });
                    }
                });
        }*/
    }]);
});