/**
 * Created by qbl on 2015/9/22.
 */
'use strict';
require(['app'],function(app){
    app.constant("admintURL","/exam/school/admit")
    app.constant("submitURL","/exam/new")
    app.factory("ZYBinfoDATA",[function(){
            return {
                name:"",
                u_level:"",
                number:"",
                city:"",
                cityarea:"",
                scroe:"",
                devision:"",
                obl:"",
                sel:"",
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
                wish_ignore:[],//学习愿望方面
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
    app.factory("loadSelection",[function(){
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
    app.factory("loadingFilter",[function(){
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
    app.factory("loadClickEvent",['$rootScope',function($rootScope){
            return {
                clickEvent:function(target,state,then,id,ignore,prefer,name){
                    if(state == 2 ){
                        ignore.splice($.inArray(id,ignore),1);
                        $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                    }else if(state == 1){
                        prefer.splice($.inArray(id,prefer),1);
                        name.splice($.inArray(then,name),1);
                        $(target).attr('state',0).removeClass().addClass("btn btn-sm btn-default");
                    }else {
                        prefer.push(id);
                        name.push(then);
                        $(target).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                    }
                }
            }
        }])
    app.factory("loadDblclickEvent",['$rootScope',function($rootScope){
            return {
                dblclickEvent :function(target,state,then,id,ignore,prefer,name){

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
            }
        }])
    app.factory("loadClickAll",['$rootScope',function($rootScope){
            return {
                all:function(arr,prefer,attr,name,type){
                    if(type ==undefined){
                        for(var i = 0; i< arr.length;i++){
                            if(arr.eq(i).attr('state')!=1){
                                arr.eq(i).attr('state',1).removeClass().addClass("btn btn-sm btn-success");
                                prefer.push(arr.eq(i).attr(attr));
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
                                }else if (arr.eq(i).attr('prop') == "economy"){
                                    $scope.attr.economy = true;
                                }else if (arr.eq(i).attr('prop') == "prop5"){
                                    $scope.attr.prop5 = true;
                                }else if (arr.eq(i).attr('prop') == "prop6"){
                                    $scope.attr.prop6 = true;
                                }
                                name.push(arr.eq(i).html());
                            }
                        }
                    }

                }
            }

        }])
    app.factory("loadClickCancle",['$rootScope',function($rootScope){
            return {
                reject:function(arr,ignore,prefer,attr,name,type){
                    if(type ==undefined){

                        for(var i = 0; i< arr.length;i++){
                            arr.eq(i).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                            ignore.push(arr.eq(i).attr(attr));
                            prefer.splice($.inArray(arr.eq(i).attr(attr), prefer),1)
                            name.splice($.inArray(arr.eq(i).html(), name),1)
                        }

                    }else if(type == 1){

                        for(var i = 0; i< arr.length;i++){
                            arr.eq(i).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                            if(arr.eq(i).attr('prop') == "prop3"){
                                $scope.attr.prop3 = false;
                            }else if(arr.eq(i).attr('prop') == "prop4"){
                                $scope.attr.prop4 = false;
                            }else if(arr.eq(i).attr('prop') == "prop7"){
                                $scope.attr.prop7 = false;
                            }else if (arr.eq(i).attr('prop') == "prop8"){
                                $scope.attr.prop8 = false;
                            }else if (arr.eq(i).attr('prop') == "level1"){
                                $scope.attr.level1 = false;
                            }else if (arr.eq(i).attr('prop') == "level2"){
                                $scope.attr.level2 = false;
                            }
                            name.splice($.inArray(arr.eq(i).html(), name),1);
                        }

                    } else if (type == 2) {

                        for(var i = 0; i< arr.length;i++){
                            arr.eq(i).attr('state',2).removeClass().addClass("btn btn-sm btn-danger");
                            if (arr.eq(i).attr('economy') == "economy") {
                                $scope.personality.economy = false;
                            } else if (arr.eq(i).attr('economy') == "prop5") {
                                $scope.personality.prop5 = false;
                            } else if (arr.eq(i).attr('economy') == "prop6") {
                                $scope.personality.prop6 = false;
                            }
                            name.splice($.inArray(arr.eq(i).html(), name), 1);
                        }

                    }
                }
            }
        }])
    app.factory("loadCancleAll",function(){
            return {
                cancleAll:function(prefer,ignore,list,attr){
                    for (var i = 0; i < prefer; i++) {
                        for (var j = 0; j < list; j++) {
                            if(prefer[i] != list[i].id){
                                if($.inArray(list[i].id,ignore)<0){
                                    ignore.push(list[i].id);
                                }
                            }
                        }
                    }
                    $("button["+attr+"][state!=1]").attr('state',2).removeClass().addClass('btn btn-sm btn-danger');
                }
            }
        })
    app.controller("wishTabCtr-info", ['$scope','$window','$location','ZYBinfoDATA',function ($scope,$window,$location,ZYBinfoDATA) {

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
            ];

            $scope.table ={
                yxb:"",
                yxb_title:""
            };

            ZYBinfoDATA.types = $location.$$search.type == true ? 1 : $location.$$search.type;
            ZYBinfoDATA.u_level = $location.$$search.user_level == true ? 1 : $location.$$search.user_level;
            ZYBinfoDATA.obl = $location.$$search.obl == undefined ? "" : $scope.firstDoor[$location.$$search.obl];
            ZYBinfoDATA.sel = $location.$$search.sel == undefined ? "" : $scope.firstDoor[$location.$$search.sel];
            ZYBinfoDATA.scroe = $location.$$search.score == undefined ? "" : $location.$$search.score;

            $scope.table.yxb = yxb[ZYBinfoDATA.types];
            $scope.table.yxb_title = yxb_title[ZYBinfoDATA.u_level];
            $scope.info = ZYBinfoDATA;

            init();

            function init(){
                if(localStorage.getItem("score")!=null){
                    $.each(JSON.parse(localStorage.getItem("score")), function (idx, val) {
                        if (val.state == 1) {
                            $scope.score = val;
                            //TODO 请求一次推荐信息
                            $scope.recommShow = true;
                        }
                    });

                }
            }

            $scope.pay = function(){
                //    TODO 提交订单，
                $window.open('#/pay');
                //$window.location.href = "#/pay";
            }

            $scope.manual = function(){
                $window.location.href = "#/refer1";
                $(".modal-backdrop").remove();
                $(".modal-open").removeClass('modal-open');
            }

        }])

});
