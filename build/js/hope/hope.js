/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.hope",['gaokaoAPP.hope.selectd','gaokaoAPP.hope.college','gaokaoAPP.hope.personality'])
.constant("admintURL","/exam/school/admit")
.factory("ZYBinfoDATA",[function(){
    return {
        name:"球包",
        u_level:"",
        number:"14321111111113",
        city:"11",
        cityarea:"11",
        scroe:"366",
        devision:"",
        obl:"5",
        sel:"5",
        school_code:"1101",
        school:"南京大学",
        depart_code:"",
        depart:"",

        style_prefer:[1,2],//类型
        style_ignore:"",
        belongs_prefer:[14],//属管
        belongs_ignore:"",
        attr_prefer:[17],//类别
        attr_ignore:"",
        prop3:"",//属性 985
        prop4:"",//211
        prop7:"",//C9
        prop8:"",//中外
        city_prefer:[38],//城市
        city_ignore:"",

        depart_prefer:[35,193,2096,2101,2107],
        depart_ignore:[],

        graduate_option:[294,300,302],//毕业去向
        depart_prefer2:[275,162],//专业
        depart_ignore2:[163],
        course_prefer:[106],//强弱方面
        course_ignore:[107],
        wish_prefer:[291,285,287,280], //学习愿望方面
        wish_ignore:[],
        user_prefer:[115,117,121,122],//兴趣爱好方面
        user_ignore:[],
        gift_prefer:[123,126,127,128,129],//能力特长方面
        gift_ignore:[124],
        nature_prefer:[141,142],//性格倾向方面
        economy_option:false,//家庭经济
        prop5:true,//政策照顾加分
        prop6:true,//等级级差加分
        physical_ignore:[148,150,152,153] //体检
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
}]);
