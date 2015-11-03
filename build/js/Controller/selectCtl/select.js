/**
 * Created by qbl on 2015/10/9.
 */
angular.module("gaokaoAPP.hope.selectd",['gaokaoAPP.hope'])
.constant("provinceURL","/city/province")
//.constant("provinceURL","../JSON/province.json")
.constant("tubeURL","../JSON/attribute.json")
//.constant("propURL","/school/prop?depart_type=1")
.constant("propURL","../JSON/prop.json")
.constant("type2","../JSON/areali_1.json")
.constant("type4","../JSON/areali_2.json")
.constant("type6","../JSON/areali_3.json")

.constant("type1","../JSON/areawen_1.json")
.constant("type3","../JSON/areawen_2.json")
.constant("type5","../JSON/areawen_3.json")

.constant("type8","../JSON/areagl_1.json")
.constant("type7","../JSON/areagw_1.json")

.controller("wishTabCtr-attr",['$scope',"$timeout",'$location',"ZYBinfoDATA","provinceURL","propURL","AJAX","tubeURL","loadSelection","loadingFilter",'type1','type2','type3','type4','type5','type6','type7','type8',function($scope,$timeout,$location,ZYBinfoDATA,provinceURL,propURL,AJAX,tubeURL,loadSelection,loadingFilter,type1,type2,type3,type4,type5,type6,type7,type8){
        $scope.attr = ZYBinfoDATA;
        $scope.area = "";
        $scope.areaArr = [];
        $scope.style="";
        $scope.attribute="";
        $scope.belongs="";
        $scope.tube = "";
        $scope.isShowProperty = false;
        $scope.screening = true;
        $scope.btnStyle = true;
        //////////////////////////////////////////////////////////////

        $scope.zyb = {
            city_prefer:[],//优先地区
            city_ignore:[],//拒绝地区
            city_name:[],//优先地区名称
            style_prefer:[],//院校分类
            style_ignore:[],//院校分类
            style_name:[],//院校分类
            attr_prefer:[],//办学性质
            attr_ignore:[],//办学性质
            attr_name:[],//办学性质
            belongs_prefer:[],//属管
            belongs_ignore:[],//属管
            belongs_name:[],//属管
        }

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

                clickEvent(target,state,then,id,$scope.zyb.city_ignore,$scope.zyb.city_prefer,$scope.zyb.city_name);

            },400);
        }

        $scope.clickStyle = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                clickEvent(target,state,then,id,$scope.zyb.style_ignore,$scope.zyb.style_prefer,$scope.zyb.style_name);
            },400);
        }

        $scope.clickAttr = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                clickEvent(target,state,then,id,$scope.zyb.attr_ignore,$scope.zyb.attr_prefer,$scope.zyb.attr_name);
            },400);
        }

        $scope.clickBelongs = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            TimeFn = $timeout(function(){
                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                clickEvent(target,state,then,id,$scope.zyb.belongs_ignore,$scope.zyb.belongs_prefer,$scope.zyb.belongs_name);
            },400);
        }

        function clickEvent(target,state,then,id,ignore,prefer,name){
            if(state == 2 ){
                ignore.splice($.inArray(id,ignore),1);
                $(target).attr('state',0);
                $(target).removeClass().addClass("btn btn-sm btn-default");
            }else if(state == 1){
                prefer.splice($.inArray(id,prefer),1);
                name.splice($.inArray(then,name),1);
                $(target).attr('state',0)
                $(target).removeClass().addClass("btn btn-sm btn-default");
            }else {
                prefer.push(id);
                name.push(then);
                $(target).attr('state',1)
                $(target).removeClass().addClass("btn btn-sm btn-success");
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

            dblclickEvent(target,state,then,id,$scope.zyb.city_ignore,$scope.zyb.city_prefer,$scope.zyb.city_name);

        }

        $scope.dblclickStyle = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            dblclickEvent(target,state,then,id,$scope.zyb.style_ignore,$scope.zyb.style_prefer,$scope.zyb.style_name);

        }

        $scope.dblclickAttr = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            dblclickEvent(target,state,then,id,$scope.zyb.attr_ignore,$scope.zyb.attr_prefer,$scope.zyb.attr_name);

        }

        $scope.dblclickBelongs = function($event,id){
            var then = this.list.name;
            $timeout.cancel(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

            dblclickEvent(target,state,then,id,$scope.zyb.belongs_ignore,$scope.zyb.belongs_prefer,$scope.zyb.belongs_name);

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
            all(arr,$scope.zyb.city_prefer,$scope.zyb.city_name);
        }

        $scope.allStyle = function(){
            var arr = $('button[style]');
            all(arr,$scope.zyb.style_prefer,$scope.zyb.style_name)
        }

        $scope.allAttr = function(){
            var arr = $('button[attr]');
            all(arr,$scope.zyb.attr_prefer,$scope.zyb.attr_name)
        }

        $scope.allBelongs = function(){
            var arr = $('button[belongs]');
            all(arr,$scope.zyb.attr_prefer,$scope.zyb.attr_name)
        }

        function all(arr,prefer,name){
            for(var i = 0; i< arr.length;i++){
                if(arr.eq(i).attr('state')!=1){
                    arr.eq(i).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                    prefer.push(arr.eq(i).attr('city'));
                    name.push(arr.eq(i).html());
                }
            }
        }


        $scope.cancleCity = function(provinceId){
            var arr = $("button[province="+provinceId+"]");
            cancle(arr,$scope.zyb.city_ignore,$scope.zyb.city_prefer,$scope.zyb.city_name);
        }

        $scope.cancleStyle = function(){
            var arr = $('button[style]');
            cancle(arr,$scope.zyb.style_ignore,$scope.zyb.style_prefer,$scope.zyb.style_name);
        }

        $scope.cancleAttr = function(){
            var arr = $('button[attr]');
            cancle(arr,$scope.zyb.style_ignore,$scope.zyb.attr_prefer,$scope.zyb.attr_name);
        }

        $scope.cancleBelongs = function(){
            var arr = $('button[Belongs]');
            cancle(arr,$scope.zyb.style_ignore,$scope.zyb.attr_prefer,$scope.zyb.attr_name);
        }

        function cancle(arr,ignore,prefer,name){

            for(var i = 0; i< arr.length;i++){
                arr.eq(i).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                ignore.push(arr.eq(i).attr('city'));
                prefer.splice($.inArray(arr.eq(i).attr('city'), prefer),1)
                name.splice($.inArray(arr.eq(i).html(), name),1)
            }

        }

}]);
