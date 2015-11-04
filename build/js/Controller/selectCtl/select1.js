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
        }

        var TimeFn = null;
        /**
         * 1同意
         * 0取消
         * 2取消拒绝
         * */
        $scope.clickEvent = function($event,id){
            var then = this.list.name;
            clearTimeout(TimeFn);
            TimeFn = setTimeout(function(){

                var target = $event.target,
                    state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');

                clickEvent(target,state,$scope.zyb.city_ignore,$scope.zyb.city_prefer,$scope.zyb.city_name);

                //if(state == 2 ){
                //    $scope.zyb.city_ignore.splice($.inArray(id,$scope.zyb.city_ignore),1);
                //
                //    $(target).attr('state',0);
                //    $(target).removeClass().addClass("btn btn-sm btn-default");
                //}else if(state == 1){
                //    $scope.zyb.city_prefer.splice($.inArray(id,$scope.zyb.city_prefer),1);
                //    $scope.zyb.city_name.splice($.inArray(then,$scope.zyb.city_name),1);
                //
                //    $(target).attr('state',0)
                //    $(target).removeClass().addClass("btn btn-sm btn-default");
                //}else {
                //    $scope.zyb.city_prefer.push(id);
                //    $scope.zyb.city_name.push(then);
                //
                //    $(target).attr('state',1)
                //    $(target).removeClass().addClass("btn btn-sm btn-success");
                //}

            },400);
        }


        function clickEvent(target,state,ignore,prefer,name){
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
         * 拒绝
         **/
        $scope.dblclickEvent = function($event,id){
            var then = this.list.name;
            clearTimeout(TimeFn);
            var target = $event.target,
                state = $(target).attr('state') == undefined ? 0 : $(target).attr('state');
            if(state == 2){

                $scope.zyb.city_ignore.splice($.inArray(id,$scope.zyb.city_ignore),1);
                $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");

            }else if(state == 1){
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");

                $scope.zyb.city_prefer.splice($.inArray(id,$scope.zyb.city_prefer),1);
                $scope.zyb.city_name.splice($.inArray(then,$scope.zyb.city_name),1);
                $scope.zyb.city_ignore.push(id);
            }else if (state == 0){
                $(target).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                $scope.zyb.city_ignore.push(id);
            }
        }

        AJAX.getRequest(propURL,'GET',"")
            .success(function(data,status){
                var list = data.response;
                var arr_style = [],arr_attr=[],attr_belongs=[];
                var area_list = [];
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

        $timeout(function(){
            $scope.isCheckedCity = function (no) {
                return loadSelection.defultsChecked($scope.attr.city_prefer,no);
            }

            $scope.isCheckedStyle = function(no){
                return loadSelection.defultsChecked($scope.attr.style_prefer,no);
            }

            $scope.isCheckedAttr = function(no){
                return loadSelection.defultsChecked($scope.attr.attr_prefer,no);
            }

            $scope.isCheckedBelongs = function(no){
                return loadSelection.defultsChecked($scope.attr.belongs_prefer,no);
            }

            loadingSelCity();
            loadingSelStyle();
            loadingSelAttr();
            loadingBelongs();

        },500);

        function loadingSelCity() {
            /**加载选中的城市*/
            var html = loadingFilter.loadFilter($scope.area, $scope.attr.city_prefer);
            $scope.area_list = html.split("-")[0].split(",") == "" ? [] : html.split("-")[0].split(",");
            $scope.area_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingSelStyle() {
            /**加载选中的院校分类*/
            var html = loadingFilter.loadFilter($scope.style, $scope.attr.style_prefer)
            $scope.style_list = html.split("-")[0].split(",") == "" ? [] : html.split("-")[0].split(",");
            $scope.style_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingSelAttr(){/**加载选中的办学性质 */
        var html = loadingFilter.loadFilter($scope.attribute,$scope.attr.attr_prefer)
            $scope.attribute_list = html.split("-")[0].split(",") == "" ? [] : html.split("-")[0].split(",");
            $scope.attribute_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

        function loadingBelongs(){/**加载选中的院校属管*/
        var html = loadingFilter.loadFilter($scope.belongs,$scope.attr.belongs_prefer)
            $scope.belongs_list = html.split("-")[0].split(",") == "" ? [] : html.split("-")[0].split(",");
            $scope.belongs_id = html.split("-")[1].split(",") == "" ? [] : html.split("-")[1].split(",");
        }

/////////////////////////////Event/////////////////////////////////////////////////////////////////////

        $scope.inputClick = function(id,name,number){
            if(number == 1){
                if($.inArray(name,$scope.area_list)>=0){
                    $scope.attr.city_prefer.splice($.inArray(id,$scope.area_id),1);
                    $scope.area_list.splice($.inArray(name,$scope.area_list),1);
                    $scope.area_id.splice($.inArray(id,$scope.area_id),1);
                }else{
                    $scope.area_id.push(id);
                    $scope.area_list.push(name);
                    $scope.attr.city_prefer = $scope.area_id;
                }
            }else if(number == 2){
                if($.inArray(name,$scope.style_list)>=0){
                    $scope.attr.style_prefer.splice($.inArray(name,$scope.style_list),1);
                    $scope.style_list.splice($.inArray(name,$scope.style_list),1);
                    $scope.style_id.splice($.inArray(id,$scope.style_id),1);
                }else{
                    $scope.style_list.push(name);
                    $scope.style_id.push(id);
                    $scope.attr.style_prefer = $scope.style_id;
                }
            }else if(number == 3){
                if($.inArray(name,$scope.attribute_list)>=0){
                    $scope.attr.attr_prefer.splice($.inArray(name,$scope.attribute_list),1);
                    $scope.attribute_list.splice($.inArray(name,$scope.attribute_list),1);
                    $scope.attribute_id.splice($.inArray(id,$scope.attribute_id),1);
                }else{
                    $scope.attribute_id.push(id);
                    $scope.attribute_list.push(name);
                    $scope.attr.attr_prefer = $scope.attribute_id;
                }
            }else if(number == 4){
                if($.inArray(name,$scope.belongs_list)>=0){
                    $scope.belongs_list.splice($.inArray(name,$scope.belongs_list),1);
                    $scope.belongs_id.splice($.inArray(id,$scope.belongs_id),1);
                }else{
                    $scope.belongs_id.push(id);
                    $scope.belongs_list.push(name);
                    $scope.attr.belongs_prefer = $scope.belongs_id;
                }
            }

            if($scope.attr.city_prefer.length>0 || $scope.attr.style_prefer.length>0 || $scope.attr.attr_prefer.length>0 || $scope.attr.belongs_prefer.length>0){
                $scope.isShowProperty = true;
            }else{
                $scope.isShowProperty = false;
            }
        }

        $scope.removeAll = function(){
            $scope.area_id = [];
            $scope.area_list=[];
            $scope.attr.city_prefer = [];

            $scope.style_id =[];
            $scope.style_list = [];
            $scope.attr.style_prefer = [];

            $scope.belongs_id = [];
            $scope.belongs_list = [];
            $scope.attr.belongs_prefer = [];

            $scope.attribute_id = [];
            $scope.attribute_list = [];
            $scope.attr.attr_prefer = [];

            $scope.isShowProperty = false;

        }

        $scope.removeThis = function(index,number,name){
            if(name==undefined){
                if(number == 1){
                    $scope.attr.city_prefer.splice(index,1);
                    $scope.area_list.splice(index,1);
                    $scope.area_id.splice(index,1);
                }else if(number == 2){
                    $scope.attr.style_prefer.splice(index,1);
                    $scope.style_list.splice(index,1);
                    $scope.style_id.splice(index,1);
                }else if(number == 3){
                    $scope.attr.attr_prefer.splice(index,1);
                    $scope.attribute_list.splice(index,1);
                    $scope.attribute_id.splice(index,1);
                }else{
                    $scope.attr.belongs_prefer.splice(index,1);
                    $scope.belongs_list.splice(index,1);
                    $scope.belongs_id.splice(index,1);
                }
            }else{
                if(name =="C9联盟"){
                    $scope.attr.prop7 = false;
                }else if(name == "985工程高校"){
                    $scope.attr.prop3 = false;
                }else if (name == "211工程高校"){
                    $scope.attr.prop4 = false;
                }else if(name == "中外合作办学"){
                    $scope.attr.prop8 = false;
                }else if (name="国家示范性高等职业院校"){
                    $scope.attr.level1 = false;
                }else{
                    $scope.attr.level2 = false;
                }
            }

            if ($scope.attr.city_prefer.length <= 0 && $scope.attr.city_prefer.length <= 0 && $scope.attr.attr_prefer.length <= 0 && $scope.attr.belongs_prefer.length <= 0 && !$scope.attr.prop7 && !$scope.attr.prop3 && !$scope.attr.prop4 && !$scope.attr.prop8) {
                $scope.isShowProperty = false;
            }else if ($scope.attr.city_prefer.length <= 0 && $scope.attr.city_prefer.length <= 0 && $scope.attr.attr_prefer.length <= 0 && $scope.attr.belongs_prefer.length <= 0 && !$scope.attr.level1 && !$scope.attr.level2){

            }else{
                $scope.isShowProperty = true;
            }

        }

        $scope.clickScreen = function(isTrue){
            $scope.screening = isTrue;
        }
    }]);
