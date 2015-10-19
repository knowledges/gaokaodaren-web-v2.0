/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.hope",['gaokaoAPP.hope.selectd','gaokaoAPP.hope.college','gaokaoAPP.hope.personality'])
.constant("admintURL","/exam/school/admit")
.constant("submitURL","/exam/new")
.factory("ZYBinfoDATA",[function(){
    return {
        name:"",
        u_level:"",
        number:"",
        city:"",
        cityarea:"",
        scroe:"",
        devision:"",
        obl:"5",
        sel:"5",
        school_code:"",
        school:"",
        depart_code:"",
        depart:"",

        style_prefer:[],//类型
        style_ignore:[],
        belongs_prefer:[],//属管
        belongs_ignore:[],
        attr_prefer:[],//类别
        attr_ignore:[],
        prop3:false,//属性 985
        prop4:false,//211
        prop7:false,//C9
        prop8:false,//中外
        level1:false,//国家示范性高等职业院校
        level2:false,//国家级实训基地院校
        city_prefer:[],//城市
        city_ignore:[],

        depart_prefer:[],
        depart_ignore:[],

        graduate_option:[],//毕业去向
        depart_prefer2:[],//专业
        depart_ignore2:[],
        course_prefer:[],//强弱方面
        course_ignore:[],
        wish_prefer:[], //学习愿望方面
        wish_ignore:[],
        user_prefer:[],//兴趣爱好方面
        user_ignore:[],
        gift_prefer:[],//能力特长方面
        gift_ignore:[],
        nature_prefer:[],//性格倾向方面
        economy_option:false,//家庭经济
        prop5:false,//政策照顾加分
        prop6:false,//等级级差加分
        physical_ignore:[] //体检
    }
}])
.factory("loadSelection",[function(){
        return {
           defultsChecked:function(list,no){
               var len = list.length,isChecked = false;
               for(var i =0;i<len;i++){
                   if(no == list[i]){
                       isChecked = true;
                       break;
                   }
               }
               return isChecked;
           }
        }
}])
.factory("loadingFilter",[function(){
        return {
            loadFilter:function(item,list,isNest){
                var html = [],id = [],
                    items = item.length,len = list.length;
                if (isNest != undefined && isNest != '') {
                    for (var i = 0; i < items; i++) {
                        if (item[i].list != undefined) {
                            for (var j = 0; j < item[i].list.length; j++) {
                                for (var k = 0; k < len; k++) {
                                    if (list[k] == item[i].list[j].id && $.inArray(list[k], id) < 0) {
                                        id.push(item[i].list[j].id);
                                        html.push(item[i].list[j].name);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < items; i++) {
                        for (var j = 0; j < len; j++) {
                            if (list[j] == item[i].id) {
                                html.push(item[i].name);
                                id.push(item[i].id)
                            }
                        }
                    }
                }

                html.join(',');
                id.join(',');
                return html+"-"+id;
            }
        }
}])
.controller("wishTabCtr-info", ['$scope','$location','ZYBinfoDATA',function ($scope,$location,ZYBinfoDATA) {

        var yxb = [
            "",
            "文科本一考生志愿意向表",
            "理科本一考生志愿意向表",
            "文科本二考生志愿意向表",
            "理科本二考生志愿意向表",
            "文科本三考生志愿意向表",
            "理科本三考生志愿意向表",
            "文科高职(专科)考生志愿意向表",
            "理科高职(专科)考生志愿意向表"
        ];
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
        ]

        $scope.table ={
            yxb:"",
            yxb_title:""
        }

        ZYBinfoDATA.types = $location.$$search.types == true ? 1 :$location.$$search.types;
        ZYBinfoDATA.u_level = $location.$$search.user_level == true ? 1 :$location.$$search.user_level;

        $scope.table.yxb = yxb[ ZYBinfoDATA.types];
        $scope.table.yxb_title = yxb_title[ZYBinfoDATA.u_level];

        $scope.info = ZYBinfoDATA;

}])
.controller("wishTabCtr-chance",['$scope','admintURL','ZYBinfoDATA','AJAX',function($scope,admintURL,ZYBinfoDATA,AJAX){

        $scope.info = ZYBinfoDATA;

        $scope.validate = {
            isPass:false,
            regShow:false,
            title:"",
            str :""
        }

        $scope.close = function(){
            $scope.validate.regShow = false;
        }

        $scope.changePay = function(){
            var name = $scope.info.name,
                number = $scope.info.number,
                city = $scope.info.city,
                cityarea = $scope.info.cityarea,
                scroe = $scope.info.scroe,
                school_code = $scope.info.school_code,
                school = $scope.info.school;
            if (regIsEmpey(name, "姓名") && regNumber(number, "考生号") && regIsEmpey(city, "城市") && regIsEmpey(cityarea, "县（级、市）") && regIsEmpey(scroe, "考分") && regIsEmpey(school_code, "高校编号") && regIsEmpey(school, "学校名称")) {
                $scope.validate.str ="你确定要支付20元，来获取概率？";
                $scope.validate.title = "支付";
                $scope.validate.regShow = true;
                console.log($scope.validate.isPass);
            }
        }

        $scope.payChance = function(){
            var param = {};
            param.name = ZYBinfoDATA.name;
            param.u_level = ZYBinfoDATA.u_level;
            param.devision = ZYBinfoDATA.devision;
            param.number = ZYBinfoDATA.number;
            param.city = ZYBinfoDATA.city;
            param.cityarea = ZYBinfoDATA.cityarea;
            param.obl = ZYBinfoDATA.obl;
            param.sel = ZYBinfoDATA.sel;
            param.score = ZYBinfoDATA.score;
            param.school_code=ZYBinfoDATA.school_code;
            param.school = ZYBinfoDATA.school;
            param.depart = ZYBinfoDATA.depart;
            param.depart_code = ZYBinfoDATA.depart_code;

            DATA.getRequest(admintURL,'GET', $.param(param))
                .success(function(data,status){
                    debugger;
                });
        }

        function regIsEmpey(element,str){
            if(element.length<=0){
                $scope.validate.str = str+"不能为空";
                $scope.validate.title = "验证";
                $scope.validate.regShow = true;
                $scope.validate.isPass = false;
                return false;
            }else{
                $scope.validate.str = "";
                $scope.validate.title = "";
                $scope.validate.regShow = false;
                $scope.validate.isPass = true;
                return true;
            }
        }

        function regNumber(element){
            if(element.length<=0){
                $scope.validate.str = "考生号不能为空";
                $scope.validate.title = "验证";
                $scope.validate.regShow = true;
                $scope.validate.isPass = false;
                return false;
            }else if(element.length!=14){
                $scope.validate.str = "考生号必须14位";
                $scope.validate.title = "验证";
                $scope.validate.regShow = true;
                $scope.validate.isPass = false;
                return false;
            }else{
                $scope.validate.str = "";
                $scope.validate.title = "";
                $scope.validate.regShow = false;
                $scope.validate.isPass = true;
                return true;
            }
        }
}])
.controller("wishTabCtr-screenProp",["$scope","AJAX","ZYBinfoDATA","submitURL",function($scope,AJAX,ZYBinfoDATA,submitURL){
    $scope.screenProp = ZYBinfoDATA;

        /**符合上述要求的高校情况*/
    $scope.subScreenProp = function(){
        var param = {};
        param.user_id = 350;
        param.level = 3;
        param.name = this.screenProp.name;
        param.u_level = this.screenProp.u_level;
        param.number = this.screenProp.number;
        param.city = this.screenProp.city;
        param.cityarea = this.screenProp.cityarea;
        param.score = this.screenProp.scroe;
        param.devision = this.screenProp.devision;
        param.obl = this.screenProp.obl;
        param.sel = this.screenProp.sel;
        param.style_prefer = this.screenProp.style_prefer;
        param.style_ignore = this.screenProp.style_ignore;
        param.belongs_prefer = this.screenProp.belongs_prefer;
        param.belongs_ignore = this.screenProp.belongs_ignore;
        param.attr_prefer = this.screenProp.attr_prefer;
        param.attr_ignore = this.screenProp.attr_ignore;
        param.school_prop3 = this.screenProp.prop3;
        param.school_prop4 = this.screenProp.prop4;
        param.school_prop7 = this.screenProp.prop7;
        param.school_prop8 = this.screenProp.prop8;
        param.city_prefer = this.screenProp.city_prefer;
        param.city_ignore = this.screenProp.city_ignore;
        param.depart_prefer = this.screenProp.depart_prefer;
        param.depart_ignore = this.screenProp.depart_ignore;
        param.class_prefer = this.screenProp.class_prefer;
        param.class_ignore = this.screenProp.class_ignore;
        debugger;
        alert('需要调试');
        //TODO
        AJAX.getRequest(submitURL,'GET', $.param(param))
            .success(function(data,status){

        })
    }
}])
.controller("wishTabCtr-screenCollege",["$scope","AJAX","ZYBinfoDATA","submitURL",function($scope,AJAX,ZYBinfoDATA,submitURL){
        $scope.college = ZYBinfoDATA

        $scope.subScreenCollege = function(){
            var param = {};
            param.user_id = 350;
            param.level = 4;
            param.name = this.college.name;
            param.u_level = this.college.u_level;
            param.number = this.college.number;
            param.city = this.college.city;
            param.cityarea = this.college.cityarea;
            param.score = this.college.scroe;
            param.devision = this.college.devision;
            param.obl = this.college.obl;
            param.sel = this.college.sel;
            param.style_prefer = this.college.style_prefer;
            param.style_ignore = this.college.style_ignore;
            param.belongs_prefer = this.college.belongs_prefer;
            param.belongs_ignore = this.college.belongs_ignore;
            param.attr_prefer = this.college.attr_prefer;
            param.attr_ignore = this.college.attr_ignore;
            param.school_prop3 = this.college.prop3;
            param.school_prop4 = this.college.prop4;
            param.school_prop7 = this.college.prop7;
            param.school_prop8 = this.college.prop8;
            param.city_prefer = this.college.city_prefer;
            param.city_ignore = this.college.city_ignore;
            param.depart_prefer = this.college.depart_prefer;
            param.depart_ignore = this.college.depart_ignore;
            param.class_prefer = this.college.class_prefer;
            param.class_ignore = this.college.class_ignore;
            param.depart_prefer = this.college.depart_prefer;
            debugger;
            alert('需要调试');
            //TODO
            AJAX.getRequest(submitURL,'GET', $.param(param))
                .success(function(data,status){

                })
        }
}])
.controller("wishTabCtr-screenCool",['$scope','AJAX',"ZYBinfoDATA","submitURL",function($scope,AJAX,ZYBinfoDATA,submitURL){
        $scope.cool = ZYBinfoDATA;

        $scope.subScreenCool = function(){
            var param = {};
            param.user_id = 350;
            param.level = 5;
            param.name = this.cool.name;
            param.u_level = this.cool.u_level;
            param.number = this.cool.number;
            param.city = this.cool.city;
            param.cityarea = this.cool.cityarea;
            param.score = this.cool.scroe;
            param.devision = this.cool.devision;
            param.obl = this.cool.obl;
            param.sel = this.cool.sel;
            param.style_prefer = this.cool.style_prefer;
            param.style_ignore = this.cool.style_ignore;
            param.belongs_prefer = this.cool.belongs_prefer;
            param.belongs_ignore = this.cool.belongs_ignore;
            param.attr_prefer = this.cool.attr_prefer;
            param.attr_ignore = this.cool.attr_ignore;
            param.school_prop3 = this.cool.prop3;
            param.school_prop4 = this.cool.prop4;
            param.school_prop7 = this.cool.prop7;
            param.school_prop8 = this.cool.prop8;
            param.city_prefer = this.cool.city_prefer;
            param.city_ignore = this.cool.city_ignore;
            param.depart_prefer = this.cool.depart_prefer;
            param.depart_ignore = this.cool.depart_ignore;
            param.class_prefer = this.cool.class_prefer;
            param.class_ignore = this.cool.class_ignore;
            param.depart_prefer = this.cool.depart_prefer;

            //TODO 服务器数据接口参数问题

            param.graduate_option=this.cool.graduate_option;
            param.depart_prefer2=this.cool.graduate_option;
            param.depart_ignore2=this.cool.graduate_option;
            param.course_prefer=this.cool.graduate_option;
            param.wish_prefer=this.cool.graduate_option;
            param.user_prefer=this.cool.graduate_option;
            param.gift_prefer=this.cool.graduate_option;
            param.nature_prefer=this.cool.graduate_option;

            debugger;
            alert('需要调试');
            //TODO
            AJAX.getRequest(submitURL,'GET', $.param(param))
                .success(function(data,status){

                })
        }
}])