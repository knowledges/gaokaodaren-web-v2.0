/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.hope",['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/hope', {
        templateUrl: "html/hope/hope.html",
        controller: "hopeCtr"
    })
}])
.directive('colleges',function(){
        return{
            restrict:'E',
            templateUrl:"templete/model-selected/selected.html",
            replace: true
        }
})
.controller("hopeCtr", ['$scope','$location',function ($scope,$location) {

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

        $scope.table.yxb = yxb[$.getParam("types",window.location.hash)];
        $scope.table.yxb_title = yxb_title[$.getParam("types",window.location.hash)];

        $scope.validate = {
            isPass:false,
            regShow:false,
            title:"",
            str :""
        }

        $scope.info = {
            name:"qiubaolin",
            number:"15321111111113",
            city:"11",
            cityarea:"11",
            obl:"5",
            sel:"5",
            scroe:"366",
            school:"南京大学",
            school_code:"1101",
            depart_code:"",
            depart:"",
            isChance:false,
            chance:""
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
///////////////////////////////////validate//////////////////////////////////////////////////////////////////////
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
