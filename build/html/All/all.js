/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'], function (app) {
    //app.constant('willUrl','/exam/request/all?index=0&limit=999');
    app.constant('referUrl', '/exam/order/all?index=0&limit=999&type=1');
    app.controller('willCtr', ['$scope', '$http', 'loocha', 'referUrl', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl, getLoginUserInfo) {
        $scope.will = {
            isShowWill: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl)
            .success(function (data) {
                $scope.will.list = data.response.list;
                $scope.will.isShowWill = true;
            });

        $scope.seeHope = function (orderId,flag) {
            $http.get(loocha + "/exam/order/info?out_trade_no=" + orderId)
                .success(function (data) {
                    if(flag == 4){
                        localStorage.setItem("type",data.response.type);
                        sessionStorage.setItem("admitFlag",data.response.admitFlag);
                        sessionStorage.setItem("order_id",data.response.orderId);
                        sessionStorage.setItem("admits",JSON.stringify(data.response.admits));
                        window.location.href = "#/chance/batch="+data.response.type;
                    }else{
                        $http.get(loocha + '/exam/intention?out_trade_no=' + orderId).success(function (data) {
                            localStorage.setItem("intention", JSON.stringify(data.response));
                            localStorage.setItem("type", data.response.type);
                            window.location.href = "#/hope/batch="+data.response.type;
                            window.location.hash = window.location.hash + "/see=" + data.response.type;
                        });
                    }
                });
        }
    }]);
    app.controller('referenceCtr', ['$scope', '$http', 'loocha', 'referUrl', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl, getLoginUserInfo) {

        $scope.refer = {
            isShowRefer: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl)
            .success(function (data, status) {
                $scope.refer.isShowRefer = true;
                $scope.refer.list = data.response.list;
            });
    }]);

    app.controller('allChanceCtr', ['$scope', '$http', 'loocha', 'referUrl', 'getLoginUserInfo', function ($scope, $http, loocha, referUrl, getLoginUserInfo) {
        $scope.chance = {
            isShowWill: false,
            list: ""
        };

        getLoginUserInfo.isLogoin();

        $http.get(loocha + referUrl)
            .success(function (data) {
                $scope.chance.list = data.response.list;
                $scope.chance.isShowWill = true;
            });

        $scope.seeHope = function (orderId,flag) {
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
                            localStorage.setItem("intention", JSON.stringify(data.response));
                            localStorage.setItem("type", data.response.type);
                            window.location.href = "#/hope/batch="+data.response.type;
                            window.location.hash = window.location.hash + "/see=" + data.response.type;
                        });
                    }
                });
        }
    }]);
});