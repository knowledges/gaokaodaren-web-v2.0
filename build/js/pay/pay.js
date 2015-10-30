/**
 * Created by qbl on 2015/10/28.
 */
var pay = angular.module("gaokaoAPP.pay",[]);
pay.directive('tabs',function(){
    return {
        restrict:'ACEM',
        template:'<ul class="nav nav-tabs"><li><a class="btn" data-type="1">支付宝</a></li><li><a class="btn" data-type="2">网银支付</a></li> <li><a class="btn" data-type="3">银行汇款</a></li></ul>',
        replace:true,
        link:function(scope, element, attrs,controller){
            element.bind('click',function(element){
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
            });
        }
    }
})
pay.directive('pay',['$window','$location',function($window,$location){
    return function(scope, element, attrs){
        element.bind('click',function(element){
            var out_trade_no = $location.$$search.out_trade_no, order_type = $location.$$search.type;
            var type = element.target.getAttribute("pay-type");
            switch(type){
                case "zhifubao":
                    $window.open("/exam/buy?out_trade_no="+out_trade_no+"&type="+order_type);
                    break;
                case "bank":
                    var code = element.target.getAttribute("bank-code");
                    window.open("/exam/buy?out_trade_no="+out_trade_no+"&type=1&bank="+code);
                    break;
                case "yinhanghuikuan":
                    document.getElementById('modal').style.display = "block";
                    break;
            }

        })

    }
}])
pay.constant("buyinfoURl","/exam/order/buyinfo?limit=99")
pay.controller('payCtr',['$scope','$location','AJAX','buyinfoURl',function($scope,$location,AJAX,buyinfoURl){

        $scope.pay = {
            list:"",
            orderId:""
        }

        init();
        $scope.close = function(){
            document.getElementById('modal').style.display = "none";
        }

        function init(){
            $scope.pay.orderId = $location.$$search.out_trade_no;
            getBuyInfo();
        }

        function getBuyInfo(){
            AJAX.getRequest(buyinfoURl,'GET','')
                .success(function(data,status){
                    $scope.pay.list = data.response;
                })
        }
}])
