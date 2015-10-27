/**
 * Created by qbl on 2015/10/27.
 */
angular.module("gaokaoAPP.refer",[])
    .constant("orderInfoURL","/exam/order/info")
    .controller('referCtr',['$scope','$location','AJAX','orderInfoURL',function($scope,$location,AJAX,orderInfoURL){
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
            area:""
        }

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
        function init(){

            $scope.order.subtitle = yxb_title[$scope.order.type];
            $scope.order.caption = caption [$scope.order.type];
            getOrderInfo();

        }



        function getOrderInfo(){
            var param = {};
            param.out_trade_no = $scope.order.orderId;
            AJAX.getRequest(orderInfoURL,'GET',param)
                .success(function(data,status){
                    $scope.order.name =data.response.name;
                    $scope.order.number =data.response.number;
                    $scope.order.city =data.response.city;
                    $scope.order.area =data.response.area;
                    $scope.order.data = data.response.list;
                })
        }


    }])