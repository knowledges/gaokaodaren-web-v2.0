/**
 * Created by Administrator on 2016/3/29.
 */
'use strict';
require(['app'],function(app){
    app.directive('doclk',[function(){
        return function(scope,element,attrs){
            element.find('li').bind('click',function(e){
                var idx = $(this).attr('idx');
                if(idx == 1){
                    element.find('li').removeClass('active');
                    $(this).addClass('active');
                    $("#menu").show(500, function () {
                        $("#menu-infolist").hide();
                    });
                }
            });
        }
    }]);
    app.controller('artCtr',["$scope","$sce",function($scope,$sce){
        $scope.menuArr = [{
            id:1,
            name:"分数分析深度查询"
        },{
            id:2,
            name:"招生政策深度查询"
        },{
            id:3,
            name:"招生计划深度查询"
        },{
            id:4,
            name:"资料汇编深度查询"
        },{
            id:5,
            name:"招生高校深度查询"
        },{
            id:6,
            name:"招生专业深度查询"
        },{
            id:7,
            name:"招生城市深度查询"
        },{
            id:8,
            name:"个性满足深度查询"
        }];
        $scope.orderList=[];
        $scope.money = 0;
        $scope.condition={
            inputTemplete : 0,
            timer:"",
            schlName:"",
            departName:"",
            parentTitle:"",
        }
        $scope.menuInfoArr = [
            {
                id:100,
                name:"（一）从考生考分与往年高校录取分数比较角度的深度查询",
                inputTemplete:0,
                leaf:0,
                money:0,
                sublist:[
                    {
                        id:1,
                        name:"1、近三年高校、专业录取分差表",
                        leaf:1,
                        money:5,
                        inputTemplete:1,
                        sublist:[]
                    },{
                        id:2,
                        name:"2、近三年高校录取分差排序表：",
                        leaf:0,
                        money:0,
                        inputTemplete:0,
                        sublist:[{
                            id:3,
                            name:"最低分差排序",
                            inputTemplete:2,
                            leaf:1,
                            money:2,
                            sublist:[]
                        },{
                            id:4,
                            name:"中点分差排序",
                            inputTemplete:2,
                            leaf:1,
                            money:2,
                            sublist:[]
                        },{
                            id:5,
                            name:"最高分差排序",
                            inputTemplete:2,
                            leaf:1,
                            money:2,
                            sublist:[]
                        }]
                    },{
                        id:2,
                        name:"3、近三年高校录取分差排序表：",
                        inputTemplete:0,
                        leaf:0,
                        money:0,
                        sublist:[{
                            id:3,
                            name:"最低分差排序",
                            inputTemplete:3,
                            leaf:1,
                            money:2,
                            sublist:[]
                        },{
                            id:4,
                            name:"中点分差排序",
                            inputTemplete:3,
                            leaf:1,
                            money:2,
                            sublist:[]
                        },{
                            id:5,
                            name:"最高分差排序",
                            inputTemplete:3,
                            leaf:1,
                            money:2,
                            sublist:[]
                        }]
                    },{
                        id:1,
                        name:"4、往年分数转换为今年分数",
                        inputTemplete:1,
                        leaf:1,
                        money:0,
                        sublist:[]
                    }
                ]
            }
        ]

        /////////click////////////////////////////////////////////////////
        $scope.findMenuInfo = function(e){
            $("#doc li").removeClass('active').eq(1).addClass('active');
            $("#menu").hide();
            $("#menu-infolist").show(500);
        }

        /**
         *  leaf: 1：代表根节点 0：不是根节点，且有子节点，子节点同理
         *  money: 大于0 收费
         *  inputTemplete 显示模板，1：年限 2：年限+学校名称 3：年限+专业名称
         * @param e
         */
        $scope.subClk = function(e){
            $(".list-group-ul").hide();
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.html(),inputTemplete=that.attr("inputTemplete");
            if (money == 0 && leaf == 0){
                $(e.target).next().fadeIn(500);
                $scope.condition.parentTitle = name;
            }else{
                $scope.condition.inputTemplete = inputTemplete;
                $(".modal").show();
                $("#subInfo").attr({idx:idx,money:money,leaf:leaf,name:name,inputTemplete:inputTemplete});
            }

        };

        $scope.close = function(){
            $(".modal").hide();
        };

        /**
         * 提交信息
         */
        $scope.subOrder = function(e){
            var that = $(e.target),money = parseInt(that.attr("money")),leaf = parseInt(that.attr("leaf")),idx= parseInt(that.attr("idx")),name=that.attr("name"),inputTemplete=that.attr("inputTemplete");
            if(money==0 && leaf>0){
                //免费的可以直接给出结果
                var timer = $scope.condition.timer;
                /*TODO 调用文章接口*/
            }else if (money > 0 && leaf > 0){
                var obj = new Object();
                    obj.id = idx;
                    obj.name =  $scope.condition.parentTitle+name;
                    obj.schlName = $scope.condition.schlName;
                    obj.departName = $scope.condition.departName;
                    obj.money = money;
                    obj.timer = $scope.condition.timer;
                $scope.orderList.push(obj);
                $scope.money  += money;
                $scope.condition.schlName = $scope.condition.departName = $scope.condition.timer = $scope.condition.parentTitle = "";
            }
            $(".modal").hide();
        };

        /**
         *  移除 orderList 内容
         * @param idx
         */
        $scope.remClk = function(idx){
            $scope.money  -= $scope.orderList[idx].money;
            $scope.orderList.splice(idx,1);
        };

    }]);
});