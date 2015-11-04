/**
 * Created by qbl on 2015/10/9.
 */
angular.module("gaokaoAPP.hope.selectd",['gaokaoAPP.hope'])
.constant("provinceURL","/city/province")
.constant("tubeURL","../JSON/attribute.json")
.constant("propURL","../JSON/prop.json")
.constant("type2","../JSON/areali_1.json")
.constant("type4","../JSON/areali_2.json")
.constant("type6","../JSON/areali_3.json")
.constant("type1","../JSON/areawen_1.json")
.constant("type3","../JSON/areawen_2.json")
.constant("type5","../JSON/areawen_3.json")
.constant("type8","../JSON/areagl_1.json")
.constant("type7","../JSON/areagw_1.json")
.controller("wishTabCtr-attr",['$scope',"$timeout",'$location',"ZYBinfoDATA","provinceURL","propURL","AJAX","tubeURL","loadClickEvent","loadDblclickEvent","loadClickAll","loadClickCancle",'type1','type2','type3','type4','type5','type6','type7','type8',function($scope,$timeout,$location,ZYBinfoDATA,provinceURL,propURL,AJAX,tubeURL,loadClickEvent,loadDblclickEvent,loadClickAll,loadClickCancle,type1,type2,type3,type4,type5,type6,type7,type8){

        $scope.attr = ZYBinfoDATA;
        $scope.area = "";
        $scope.areaArr = [];
        $scope.style = "";
        $scope.attribute = "";
        $scope.belongs = "";
        $scope.tube = "";
        $scope.isShowProperty = false;
        $scope.screening = true;
        $scope.btnStyle = true;

        $scope.zyb = {
            city_name: [],//优先地区名称
            style_name: [],//院校分类
            attr_name: [],//办学性质
            belongs_name: [],//属管，
            prop_name: [],//院校特色
        };

        init();

        function init(){
            var num = $location.$$search.type == true ? 1 :$location.$$search.type;
            var url = "";

            if(num == 1){
                url = type1;
            }else if (num == 2){
                url = type2;
            }else if (num == 3){
                url = type3;
            }else if (num == 4){
                url = type4;
            }else if(num == 5){
                url = type5;
            }else if (num == 6){
                url = type6;
            }else if (num == 7){
                url = type7;
            }else {
                url = type8;
            }

            console.log(url);

            AJAX.getRequest(url,'GET',"")
                .success(function(data,status){
                    $scope.area = data;
                });

            AJAX.getRequest(propURL,'GET',"")
                .success(function(data,status){
                    var list = data.response;
                    var arr_style = [],arr_attr=[],attr_belongs=[];
                    for (var i = 0; i < list.length; i++) {
                        if(list[i].type == 0){
                            arr_style.push(list[i]);
                        }else if(list[i].type == 2){
                            arr_attr.push(list[i]);
                        }else if(list[i].type == 1){
                            attr_belongs.push(list[i]);
                        }
                    }
                    arr_style.join(',');
                    arr_attr.join(',');
                    attr_belongs.join(',')
                    $scope.style = arr_style;
                    $scope.attribute = arr_attr;
                    $scope.belongs = attr_belongs;
                });

            AJAX.getRequest(tubeURL,'GET',"")
                .success(function(data,status){
                    var list = data.response;
                    var tube_list = [];
                    for(var i = 0; i< list.length;i++){
                        if($scope.attr.u_level == 3){
                            if(list[i].type == 2){
                                tube_list.push(list[i]);
                            }
                        }else{
                            if(list[i].type == 1){
                                tube_list.push(list[i]);
                            }
                        }

                    }
                    tube_list.join(',');
                    $scope.tube = tube_list ;
                });

            //TODO new  加载内容 二期

            $scope.clickScreen = function(isTrue){
                $scope.screening = isTrue;
            }
        }

        var TimeFn = null;

        /**
         * 1同意
         * 0取消
         * 2取消拒绝
         * */
        $scope.clickCity = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.attr.city_ignore,$scope.attr.city_prefer,$scope.zyb.city_name);
            },400);
        }

        $scope.clickStyle = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.attr.style_ignore,$scope.attr.style_prefer,$scope.zyb.style_name);
            },400);
        }

        $scope.clickAttr = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.attr.attr_ignore,$scope.attr.attr_prefer,$scope.zyb.attr_name);
            },400);
        }

        $scope.clickBelongs = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
                loadClickEvent.clickEvent(target,state,then,id,$scope.attr.belongs_ignore,$scope.attr.belongs_prefer,$scope.zyb.belongs_name);
            },400);
        }

        $scope.clickProp = function($event,id,type){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                if(state == 2){
                    propState(false,id,type);
                    $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1)
                    $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                }else if (state == 1){
                    propState(false,id,type);
                    $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1)
                    $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                }else {
                    propState(true,id,type);
                    $scope.zyb.prop_name.push(then);
                    $(target).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                }
            },400);
        }

        /**
         * 修改prop状态
         * ture or false
         * */
        function propState(isTrue,id,type){
            if (type == 1) {
                if (id == 0) {
                    $scope.attr.prop7 = isTrue;
                } else if (id == 1) {
                    $scope.attr.prop3 = isTrue;
                } else if (id == 2) {
                    $scope.attr.prop4 = isTrue;
                } else if (id == 24) {
                    $scope.attr.prop8 = isTrue;
                }
            } else {
                if (id == 1) {
                    $scope.attr.level1 = isTrue;
                } else if (id == 2) {
                    $scope.attr.level2 = isTrue;
                }
            }
        }

        /**
         * 2拒绝
         **/
        $scope.dblclickCity = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.attr.city_ignore,$scope.attr.city_prefer,$scope.zyb.city_name);

        }

        $scope.dblclickStyle = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.attr.style_ignore,$scope.attr.style_prefer,$scope.zyb.style_name);

        }

        $scope.dblclickAttr = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.attr.attr_ignore,$scope.attr.attr_prefer,$scope.zyb.attr_name);

        }

        $scope.dblclickBelongs = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            loadDblclickEvent.dblclickEvent(target,state,then,id,$scope.attr.belongs_ignore,$scope.attr.belongs_prefer,$scope.zyb.belongs_name);

        }

        $scope.dblclickProp = function($event,id,type){
            var then = this.list.name;
            $timeout.cancel(TimeFn);

            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            if(state == 2){
                propState(false,id,type);
                $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }else if (state == 1){
                propState(false,id,type);
                $scope.zyb.prop_name.splice($.inArray(then,$scope.zyb.prop_name),1);
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
            }else {
                propState(false,id,type);
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
            }

        }

        function dblclickEvent(target,state,then,id,ignore,prefer,name){
            if(state == 2){
                ignore.splice($.inArray(id,ignore),1);
                $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
            }else if(state == 1){
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                prefer.splice($.inArray(id,prefer),1);
                name.splice($.inArray(then,name),1);
                ignore.push(id);
            }else if (state == 0){
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                ignore.push(id);
            }
        }

        $scope.allCity = function(provinceId){
            var arr = $("button[province="+provinceId+"]");
            loadClickAll.all(arr,$scope.attr.city_prefer,'city',$scope.zyb.city_name);
        }

        $scope.allStyle = function(){
            var arr = $('button[style]');
            loadClickAll.all(arr,$scope.attr.style_prefer,'style',$scope.zyb.style_name)
        }

        $scope.allAttr = function(){
            var arr = $('button[attr]');
            loadClickAll.all(arr,$scope.attr.attr_prefer,'attr',$scope.zyb.attr_name)
        }

        $scope.allBelongs = function(){
            var arr = $('button[belongs]');
            loadClickAll.all(arr,$scope.attr.attr_prefer,'belongs',$scope.zyb.attr_name)
        }

        $scope.allProp = function(){
            var arr = $('button[prop]');
            loadClickAll.all(arr,"",$scope.zyb.prop_name,1);
        }

        function all(arr,prefer,name,type){
            if(type ==undefined){
                for(var i = 0; i< arr.length;i++){
                    if(arr.eq(i).attr('state')!=1){
                        arr.eq(i).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                        prefer.push(arr.eq(i).attr('city'));
                        name.push(arr.eq(i).html());
                    }
                }
            }else{
                for(var i = 0; i< arr.length;i++){
                    if(arr.eq(i).attr('state')!=1){
                        arr.eq(i).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                        if(arr.eq(i).attr('prop') == "prop3"){
                            $scope.attr.prop3 = true;
                        }else if(arr.eq(i).attr('prop') == "prop4"){
                            $scope.attr.prop4 = true;
                        }else if(arr.eq(i).attr('prop') == "prop7"){
                            $scope.attr.prop7 = true;
                        }else if (arr.eq(i).attr('prop') == "prop8"){
                            $scope.attr.prop8 = true;
                        }else if (arr.eq(i).attr('prop') == "level1"){
                            $scope.attr.level1 = true;
                        }else if (arr.eq(i).attr('prop') == "level2"){
                            $scope.attr.level2 = true;
                        }
                        name.push(arr.eq(i).html());
                    }
                }
            }

        }

        $scope.cancleCity = function(provinceId){
            var arr = $("button[province="+provinceId+"]");
            loadClickCancle.reject(arr,$scope.attr.city_ignore,$scope.attr.city_prefer,$scope.zyb.city_name);
        }

        $scope.cancleStyle = function(){
            var arr = $('button[style]');
            loadClickCancle.reject(arr,$scope.attr.style_ignore,$scope.attr.style_prefer,$scope.zyb.style_name);
        }

        $scope.cancleAttr = function(){
            var arr = $('button[attr]');
            loadClickCancle.reject(arr,$scope.attr.attr_ignore,$scope.attr.attr_prefer,$scope.zyb.attr_name);
        }

        $scope.cancleBelongs = function(){
            var arr = $('button[Belongs]');
            loadClickCancle.reject(arr,$scope.attr.belongs_ignore,$scope.attr.belongs_prefer,$scope.zyb.attr_name);
        }

        $scope.cancleProp = function(){
            var arr = $('button[prop]');
            loadClickCancle.reject(arr,"","",$scope.zyb.prop_name,1);
        }

        $scope.$watch($scope.zyb.city_name,function(newValue,oldValue,scope){
            debugger;
            console.log(oldValue);
            console.log(newValue);
        });

}]);
