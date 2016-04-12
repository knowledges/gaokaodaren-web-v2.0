/**
 * Created by Administrator on 2015/12/2.
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
    app.controller('chanceCtr',['$scope','$http','$sce','$timeout','$window','getLoginUserInfo','loocha','arraysort',function($scope,$http,$sce,$timeout,$window,getLoginUserInfo,loocha,arraysort){
        $scope.score = "";
        $scope.isShow = false;
        $scope.isChance = localStorage.getItem("type");
        $scope.uScore = JSON.parse(sessionStorage.getItem('uScore'));
        $scope.order_id = "";
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

        $scope.changePay = function(){
            $scope.isShow = true;
        };

        $('.dropdown-toggle').dropdown();

        init ();
        function init(){
            getLoginUserInfo.isLogoin();

            if(localStorage.getItem('type')!= null){
                if(sessionStorage.getItem("admitFlag")!=null){
                    var flag = sessionStorage.getItem("admitFlag");
                    flag.splice(0,1);
                    flag.splice(flag.length-1,1);

                    for(var i = 0 ; i< flag.length ; i++){
                        for(var j = 0 ; j < $(".chance_").length ; j++){
                            if(flag[i] == $(".chance_").eq(j).val()){
                                $(".chance_").eq(j).attr("checked","true");
                            }
                        }
                    }
                }
            }else{
                $("#recommend").modal('show');
                //$rootScope.loading = false;
                return;
            }
        }

////////按概率范围预测高校录取概率/////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         *  根据范围ID 获取学校列表
         */
        $scope.selectRange = function(){
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null) {
                var param = {};
                param.out_trade_no = $scope.order_id != "" ? $scope.order_id:localStorage.getItem("order_id");
                param.type = $scope.isChance;
                param.obl = levelNum($scope.uScore.level_a);
                param.sel = levelNum($scope.uScore.level_b);
                param.score = $scope.uScore.score;
                param.admit_flag = $scope.forecast.range;

                $http({
                    url:loocha + "/exam/admit/school",
                    method:"GET",
                    params:param
                }).success(function (data) {
                    if(data.status == 2){
                        alert("请先选择缴费");
                        return;
                    }
                    $scope.forecast.rangeArr = data.response;
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
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null) {
                var param = {};
                    param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
                    //param.admit_flag = $scope.forecast.range;
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
                    url:loocha+'/exam/admit/result',
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
                    }
                    $scope.forecast.schChance_0 = data.response.admit;
                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };

        $scope.findChaname = function(){
            $scope.forecast.cSchool_name = $("#sch_name option:selected").text();
        }

        $scope.schChance_3 = function(){
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null) {
                var param = {};
                    param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                    url:loocha+'/exam/admit/result',
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
                    }
                    $scope.forecast.schChance_3 = data.response.admit;
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
            getLoginUserInfo.isLogoin();
            $scope.forecast.city_id ="";
            if($scope.forecast.area!=""){
                $http.get(loocha+'/wish/bytype?batch='+$scope.isChance+'&wish_id='+$scope.forecast.area).success(function(data){
                    $scope.forecast.cityArr = data.response;
                    $("#provinceBody").fadeIn(500);
                });
            }
        };
        /**
         * 获取高校列表
         */
        $scope.findSchoolList = function(){
            $http.get(loocha+'/schbath/depart?cityId=' + $scope.forecast.city_id + '&type=' + $scope.isChance)
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
            $scope.forecast.school_name = $("#school_name option:selected").text();
        };
        /**
         * 按院校属地预测高校录取概率
         */
        $scope.schChance =function(){
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null){
                var param = {};
                param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                    url:loocha+'/exam/admit/result',
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
                    }
                    $scope.forecast.schChance = data.response.admit;
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

            //$scope.forecast.pDepart_id = $scope.forecast.pSchool_id = "";
            $http.get(loocha+'/departlist/bypersonality?type='+$scope.isChance+'&personality_id='+$scope.forecast.personality_id)
                .success(function(data){
                    $scope.forecast.pDepart_Arr = data.response;
                });
        };

        /**
         * 根据专业id 获取高校列表
         */
        $scope.getDepartId = function(){
            $http.get(loocha+'/school/bypersonality?type='+$scope.isChance+'&personality_id='+$scope.forecast.personality_id+'&depart_name='+$("#departName option:selected").text())
                .success(function(data){
                    $scope.forecast.pSchool_Arr = data.response;
                });
            $scope.forecast.pDepart_name = $("#departName option:selected").text();
        };

        $scope.getSchlname = function(){
            $scope.forecast.pSchl_name = $("#pSchool_name option:selected").text();
        };

        /**
         * 获取概率
         */
        $scope.findPerChance = function(){
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null){
                var param = {};
                param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                    url:loocha+'/exam/admit/result',
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
                    }
                    $scope.forecast.schChance_6 = data.response.admit;
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
            var url = "";
            $("#propNav").show();
            $scope.forecast.attr_id = $scope.forecast.style_School_id="";;
            var style_id = $scope.forecast.style_id;
            if(style_id == 0){
                url=loocha+"/school/prop?type=0&depart_type="+$scope.isChance;
            }else if(style_id == 1){
                url=loocha+"/school/prop?type=1&depart_type=1";
            }else if(style_id == 2){
                url=loocha+"/school/prop?type=2&depart_type=2";
            }else if(style_id == 3){
                url=loocha+"/school/prop/1";
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
            $scope.forecast.style_School_name = $("#sSchool_name option:selected").text();
        };

        $scope.schChance_1 =function(){
            getLoginUserInfo.isLogoin();
            if($scope.uScore != null){
                var param = {};
                param.out_trade_no= $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                    url:loocha+'/exam/admit/result',
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
                    }
                    $scope.forecast.schChance_1 = data.response.admit;
                })
            }else{
                alert('请去我的足迹“设置”并“使用”成绩');
            }
        };

