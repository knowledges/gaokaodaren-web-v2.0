/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'],function(app){
    //app.constant('willUrl','/exam/request/all?index=0&limit=999');
    app.constant('referUrl','/exam/order/all?index=0&limit=999&type=1');
    app.controller('willCtr', ['$scope','$http','loocha','referUrl', function ($scope,$http,loocha,referUrl) {
            $scope.will = {
                isShowWill:false,
                list:""
            };

            $http.get(loocha+referUrl)
            .success(function(data){
                $scope.will.list = data.response.list;
                $scope.will.isShowWill = true;
            });

            $scope.seeHope = function(orderId){
                $http.get(loocha+"/exam/order/info?out_trade_no="+orderId)
                    .success(function(data){
                        //var intentionId = data.response.intentionId;
                        var intentionId = 40;

                        $http.get(loocha+'/exam/intention?id='+intentionId).success(function(data){
                            localStorage.setItem("intention",JSON.stringify(data.response));
                            window.location.href="#/hope";window.location.hash=window.location.hash+"/see="+data.response.type;
                        })
                    });
            }

        }]);
    app.controller('referenceCtr', ['$scope','$http','loocha','referUrl', function ($scope,$http,loocha,referUrl) {

            $scope.refer = {
                isShowRefer:false,
                list:""
            }

            $http.get(loocha+referUrl)
            .success(function(data,status){
                $scope.refer.isShowRefer = true;
                $scope.refer.list = data.response.list;
            });
        }]);
});