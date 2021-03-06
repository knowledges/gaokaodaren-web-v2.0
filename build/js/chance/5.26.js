/**
 * Created by Administrator on 2016/5/26.
 * 优化前
 */
require(['app'],function(app){
    app.factory("arraysort",function(){
        return {
            sort:function(array){
                return array.sort(function(a,b){
                    return a.order- b.order;
                });
            },
            sortById:function(array){
                return array.sort(function(a,b){
                    return a.id- b.id;
                });
            }
        }
    });
    app.controller('chanceCtr',['$scope','$http','$sce','$timeout','$window','$stateParams','getLoginUserInfo','loocha','arraysort','inLine',function($scope,$http,$sce,$timeout,$window,$stateParams,getLoginUserInfo,loocha,arraysort,inLine){
        $scope.score = "";
        $scope.isShow = false;
        $scope.isChance = $stateParams.batch;
        $scope.uScore = JSON.parse(sessionStorage.getItem('uScore'));
        $scope.order_id = $stateParams.out_trade_no;
        $scope.money = "";
        $scope.forecast = {
            area:"",
            city_id:"",
            cityArr:[],
            schoolArr:[],
            school_id:"",
            school_name:"",
            schChance:"",
            style_id:"",
            style_Arr:"",
            attr_id:"",
            style_SchoolArr:"",
            style_School_id:"",
            style_School_name:"",
            schChance_1:"",
            schl_id:"",
            schl_name:"",
            schl_departArr:"",
            schl_departId:"",
            schl_departName:"",
            schl_article_id:"",
            departChance:"",
            d_schl_id:"",
            d_schl_name:"",
            d_schlArr:"",
            schChance_2:"",
            personality_type1:"",
            personality_type2:"",
            personality_type3:"",
            personality_type4:"",
            personality_id:"",
            pDepart_Arr:[],
            pSchool_Arr:[],
            pDepart_id:"",
            pDepart_name:"",
            cSchool_id:"",
            cSchool_name:"",
            pSchl_id:"",
            pSchl_name:"",
            range:"",
            range_sch_id:"",
            range_sch_name:"",
            rangeArr:"",
            schChance_3:"",
        };
        $scope.modelInfo = {
            model_1:[],
            model_2:[],
            model_3:[],
            model_4:[],
            model_5:[],
            model_6:[],
        };

        $scope.userInfo = {
            uScore:"",
            subject:"",
            sub_a:"",
            sub_b:"",
            level_a:"",
            level_b:"",
            score:"",
        };

        $scope.changePay = function(){
            $scope.isShow = true;
        };

        $('.dropdown-toggle').dropdown();

        $scope.$on('$viewContentLoaded',function(){
            $timeout(function(){
                $("input").placeholder();
            },1000);
        });

        init ();

        function init(){
            var uScore = sessionStorage.getItem('uScore');
            if (uScore != "" && uScore!=null) {
                $scope.userInfo.uScore = JSON.parse(sessionStorage.getItem("uScore"));
                $scope.userInfo.subject =subStr($scope.isChance);
                $scope.userInfo.score = $scope.userInfo.uScore.score;
                $scope.userInfo.sub_a = $scope.userInfo.uScore.sub_a;
                $scope.userInfo.sub_b = $scope.userInfo.uScore.sub_b;
                $scope.userInfo.level_a = $scope.userInfo.uScore.level_a;
                $scope.userInfo.level_b = $scope.userInfo.uScore.level_b;
                $timeout(function(){
                    inLine.scores($scope.isChance, $scope.userInfo.score);
                },1000);
            }else{
                alert('请创建成绩！');
                window.location.href = "#/all/allScore";
            }

            if($scope.order_id!= ""){
                getOrderInfo();
            }else{
                $("#recommend").modal('show');
                return;
            }
            function subStr(str){

                switch(parseInt(str)){
                    case 1:
                        return "文科本一";
                        break;
                    case 3:
                        return "文科本二";
                        break;
                    case 5:
                        return "文科本三";
                        break;
                    case 7:
                        return "文科高职";
                        break;
                    case 2:
                        return "理科本一";
                        break;
                    case 4:
                        return "理科本二";
                        break;
                    case 6:
                        return "理科本三";
                        break;
                    case 8:
                        return "理科高职";
                        break;
                }
            }

        }

        /**
         * 请求已查询内容
         */
        function getOrderInfo(){
            $timeout(function(){
                $http.get(loocha+"/exam/order/info?out_trade_no="+ $scope.order_id+"&t="+( new Date() ).getTime().toString())
                    .success(function(data){
                        $scope.modelInfo = {
                            model_1:[],
                            model_2:[],
                            model_3:[],
                            model_4:[],
                            model_5:[],
                            model_6:[],
                        };
                        var item = data.response,flag = item.admitFlag.split(","),adminlist = item.admits;

                        flag.splice(0,1);
                        flag.splice(flag.length-1,1);

                        for(var i = 0 ; i< flag.length ; i++){
                            for(var j = 0 ; j < $(".chance_").length ; j++){
                                if(flag[i] == $(".chance_").eq(j).val()){
                                    $(".chance_").eq(j).attr("checked","true");
                                }
                            }
                        }

                        if(adminlist !="null" && adminlist !="undefined"){
                            if(adminlist.length>0){
                                $.each(adminlist,function(i,v){
                                    if(v.flag == 1){
                                        $scope.modelInfo.model_1.push(v);
                                    }else if (v.flag == "2"){
                                        $scope.modelInfo.model_2.push(v);
                                    }else if (v.flag == "3"){
                                        $scope.modelInfo.model_3.push(v);
                                    }else if (v.flag == "4"){
                                        $scope.modelInfo.model_4.push(v);
                                    }else if (v.flag == "5"){
                                        $scope.modelInfo.model_5.push(v);
                                    }else {
                                        $scope.modelInfo.model_6.push(v);
                                    }
                                })
                            }
                        }

                    });
            },500);

        }

        function getAdmits(param,type){

            $http({
                url:loocha + "/exam/admit/school?t="+ new Date().getTime().toString(),
                method:"GET",
                params:param
            }).success(function (data) {
                if(data.response.length<=0){
                    alert("没有搜索到内容！")
                }else if(data.status == 0) {
                    if(type == 1){
                        $scope.forecast.schChance_0 = data.response.admit;
                        getOrderInfo()
                    }else if (type == 2){
                        $scope.forecast.schChance = data.response.admit;
                        getOrderInfo()
                    }else if (type == 3){
                        $scope.forecast.schChance_1 = data.response.admit;
                        getOrderInfo()
                    }else if (type == 4){
                        $scope.forecast.departChance = data.response.admit;
                        getOrderInfo();
                    }else if (type == 5){
                        $scope.forecast.schChance_2 = data.response.admit;
                        getOrderInfo();
                    }else if (type == 6){
                        $scope.forecast.schChance_6 = data.response.admit;
                        getOrderInfo()
                    }else if(type>=7&&type<=13){
                        $scope.forecast.rangeArr = data.response;
                        $scope.forecast.cSchool_id = "";
                        $("#chanceBody").show();
                    }
                }else if(data.status == "1"){
                    alert("操作失败");
                }else if (data.status == "2"){
                    alert("请确认‘预测项目’选项，缴费预测");
                    if(type == 1){
                        $(".chance_[value=1]").attr("checked","true");
                    }else if (type == 2){
                        $(".chance_[value=2]").attr("checked","true");
                    }else if (type == 3){
                        $(".chance_[value=3]").attr("checked","true");
                    }else if (type == 4){
                        $(".chance_[value=4]").attr("checked","true");
                    }else if (type == 5){
                        $(".chance_[value=5]").attr("checked","true");
                    }else if (type == 6){
                        $(".chance_[value=6]").attr("checked","true");
                    }else if(type>=7&&type<=13){
                        $(".chance_[value=1]").attr("checked","true");
                    }
                    return;
                }else if (data.status == "4" || data.status == "-1") {
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                }else if (data.status == "11") {
                    alert('已查询！');
                    return;
                }else if(data.status == "1004") {
                    alert("订单已存在，请先支付继续查询");
                    if(type == 1){
                        $(".chance_[value=1]").attr("checked","true");
                    }else if (type == 2){
                        $(".chance_[value=2]").attr("checked","true");
                    }else if (type == 3){
                        $(".chance_[value=3]").attr("checked","true");
                    }else if (type == 4){
                        $(".chance_[value=4]").attr("checked","true");
                    }else if (type == 5){
                        $(".chance_[value=5]").attr("checked","true");
                    }else if (type == 6){
                        $(".chance_[value=6]").attr("checked","true");
                    }else if(type>=7&&type<=13){
                        $(".chance_[value=1]").attr("checked","true");
                    }
                    return;
                }else if(data.status == "1005") {
                    alert('分数线太低，请重现选择批次或者重新填写成绩！');
                    return;
                }else if (data.status == "1006"){
                    alert("该批次没找到该招生高校");
                }else if (data.status == "1007"){
                    alert("科目等级太低");
                }else if (data.status == "1008") {
                    alert("未找到该专业");
                }else if (data.status == "1009") {
                    alert("您是压线考生");
                }else if (data.status == "1010") {
                    alert("该高校为新招高校，计算概率没有意义");
                    return;
                }else if (data.status == "1012"){
                    alert("该高校仅招生一年，计算概率没有意义");
                    return;
                }else if (data.status == "1013"){
                    alert("该高校仅招生两年，计算概率没有意义");
                    return;
                }else if(data.status == "1015") {
                    alert("本次预测个数已使用完，请重新缴费继续查询");
                    if(type == 1){
                        $(".chance_[value=1]").attr("checked","true");
                    }else if (type == 2){
                        $(".chance_[value=2]").attr("checked","true");
                    }else if (type == 3){
                        $(".chance_[value=3]").attr("checked","true");
                    }else if (type == 4){
                        $(".chance_[value=4]").attr("checked","true");
                    }else if (type == 5){
                        $(".chance_[value=5]").attr("checked","true");
                    }else if (type == 6){
                        $(".chance_[value=6]").attr("checked","true");
                    }else if(type>=7&&type<=13){
                        $(".chance_[value=1]").attr("checked","true");
                    }
                    return;
                }else{
                    alert("未知错误");
                }
            });
        }

////////按概率范围预测高校录取概率/////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         *  根据范围ID 获取学校列表
         */
        $scope.selectRange = function(){

            if($scope.uScore != null) {
                var param = {};
                param.out_trade_no = $scope.order_id != "" ? $scope.order_id:sessionStorage.getItem("order_id");
                param.type = $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.admit_flag = $scope.forecast.range;

                $http({
                    url:loocha + "/exam/admit/school?t="+ new Date().getTime().toString(),
                    method:"GET",
                    params:param
                }).success(function (data) {
                    if (data.status == "2"){
                        alert("请确认‘预测项目’选项，缴费预测");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if (data.status == 4 || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                        return;
                    }
                    if(data.response.length<=0){
                        alert("没有搜索到内容！")
                    }
                    $scope.forecast.rangeArr = data.response;
                    $scope.forecast.cSchool_id = "";
                    $("#chanceBody").show();
                });
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };


        $scope.findSchname = function(){
            $scope.forecast.range_sch_name = $("#range_sch_name option:selected").text();
        };

        $scope.schChance_0 = function(){

            if($scope.uScore != null) {
                var param = {};
                param.out_trade_no = $scope.order_id;
                param.admit_flag = 1;
                param.type= $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.school_code = $scope.forecast.cSchool_id;
                param.school = $scope.forecast.cSchool_name;
                param.depart_code ="";
                param.depart = "";
                $http({
                    url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                    method: 'GET',
                    params:param,
                }).success(function(data){
                    if(data.status == "1005"){
                        alert('分数线太低，请重现选择批次或者重新填写成绩！');
                        return;
                    }else if (data.status == "11"){
                        alert('已查询！');
                        return;
                    }else if (data.status == "2"){
                        alert("请确认‘预测项目’选项，缴费预测");
                        $(".chance_[value=1]").attr("checked","true");
                        return;
                    }else if(data.status == "1015"){
                        alert("本次预测个数已使用完，请重新缴费继续查询");
                        $(".chance_[value=1]").attr("checked","true");
                        return;
                    }else if (data.status == "1013"){
                        alert("该高校仅招生两年，计算概率没有意义");
                        return;
                    }else if (data.status == "1012"){
                        alert("该高校仅招生一年，计算概率没有意义");
                        return;
                    }else if (data.status == "1010"){
                        alert("该高校为新招高校，计算概率没有意义");
                        return;
                    }else if(data.status == "1004"){
                        alert("订单已存在，请先支付继续查询");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if(data.status == 0){
                        $scope.forecast.schChance_0 = data.response.admit;
                        getOrderInfo()
                    }else if (data.status == "1009"){
                        alert("您是压线考生");
                    }else if (data.status == "4" || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }else if (data.status == "1006"){
                        alert("该批次没找到该招生高校");
                    }else if (data.status == "1007"){
                        alert("科目等级太低");
                    }else if (data.status == "1008"){
                        alert("未找到该专业");
                    }else if (data.status == "1006"){
                        alert("压线分数");
                    }else if (data.status == "1"){
                        alert("操作失败");
                    }else{
                        alert("未知错误");
                    }

                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };

        $scope.findChaname = function(){
            $scope.forecast.cSchool_name = $("#sch_name option:selected").text().trim();
            $scope.forecast.schChance_0 = "";
        }

        /**
         * 没有被执行
         */
        $scope.schChance_3 = function(){

            if($scope.uScore != null) {
                var param = {};
                param.out_trade_no = $scope.order_id;
                //param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
                param.admit_flag = $scope.forecast.range;
                param.type= $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.school_code = $scope.forecast.range_sch_id;
                param.school = $scope.forecast.range_sch_name;
                param.depart_code ="";
                param.depart = "";
                $http({
                    url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                    method: 'GET',
                    params:param,
                }).success(function(data){
                    if(data.status == "1005"){
                        alert('分数线太低，请重现选择批次或者重新填写成绩！');
                        return;
                    }else if (data.status == "11"){
                        alert('已查询！');
                        return;
                    }else if (data.status == "2"){
                        alert('订单号不存在！');
                        return;
                    }else if (data.status == "4" || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }else{
                        alert("未知错误");
                    }
                    $scope.forecast.schChance_3 = data.response.admit;
                    getOrderInfo()
                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };
////////按院校属地预测高校录取概率///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * 查询城市列表
         */
        $scope.findCity = function(){

            $scope.forecast.city_id ="";
            if($scope.forecast.area!=""){
                $http.get(loocha+'/wish/bytype?batch='+$scope.isChance+'&wish_id='+$scope.forecast.area+"&t="+( new Date() ).getTime().toString()).success(function(data){
                    $scope.forecast.cityArr = data.response;
                    $("#provinceBody").fadeIn(500);
                });
            }
        };
        /**
         * 获取高校列表
         */
        $scope.findSchoolList = function(){
            $http.get(loocha+'/schbath/depart?cityId=' + $scope.forecast.city_id + '&type=' + $scope.isChance+"&t="+( new Date() ).getTime().toString())
                .success(function(data){
                    $scope.forecast.schoolArr = data.response;
                    $scope.forecast.school_id ="";
                    $scope.forecast.school_name="";
                });
        };
        /**
         * 获取高校名称
         */
        $scope.findSchoolInfo = function(){
            $scope.forecast.school_name = $("#school_name option:selected").text().trim();
            $scope.forecast.school_id = $("#school_name option:selected").val();
            $scope.forecast.schChance = "";
        };
        /**
         * 按院校属地预测高校录取概率
         */
        $scope.schChance =function(){

            if($scope.uScore != null){
                var param = {};
                param.out_trade_no = $scope.order_id;
                //param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
                param.admit_flag = 2;
                param.type= $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.school_code = $scope.forecast.school_id;
                param.school = $scope.forecast.school_name;
                param.depart_code ="";
                param.depart = "";
                $http({
                    url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                    method: 'GET',
                    params:param,
                }).success(function(data){
                    if(data.status == "1005"){
                        alert('分数线太低，请重现选择批次或者重新填写成绩！');
                        return;
                    }else if (data.status == "11"){
                        alert('已查询！');
                        return;
                    }else if (data.status == "2"){
                        alert("请确认‘预测项目’选项，缴费预测");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if(data.status == "1015"){
                        alert("本次预测个数已使用完，请重新缴费继续查询");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if (data.status == "1013"){
                        alert("该高校仅招生两年，计算概率没有意义");
                        return;
                    }else if (data.status == "1012"){
                        alert("该高校仅招生一年，计算概率没有意义");
                        return;
                    }else if (data.status == "1010"){
                        alert("该高校为新招高校，计算概率没有意义");
                        return;
                    }else if(data.status == "1004"){
                        alert("订单已存在，请先支付继续查询");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if(data.status == 0){
                        $scope.forecast.schChance = data.response.admit;
                        getOrderInfo()
                    }else if (data.status == "1009"){
                        alert("您是压线考生");
                    }else if (data.status == "4" || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }else if (data.status == "1006"){
                        alert("该批次没找到该招生高校");
                    }else if (data.status == "1007"){
                        alert("科目等级太低");
                    }else if (data.status == "1008"){
                        alert("未找到该专业");
                    }else if (data.status == "1006"){
                        alert("压线分数");
                    }else if (data.status == "1"){
                        alert("操作失败");
                    }else{
                        alert("未知错误");
                    }
                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };
////////按个性满足预测高校专业录取概率///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * 获取个性标签列表
         */
        $http.get(loocha+"/depart/personality")
            .success(function(data){
                $scope.forecast.personality_type2 =  data.response.pmap.type2;
                $scope.forecast.personality_type3 =  data.response.pmap.type3;
                $scope.forecast.personality_type4 =  data.response.pmap.type4;

                $scope.forecast.personality_type2 = arraysort.sort($scope.forecast.personality_type2);
                $scope.forecast.personality_type3 = arraysort.sort($scope.forecast.personality_type3);
                $scope.forecast.personality_type4 = arraysort.sort($scope.forecast.personality_type4);
            });

        /**
         * 根据个性标签id 获取专业列表
         */
        $scope.getpersonalityId = function(){
            $scope.forecast.pDepart_id = "",$scope.forecast.pSchl_id = "";
            //$scope.forecast.pDepart_id = $scope.forecast.pSchool_id = "";
            $http.get(loocha+'/departlist/bypersonality?type='+$scope.isChance+'&personality_id='+$scope.forecast.personality_id+"&t="+( new Date() ).getTime().toString())
                .success(function(data){
                    if(data.response.length<=0){
                        alert("没有搜索到内容！");
                    }
                    $scope.forecast.pDepart_Arr = data.response;
                    $scope.forecast.schChance_6 = "";
                });
        };

        /**
         * 根据专业id 获取高校列表
         */
        $scope.getDepartId = function(){
            var depart_name = $("#departName option:selected").text().trim();
            $http.get(loocha+'/school/bypersonality?type='+$scope.isChance+'&personality_id='+$scope.forecast.personality_id+'&depart_name='+encodeURI(depart_name)+"&t="+( new Date() ).getTime().toString())
                .success(function(data){
                    $scope.forecast.pSchool_Arr = data.response;
                    $scope.forecast.schChance_6 = "";
                    $scope.forecast.pSchl_id="";
                    $scope.forecast.pSchl_name ="";
                });
            $scope.forecast.pDepart_name = $("#departName option:selected").text().trim();
            $scope.forecast.pArticle_id = $("#departName option:selected").attr("article_id");
        };

        $scope.getSchlname = function(){
            $scope.forecast.pSchl_name = $("#pSchool_name option:selected").text().trim();
            $scope.forecast.schChance_6 = "";
        };

        /**
         * 获取概率
         */
        $scope.findPerChance = function(){

            if($scope.uScore != null){
                var param = {};
                param.out_trade_no = $scope.order_id;
                //param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
                param.admit_flag = 6;
                param.type= $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.school_code = $scope.forecast.pSchl_id;
                param.school = $scope.forecast.pSchl_name;
                //param.school_code = $("#pSchool_name option:selected").val();
                //param.school = $("#pSchool_name option:selected").text();
                param.depart_code = $scope.forecast.pDepart_id;
                param.depart = $scope.forecast.pDepart_name;
                $http({
                    url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                    method: 'GET',
                    params:param,
                }).success(function(data){
                    if(data.status == "1005"){
                        alert('分数线太低，请重现选择批次或者重新填写成绩！');
                        return;
                    }else if (data.status == "11"){
                        alert('已查询！');
                        return;
                    }else if (data.status == "2"){
                        alert("请确认‘预测项目’选项，缴费预测");
                        $(".chance_[value=6]").attr("checked","true");
                        return;
                    }else if(data.status == "1015"){
                        alert("本次预测个数已使用完，请重新缴费继续查询");
                        $(".chance_[value=6]").attr("checked","true");
                        return;
                    }else if (data.status == "1013"){
                        alert("该高校仅招生两年，计算概率没有意义");
                        return;
                    }else if (data.status == "1012"){
                        alert("该高校仅招生一年，计算概率没有意义");
                        return;
                    }else if (data.status == "1010"){
                        alert("该专业为新招专业，计算概率没有意义");
                        return;
                    }else if(data.status == "1004"){
                        alert("订单已存在，请先支付继续查询");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if(data.status == 0){
                        $scope.forecast.schChance_6 = data.response.admit;
                        getOrderInfo()
                    }else if (data.status == "1009"){
                        alert("您是压线考生");
                    }else if (data.status == "4" || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }else if (data.status == "1006"){
                        alert("该批次没找到该招生高校");
                    }else if (data.status == "1007"){
                        alert("科目等级太低");
                    }else if (data.status == "1008"){
                        alert("未找到该专业");
                    }else if (data.status == "1005"){
                        alert("压线分数");
                    }else if (data.status == "1"){
                        alert("操作失败");
                    }else{
                        alert("未知错误");
                    }

                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };

/////////按院校属类预测高校录取概率///////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * 根据 院校属类 id  获取属类列表
         */
        $scope.findStyleId = function(){
            $scope.forecast.attr_id = "";
            var url = "";
            $("#propNav").show();
            $scope.forecast.attr_id = $scope.forecast.style_School_id="";;
            var style_id = $scope.forecast.style_id;
            if(style_id == 0){
                url=loocha+"/school/attr?type=" + $scope.isChance+"&t="+( new Date() ).getTime().toString();
            }else if(style_id == 1){
                url=loocha+"/school/prop?type=1&depart_type=1&t="+( new Date() ).getTime().toString();
            }else if(style_id == 2){
                url=loocha+"/school/prop?type=2&depart_type=2&t="+( new Date() ).getTime().toString();
            }else if(style_id == 3){
                url=loocha+"/school/prop?type=0&depart_type="+$scope.isChance+"&t="+( new Date() ).getTime().toString();
            }
            if(style_id !=""){
                $http.get(url).success(function(data){
                    $scope.forecast.style_Arr = data.response;
                });
            }

        };

        /**
         *根据属性的ID 获取高校列表
         */
        $scope.findAttrId = function(){
            var style_id = 0,level_id = 0,attr_id = 0,belongs_id=0;
            $scope.forecast.style_School_id="";
            var condition = $scope.forecast.attr_id;
            if (condition >= 1 && condition <= 12){
                style_id = $scope.forecast.attr_id;
            }else if (condition >= 17 && condition <= 18){
                attr_id = $scope.forecast.attr_id;
            }else if (condition == 14 || condition == 15 || condition == 16 || condition == 32 ){
                belongs_id = $scope.forecast.attr_id;
            }else if (condition == 20){
                level_id = 1;
            }else if (condition == 21){
                level_id = 2;
            }else if (condition == 22){
                level_id = 5;
            }else if (condition == 23){
                level_id = 6;
            }else if (condition == 24){
                level_id = 4;
            }else if ($scope.forecast.attr_id == null || $scope.forecast.attr_id == "" || $scope.forecast.attr_id == undefined){
                return ;
            }

            var param = {};
            param.type = localStorage.getItem("type");
            param.attr = attr_id;
            param.belongs = belongs_id;
            param.level = level_id;
            param.style = style_id;
            param.limit = 9999;

            $http({
                url:loocha+'/school',
                method:"GET",
                params:param
            }).success(function(data){
                $scope.forecast.style_SchoolArr = data.response.list
            });

        };

        $scope.getSchName = function(){
            $scope.forecast.style_School_article = $("#sSchool_name option:selected").attr("article_id");
            $scope.forecast.style_School_name = $("#sSchool_name option:selected").text().trim();
            $scope.forecast.schChance_1 = "";
        };

        $scope.schChance_1 =function(){

            if($scope.uScore != null){
                var param = {};
                param.out_trade_no= $scope.order_id;
                //param.out_trade_no= $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
                param.admit_flag = 3;
                param.type= $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.school_code = $scope.forecast.style_School_id;
                param.school = $scope.forecast.style_School_name;
                param.depart_code ="";
                param.depart = "";
                $http({
                    url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                    method: 'GET',
                    params:param,
                }).success(function(data){
                    if(data.status == "1005"){
                        alert('分数线太低，请重现选择批次或者重新填写成绩！');
                        return;
                    }else if (data.status == "11"){
                        alert('已查询！');
                        return;
                    }else if (data.status == "2"){
                        alert("请确认‘预测项目’选项，缴费预测");
                        $(".chance_[value=3]").attr("checked","true");
                        return;
                    }else if(data.status == "1015"){
                        alert("本次预测个数已使用完，请重新缴费继续查询");
                        $(".chance_[value=3]").attr("checked","true");
                        return;
                    }else if (data.status == "1013"){
                        alert("该高校仅招生两年，计算概率没有意义");
                        return;
                    }else if (data.status == "1012"){
                        alert("该高校仅招生一年，计算概率没有意义");
                        return;
                    }else if (data.status == "1010"){
                        alert("该高校为新招高校，计算概率没有意义");
                        return;
                    }else if(data.status == "1004"){
                        alert("订单已存在，请先支付继续查询");
                        $(".chance_[value=2]").attr("checked","true");
                        return;
                    }else if(data.status == 0){
                        $scope.forecast.schChance_1 = data.response.admit;
                        getOrderInfo()
                    }else if (data.status == "1009"){
                        alert("您是压线考生");
                    }else if (data.status == "4" || data.status == "-1"){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }else if (data.status == "1006"){
                        alert("该批次没找到该招生高校");
                    }else if (data.status == "1007"){
                        alert("科目等级太低");
                    }else if (data.status == "1008"){
                        alert("未找到该专业");
                    }else if (data.status == "1006"){
                        alert("压线分数");
                    }else if (data.status == "1"){
                        alert("操作失败");
                    }else{
                        alert("未知错误");
                    }
                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };

////////按具体院校预测可能录取高校专业录取概率/////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.getDepartName = function(){
            $scope.forecast.schl_departName = $("#schl_departName option:selected").text().trim();
            $scope.forecast.schl_article_id = $("#schl_departName option:selected").attr("article_id");
            $scope.forecast.departChance = "";
        };

        /**
         * 获取专业的概率
         */
        $scope.getdepartChance = function(){

            if($scope.forecast.schl_id==""){
                alert("请填写高校代号");
                return;
            }
            var param = {};
            param.out_trade_no = $scope.order_id;
            //param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
            param.admit_flag = 4;
            param.type= $scope.isChance;
            param.obl = levelNum($scope.uScore.level_a);
            param.sel = levelNum($scope.uScore.level_b);
            param.score = $scope.uScore.score;
            param.school_code = $scope.forecast.schl_id;
            param.school = $scope.forecast.schl_name;
            param.depart_code = $scope.forecast.schl_departId;
            param.depart = $scope.forecast.schl_departName;
            $http({
                url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                method: 'GET',
                params:param,
            }).success(function(data){
                if(data.status == "1005"){
                    alert('分数线太低，请重现选择批次或者重新填写成绩！');
                    return;
                }else if (data.status == "11"){
                    alert('已查询！');
                    return;
                }else if (data.status == "6"){
                    alert('输入参数有错！');
                    return;
                }else if (data.status == "2"){
                    alert("请确认‘预测项目’选项，缴费预测");
                    $(".chance_[value=4]").attr("checked","true");
                    return;
                }else if(data.status == "1015"){
                    alert("本次预测个数已使用完，请重新缴费继续查询");
                    $(".chance_[value=4]").attr("checked","true");
                    return;
                }else if (data.status == "1013"){
                    alert("该高校仅招生两年，计算概率没有意义");
                    return;
                }else if (data.status == "1012"){
                    alert("该高校仅招生一年，计算概率没有意义");
                    return;
                }else if (data.status == "1010"){
                    alert("该专业为新招专业，计算概率没有意义");
                    return;
                }else if(data.status == "1004"){
                    alert("订单已存在，请先支付继续查询");
                    $(".chance_[value=2]").attr("checked","true");
                    return;
                }else if(data.status == 0){
                    $scope.forecast.departChance = data.response.admit;
                    getOrderInfo();
                }else if (data.status == "1009"){
                    alert("您是压线考生");
                }else if (data.status == "4" || data.status == "-1"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                }else if (data.status == "1006"){
                    alert("该批次没找到该招生高校");
                }else if (data.status == "1007"){
                    alert("科目等级太低");
                }else if (data.status == "1008"){
                    alert("未找到该专业");
                }else if (data.status == "1006"){
                    alert("压线分数");
                }else if (data.status == "1"){
                    alert("操作失败");
                }else{
                    alert("未知错误");
                }
            })
        };

////////按具体专业预测高校录取概率/////////////////////////////////////////////////////////////////////////////////////

        $scope.getDschlName=function(){
            $scope.forecast.d_schl_name = $("#d_schl_id option:selected").text().trim();
            $scope.forecast.d_schl_id = $("#d_schl_id option:selected").val();
            $scope.forecast.schChance_2 = "";
        };

        $scope.getSchlChance = function(){

            var param = {};
            param.out_trade_no= $scope.order_id;
            //param.out_trade_no= $scope.order_id !="" ?  $scope.order_id : sessionStorage.getItem("order_id");
            param.admit_flag = 5;
            param.type= $scope.isChance;
            param.obl = levelNum($scope.uScore.level_a);
            param.sel = levelNum($scope.uScore.level_b);
            param.score = $scope.uScore.score;
            param.school_code = $scope.forecast.d_schl_id;
            param.school = $scope.forecast.d_schl_name;
            param.depart_code = $scope.forecast.d_departId;
            param.depart = $scope.forecast.d_departname;
            $http({
                url:loocha+'/exam/admit/result?t='+ new Date().getTime().toString(),
                method: 'GET',
                params:param,
            }).success(function(data){
                if(data.status == "1005"){
                    alert('分数线太低，请重现选择批次或者重新填写成绩！');
                    return;
                }else if (data.status == "11"){
                    alert('已查询！');
                    return;
                }else if (data.status == "6"){
                    alert('输入参数有错！');
                    return;
                }else if (data.status == "2"){
                    alert("请确认‘预测项目’选项，缴费预测");
                    $(".chance_[value=5]").attr("checked","true");
                    return;
                }else if(data.status == "1015"){
                    alert("本次预测个数已使用完，请重新缴费继续查询");
                    $(".chance_[value=5]").attr("checked","true");
                    return;
                }else if (data.status == "1013"){
                    alert("该高校仅招生两年，计算概率没有意义");
                    return;
                }else if (data.status == "1012"){
                    alert("该高校仅招生一年，计算概率没有意义");
                    return;
                }else if (data.status == "1010"){
                    alert("该专业为新招专业，计算概率没有意义");
                    return;
                }else if(data.status == "1004"){
                    alert("订单已存在，请先支付继续查询");
                    $(".chance_[value=2]").attr("checked","true");
                    return;
                }else if(data.status == 0){
                    $scope.forecast.schChance_2 = data.response.admit;
                    getOrderInfo();
                }else if (data.status == "1009"){
                    alert("您是压线考生");
                }else if (data.status == "4" || data.status == "-1"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                }else if (data.status == "1006"){
                    alert("该批次没找到该招生高校");
                }else if (data.status == "1007"){
                    alert("科目等级太低");
                }else if (data.status == "1008"){
                    alert("未找到该专业");
                }else if (data.status == "1006"){
                    alert("压线分数");
                }else if (data.status == "1"){
                    alert("操作失败");
                }else{
                    alert("未知错误");
                }
            })
        };

/////////其他操作//////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         *  缴费选择
         */
        $scope.startPay = function(num){

            var checklist = $(".chance_[type='checkbox']:checked");
            var array = "";

            for(var i = 0;i<checklist.length;i++){
                if(checklist[i] != checklist[checklist.length-1]){
                    array = array + checklist[i].value+",";
                }else{
                    array = array + checklist[i].value;
                }
            }

            var param = {};
            param.type= $scope.isChance;
            param.obl = levelNum($scope.uScore.level_a);
            param.sel = levelNum($scope.uScore.level_b);
            param.score = $scope.uScore.score;
            param.flags = array;
            param.confirm = num;
            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+"/exam/admit/intention",param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data){
                if (data.status == 4 || data.status == "-1"){
                    alert('您还没有登陆，先去登陆吧！');
                    window.location.href = "#/login";
                    return;
                }else if(data.status == 6){
                    alert("先勾选选测条件");
                }else if (data.status == 0){
                    $http.get(loocha+'/exam/' + data.response.id).success(function (data) {
                        sessionStorage.setItem("order_id",data.response.order_id);
                        $scope.order_id = data.response.order_id;
                        $scope.money = data.response.money;
                        $("#zyb_random").modal('show');
                    });
                }else if(data.status == "1005" || data.status == "1009"){
                    show_confirm(param);
                }

            });

            function show_confirm(){
                var result = confirm("您是压线考生，是否咨询缴费");
                if(result){
                    $scope.startPay(1);
                }
            }

        };

        /**
         * 开始缴费
         */
        $scope.pay = function(){
            openwin('#/pay?order_id='+$scope.order_id+'&money='+$scope.money+'&type='+$scope.isChance);
            $('#zyb_random').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function () {
            $http.get(loocha + '/exam/order/info?out_trade_no=' + $scope.order_id)
                .success(function (data) {
                    if (data.status == "1004") {
                        alert('交易失败');
                    }
                    $("#tip").modal('hide');
                });
        };

        $scope.gobike = function(name){
            var item = name.split("(")[0].split("★")[0];
            openwin("http://baike.baidu.com/item/"+item);
        };

        function openwin(url) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", "openwin");
            document.body.appendChild(a);
            a.click();
        }


        $(".close").unbind('click').click(function(e){
            $("#mask-school,#mask-depart").fadeOut(800);
        });

        /**
         * 概率--点击高校名称查询高校信息
         * TODO 没法确认文科还是理科 【等级、计划数、录取没法确认】
         * @param e
         */
        $scope.showChanceSchInfo = function(e){
            var that = $(e.target),key = that.html();
            $http.get(loocha+"/school/byname?type="+$scope.isChance+"&code="+that.attr("article_id")+"&key="+encodeURI(key)+"&t="+( new Date() ).getTime().toString()).success(function(data){
                if(data.response.list.length<=0){
                    alert("该批次未找到该校信息");
                }else{
                    $scope.schoolInfo = data.response.list[0];
                    if($scope.schoolInfo.article_id>0){
                        $http.get(loocha+"/article/"+$scope.schoolInfo.article_id).success(function(data){
                            $scope.schoolInfo.article_content = $sce.trustAsHtml(data.response.content);
                            $("#mask-school").fadeIn(500);
                        });
                    }else{
                        alert("没有找到相关文章");
                    }
                }

            });
        };

        /**
         * 获取专业详情
         * @param e
         */
        $scope.findDepartInfo = function(e){
            var that = $(e.target),article_id = that.attr("article_id");
            if(article_id>0){
                $http.get(loocha+"/article/show/"+article_id).success(function(data){
                    $scope.forecast.departInfo = $sce.trustAsHtml(data);
                    $("#mask-depart").fadeIn(800);
                    $("#mask-depart .modal-body").scrollTop(100);
                });
            }else{
                alert("暂无关联文章");
            }
        };

        function levelNum(str){
            var num = 0;
            switch(str){
                case 'A+':
                    num = 5;
                    break;
                case 'A':
                    num = 4;
                    break;
                case 'B+':
                    num = 3;
                    break;
                case 'B':
                    num = 2;
                    break;
                case 'C':
                    num = 1;
                    break;
                case 'D':
                    num = 0;
                    break;
            }
            return num;
        }

        var _times = null;

        $scope.findDepart = function(){
            $timeout.cancel(_times);
            _times  = $timeout(function(){
                $scope.forecast.schl_departId = "";
                $http.get(loocha + "/departlist?type=" + $scope.isChance + "&code=" + $scope.forecast.schl_id + "&name=" + encodeURI($scope.forecast.schl_name) + "&index=0&limit=999&t="+( new Date() ).getTime().toString()).success(function (data) {
                    $scope.forecast.schl_departArr = data.response.list;
                });
            },500);
        };

        $scope.findSchl = function(){
            $timeout.cancel(_times);
            _times= $timeout(function(){
                $scope.forecast.d_schl_id = "";
                $http.get(loocha+"/school/bydepart?type="+$scope.isChance+"&depart_name="+encodeURI($scope.forecast.d_departname)+"&t="+( new Date() ).getTime().toString()).success(function(data){
                    $scope.forecast.d_schlArr = data.response;
                });
            },500)
        };
    }]);
});
