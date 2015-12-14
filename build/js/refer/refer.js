/**
 * Created by qbl on 2015/10/27.
 */
require(['app'],function(app){
    app.constant("orderInfoURL","/exam/order/info")
    app.controller('referCtr',['$scope','$location','$window','AJAX','orderInfoURL',function($scope,$location,$window,AJAX,orderInfoURL){

        $scope.order = {
                orderId:"",
                type:"",
                data:"",
                title:"普通高校招生考生志愿参考表",
                subtitle:"",
                caption:"",
                name:"",
                number:"",
                city:"",
                area:"",
                requestId:"",
                orderShow:false
        };

        $scope.order.orderId = $location.$$search.orderId;
        $scope.order.type = $location.$$search.type;

        var yxb_title = [
            "",
            "【第一阶段填报文科类第一批本科院校志愿用表】",
            "【第一阶段填报理科类第一批本科院校志愿用表】",
            "【第一阶段填报文科类第二批本科院校志愿用表】",
            "【第一阶段填报理科类第二批本科院校志愿用表】",
            "【第二阶段填报文科类第三批本科院校志愿用表】",
            "【第二阶段填报理科类第三批本科院校志愿用表】",
            "【第二阶段填报文科类高职（专科）院校志愿用表】",
            "【第二阶段填报理科类高职（专科）院校志愿用表】"
        ];

        var caption = [
            "",
            "第一批本科平行院校志愿",
            "第一批本科平行院校志愿",
            "第二批本科平行院校志愿",
            "第二批本科平行院校志愿",
            "第三批本科平行院校志愿",
            "第三批本科平行院校志愿",
            "高职（专科）平行院校志愿",
            "高职（专科）平行院校志愿"
        ]

        init();

        $scope.print = function(){
            var oper = 1;
            if (oper < 10) {
                var printHtml = $("#main").html();
                sprnstr = "<!--startprint" + oper + "-->";
                eprnstr = "<!--endprint" + oper + "-->";
                prnhtml = printHtml.substring(printHtml.indexOf(sprnstr) + 18);
                prnhtml = printHtml.substring(0, printHtml.indexOf(eprnstr));
                $("#main").html(prnhtml);
                window.print();
                window.location.reload();
            } else {
                window.print();
            }
        }

        $scope.getReference = function(){
            getNewOrderInfo();
        }

        $scope.payChance = function(){
            $scope.order.orderShow = false;
            window.location.href="#/pay?out_trade_no="+$scope.orderout_trade_no+"&type="+$scope.order.type;
        }

        $scope.close = function(){
            $scope.order.orderShow = false;
        }

        function init(){
            if(sessionStorage.getItem('usernumber') == null || sessionStorage.getItem('usernumber') == "" || sessionStorage.getItem('usernumber').length<= 0){
                $window.location.href="#/login";
                return;
            }
            $scope.order.subtitle = yxb_title[$scope.order.type];
            $scope.order.caption = caption [$scope.order.type];
            getOrderInfo();
        }

        function getOrderInfo(){
            var param = {};
            param.out_trade_no = $scope.order.orderId;
            AJAX.getRequest(orderInfoURL,'GET',param)
                .success(function(data,status){
                    if(status== 2){
                        alert('操作失败！');
                        $window.location.href="#/all/reference";

                        return;
                    }
                    $scope.order.name =data.response.name;
                    $scope.order.number =data.response.number;
                    $scope.order.city =data.response.city;
                    $scope.order.area =data.response.area;
                    $scope.order.data = data.response.list;
                    $scope.order.requestId = data.response.request_id;
                });
        }

        function getNewOrderInfo(){
            AJAX.getRequest('/exam/'+$scope.order.requestId,'GET','')
                .success(function(data,status){
                    $scope.orderout_trade_no = data.response.order_id;
                    $scope.order.money = data.response.money;
                    $scope.order.orderShow = true;

                });
        }
    }])
});
