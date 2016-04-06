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
    app.directive('pay',['$window','$location','loocha',function($window,$location,loocha){
        return function(scope, element, attrs){
            element.bind('click',function(element){
                var out_trade_no = $location.$$search.order_id, order_type = $location.$$search.type;
                var type = element.target.getAttribute("pay-type");
                switch(type){
                    case "zhifubao":
                        $window.open(loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type="+order_type);
                        break;
                    case "bank":
                        var code = element.target.getAttribute("bank-code");
                        window.open(loocha+"/exam/buy?out_trade_no="+out_trade_no+"&type=1&bank="+code);
                        break;
                    case "yinhanghuikuan":
                        document.getElementById('modal').style.display = "block";
                        break;
                }

            })

        }
    }])
    app.controller('payCtr',['$scope','$location','$interval','$stateParams','$http','loocha',function($scope,$location,$interval,$stateParams,$http,loocha){

        $scope.pay = {
            list:"",
            orderId:"",
            money:""
        }

        init();

        $scope.close = function(){
            document.getElementById('modal').style.display = "none";
        }

        function init(){
            $scope.pay.orderId = $location.$$search.order_id;
            $scope.pay.money = $location.$$search.money;
            //getBuyInfo();
        }

        function getBuyInfo(){
            $http.get(loocha+buyinfoURl)
                .success(function(data){
                    $scope.pay.list = data.response;
                })
        }

        //setInterval(function(){
        //    var obj = document.getElementById('scrollObj');
        //    var tmp = (obj.scrollLeft)++;
        //    //当滚动条到达右边顶端时
        //    if (obj.scrollLeft==tmp){obj.innerHTML+=obj.innerHTML}
        //    ////当滚动条滚动了初始内容的宽度时滚动条回到最左端
        //    //if (obj.scrollLeft>=obj.firstChild.offsetWidth){obj.scrollLeft=0;}
        //},20);
    }]);
})