////////按具体院校预测可能录取高校专业录取概率/////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var _time = null;
        $scope.findDepart = function(e){
            $scope.forecast.schl_departId = "";
            if(e.keyCode == 229){
                $timeout.cancel(_time);
                _time = $timeout(function(e){
                    $http.get(loocha+"/departlist?type="+$scope.isChance+"&name="+$scope.forecast.schl_name+"&index=0&limit=999").success(function(data){
                        $scope.forecast.schl_departArr = data.response.list;
                    });
                },500);
            }
        };

        $scope.getDepartName = function(){
            $scope.forecast.schl_departName = $("#schl_departName option:selected").text();
            $scope.forecast.schl_article_id = $("#schl_departName option:selected").attr("article_id");
        };

        /**
         * 获取专业的概率
         */
        $scope.getdepartChance = function(){
            getLoginUserInfo.isLogoin();
            if($scope.forecast.schl_id==""){
                alert("请填写高校代号");
                return;
            }
            var param = {};
            param.out_trade_no = $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                url:loocha+'/exam/admit/result',
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
                    alert('订单号不存在！');
                    return;
                }
                $scope.forecast.departChance = data.response.admit;
            })
        };

////////按具体专业预测高校录取概率/////////////////////////////////////////////////////////////////////////////////////
        $scope.findSchl = function(e){
            $scope.forecast.d_schl_id = "";
            if(e.keyCode == 229){
                $timeout.cancel(_time);
                _time = $timeout(function(e){
                    $http.get(loocha+"/school/bydepart?type="+$scope.isChance+"&depart_name="+$scope.forecast.d_departname).success(function(data){
                        $scope.forecast.d_schlArr = data.response;
                    });
                },500);
            }
        };

        $scope.getDschlName=function(){
            $scope.forecast.d_schl_name = $("#d_schl_id option:selected").text();
        };

        $scope.getSchlChance = function(){
            getLoginUserInfo.isLogoin();
            var param = {};
                param.out_trade_no= $scope.order_id !="" ?  $scope.order_id : localStorage.getItem("order_id");
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
                url:loocha+'/exam/admit/result',
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
                    alert('订单号不存在！');
                    return;
                }
                $scope.forecast.schChance_2 = data.response.admit;
            })
        };

/////////其他操作//////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         *  缴费选择
         */
        $scope.startPay = function(){
            getLoginUserInfo.isLogoin();
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

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post(loocha+"/exam/admit/intention",param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data){
                $http.get(loocha+'/exam/' + data.response.id).success(function (result) {
                    localStorage.setItem("order_id",result.response.order_id);
                    $scope.order_id = result.response.order_id;
                    $scope.money = result.response.money;
                    $("#zyb_random").modal('show');
                });
            });

        };

        /**
         * 开始缴费
         */
        $scope.pay = function(){
            openwin('#/pay?order_id='+$scope.order_id+'&money='+$scope.money+'&type='+localStorage.getItem("type"));
            $('#zyb_random').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function(){
            $http.get(loocha+'/exam/order/info?out_trade_no='+$scope.order_id,function(data){
                if(data.status == "1004"){
                    alert('交易失败');
                }
                $("#tip").modal('hide');
            });
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
            $http.get(loocha+"/school/byname?type="+$scope.isChance+"&key="+key).success(function(data){
                $scope.schoolInfo = data.response.list[0];
                if($scope.schoolInfo.article_id>0){
                    $http.get(loocha+"/article/"+$scope.schoolInfo.article_id).success(function(data){
                        $scope.schoolInfo.article_content = $sce.trustAsHtml(data.response.content);
                        $("#mask-school").fadeIn(500);
                    });
                }
            });
        };

        /**
         * 获取专业详情
         * @param e
         */
        $scope.findDepartInfo = function(e){
            var that = $(e.target),article_id = that.attr("article_id");
            $http.get(loocha+"/depart/by?depart_id="+$scope.forecast.schl_departId).success(function(data){
                var article_id = data.response.article_id;
                if(article_id>0){
                    $http.get(loocha+"/article/show/"+article_id).success(function(data){
                        $scope.forecast.departInfo = $sce.trustAsHtml(data);
                        $("#mask-depart").fadeIn(800);
                        $("#mask-depart .modal-body").scrollTop(100);
                    });
                }
            });
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

        $scope.startChance = function(e){
            var that = $(e.target),score = that.attr('score'),type = that.attr('type');
            if(score<=JSON.parse(sessionStorage.getItem('uScore')).score){
                localStorage.setItem('type',type);
                window.location.reload(0);
            }else{
                alert('您的分数没有达到该批次最低投档标准，请换别的批次！');
            }
        }

    }]);
});