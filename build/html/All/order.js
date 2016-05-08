/**
 * Created by qbl on 2016/5/4.
 */
require(['app'], function (app) {
    app.controller("orderDepthCtr",['$rootScope','$scope','$http','$stateParams','loocha',function($rootScope,$scope,$http,$stateParams,loocha){
        $scope.order={
            out_trade_no:$stateParams.out_trade_no,
            conditions:""
        };

        $scope.hope = {
            money:"",
            orderId:""
        }

        $http.get(loocha+"/exam/order/info?out_trade_no="+$scope.order.out_trade_no)
            .success(function(data){
                if(data.status == "2"){
                    alert("订单失效");
                }else if(data.status == "1004"){
                    alert("未支付");
                    $http.get(loocha + '/exam/' +data.response.request_id )
                        .success(function (data) {
                            if (data.status == 1) {
                                alert('没有找到订单');
                                return;
                            }else if (data.status == 4){
                                alert('您还没有登陆，先去登陆吧！');
                                window.location.href = "#/login";
                                return;
                            }else if (data.status == 0){
                                $scope.hope.order_id = data.response.order_id;
                                $scope.hope.money = data.response.money;
                                $('#modal-pay').modal('show');
                            }
                        });
                }else if(data.status == "0"){
                    $scope.order.conditions = data.response.conditions;
                }
                $rootScope.loading = false;
            });

        $scope.pay = function () {
            openwin('#/pay?order_id=' + $scope.hope.order_id + '&money=' + $scope.hope.money + '&type=' + $scope.hope.batch);
            $('#modal-pay').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function () {
            $http.get(loocha + '/exam/order/info?out_trade_no=' + $scope.hope.order_id)
                .success(function (data) {
                    if (data.status == "1004") {
                        alert('交易失败');
                    }
                    $("#tip").modal('hide');
                    window.location.reload(0);
                });
        };

        $scope.showOrderInfo = function(num){
            $(".btn-primary").eq(num-1).addClass("actived")
            $rootScope.loading = true;
            var obj = $scope.order.conditions[num-1];
            var param = {};
            param.type = obj.type
            param.out_trade_no  = $scope.order.out_trade_no;
            param.year = obj.year;
            param.school = obj.school;
            param.depart = obj.depart;
            param.count = obj.count;
            param.sel = obj.sel;
            param.city = obj.city;
            param.fee = obj.fee;
            $http({
                method:'GET',
                url :loocha+"/depth/query/"+obj.id+".html",
                params:param
            }).success(function (data) {
                if(data.length>0){
                    $("#depathTHML").empty().prepend(data);
                    $("#mask-depart").modal("show");
                }else{
                    $("#depathTHML").empty().prepend('<h2 class="text-content">数据还在筹备中....</h2>');
                    $("#mask-depart").modal("show");
                }
                $rootScope.loading = false;
            });
        };

        function openwin(url) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", "openwin");
            document.body.appendChild(a);
            a.click();
        }
    }]);
});