/**
 * Created by qbl on 2016/2/1.
 */
require(['app'],function(app){
    app.factory("classifyClk",function(){
        return {
            /**
             *
             * @param status 当前按钮的状态 1.同意 2.拒绝 0/null.无
             * @param that 当前对象
             * @param list 当前对象子类的集合
             * @param prefer 同意的数组
             * @param ignore 拒绝的数组
             * @param id 当前对象下标
             * @param name 同意的文字内容
             * @param arr 存储Obj的数组
             * @param obj 当前对象
             * @returns {string} 同意的数组、拒绝的数组、同意的文字内容、存储Obj的数组
             */
            agreenClsEvent:function(status,that,list,prefer,ignore,id,name,arr,obj){
                if(status== undefined||status == null||status == 0){
                    status = that.attr("status","1").addClass('agree');
                    $.each(list,function(i,v){
                        var idx = $(v).attr(id);
                        $(v).attr("status","1").removeClass('cancle reject').addClass('agree');
                        if(ignore.indexOf(idx)>=0){
                            ignore.splice(ignore.indexOf(idx),1);
                        }
                        if(prefer.indexOf(idx)<0){
                            if(arr!=null){
                                obj = new Object();
                                obj.id = idx;
                                obj.name=$(v).html();
                                arr.push(obj);
                            }
                            prefer.push(idx);
                            name.push($(v).html());
                        }
                    });
                }else if(status == 1){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    $.each(list,function(i,v){
                        var idx = $(v).attr(id);
                        $(v).attr("status",0).removeClass('agree reject').addClass('cancle');
                        if(arr!=null){
                            arr.splice(prefer.indexOf(idx),1);
                        }
                        name.splice(prefer.indexOf(idx),1);
                        prefer.splice(prefer.indexOf(idx),1);

                    });
                }else if(status == 2){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    $.each(list,function(i,v){
                        var idx = $(v).attr(id);
                        ignore.splice(ignore.indexOf(idx),1);
                        $(v).attr("status",0).removeClass('agree reject').addClass('cancle');
                    });
                }
                return prefer+"-"+ignore+"-"+name+"-"+JSON.stringify(arr);
            },
            agreenCityEvent:function(status,that,prefer,ignore,id,name,value,arr,obj){
                if(status == undefined || status == null || status == 0){
                    status = that.attr("status","1").removeClass('cancle reject').addClass('agree');
                    if(prefer.indexOf(id)<0){
                        if(arr!=null){
                            obj = new Object();
                            obj.id = id;
                            obj.name = value;
                            arr.push(obj);
                        }
                        prefer.push(id);
                        name.push(value);
                    }
                }else if(status == 1){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    if(prefer.indexOf(id)>=0){
                        if(arr!=null){
                            arr.splice(prefer.indexOf(id),1);
                        }
                        name.splice(prefer.indexOf(id),1);
                        prefer.splice(prefer.indexOf(id),1);
                    }
                }else if(status == 2){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    if(ignore.indexOf(id)>=0){
                        ignore.splice(ignore.indexOf(id),1);
                    }
                }
                return prefer+"-"+ignore+"-"+name+"-"+JSON.stringify(arr);
            }
        }
    })
    app.factory("classifyDBClk",function(){
        return {
            rejectClsEvent:function(status,that,list,prefer,ignore,id,name,arr){
                if(status== undefined||status == null||status == 0||status ==1){
                    status = that.attr("status","2").removeClass('agree cancle').addClass('reject');
                    $.each(list,function(i,v){
                        var idx = $(v).attr(id);
                        $(v).attr("status","2").removeClass('agree cancle').addClass('reject');
                        if(prefer.indexOf(idx)>=0){
                            arr.splice(prefer.indexOf(idx),1);
                            name.splice(prefer.indexOf(idx),1);
                            prefer.splice(prefer.indexOf(idx),1);
                        }
                        if(ignore.indexOf(idx)<0){
                            ignore.push(idx);
                        }
                    });
                }else{
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    if(arr!=null){
                        arr=[];
                    }
                    prefer=[],ignore=[];
                    $.each(list,function(i,v){
                        $(v).attr("status",0).removeClass('agree reject').addClass('cancle');
                    });
                }
                return prefer+"-"+ignore+"-"+name+"-"+JSON.stringify(arr);
            },
            rejectCityEvent:function(status,that,prefer,ignore,id,name,value,arr){
                if(status == undefined || status == null || status == 0){
                    status = that.attr("status","2").addClass('reject');
                    if(ignore.indexOf(id)<0){
                        ignore.push(id);
                    }
                }else if(status == 1){
                    status = that.attr("status","2").removeClass('agree cancle').addClass('reject');
                    if(prefer.indexOf(id)>=0){
                        if (arr!=null){
                            arr.splice(prefer.indexOf(id),1);
                        }
                        name.splice(prefer.indexOf(id),1);
                        prefer.splice(prefer.indexOf(id),1);
                    }
                    if(ignore.indexOf(id)<0){
                        ignore.push(id);
                    }
                }else if(status == 2){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    if(ignore.indexOf(id)>=0){
                        ignore.splice(ignore.indexOf(id),1);
                    }
                }
                return prefer+"-"+ignore+"-"+name+"-"+JSON.stringify(arr);
            }
        }
    })
    app.controller('hopeCtr',['$scope','$window','$http','$timeout','classifyClk','classifyDBClk',function($scope,$window,$http,$timeout,classifyClk,classifyDBClk){
        $scope.hope = {
            area:"",
            js_province:"",
            firstCities:"",
            secondCities:"",
            thirdCities:"",
            fourthCities:"",
            fifthCities:"",
            style:[],//类型
            belongs:[],//属管
            attr:[],
            prop:[],
            batch:1,//批次
            depart:"",//专业
            wish:[],//学习愿望（学文、理、工）
            department:[],//具体专业
            city_prefer:[],//城市
            city_ignore:[],
            prop_prefer:[],//属性
            prop_ignore:[],
            style_prefer:[],//类型
            style_ignore:[],
            belongs_prefer:[],//属管
            belongs_ignore:[],
            attr_prefer:[],//类别
            attr_ignore:[],
            depart_prefer:[],//专业
            depart_ignore:[],
            physical_ignore:[], //体检
            depart_prefer2:[],//语种
            depart_ignore2:[],
            course_prefer:[],//强弱方面
            course_ignore:[],
            graduate_option:[],//毕业去向
            wish_prefer:[], //学习愿望方面
            wish_ignore:[],
            user_prefer:[],//兴趣爱好方面
            user_ignore:[],
            nature_prefer:[],//性格倾向方面
            gift_prefer:[],//能力特长方面
            gift_ignore:[],
            economy_option:false,

            labelType:[],//个性标签类别
            physical:[],//体检限项目
            languages:[],//语种
            drive:[],//加试
            charge:[],//多少费
            strong:[],//强弱学科
            job:[],//就业
            pubmed:[],//考研
            goAbroad:[],//出国
            matter:[],//物体打交道
            people:[],//与人打交道
            business:[],//关注事务大小
            ability:[],//能力强弱,
            city_name:[],//城市名称
            prop_name:[],//属性
            style_name:[],//类型
            belongs_name:[],//属管
            attr_name:[],//类别
            depart_name:[],//专业
            depart_name2:[],//语种
            gift_name:[],//能力特长方面
            course_name:[],//强弱方面
            wish_name:[],//学习愿望方面
            graduate_name:[],//毕业去向
            user_name:[],//兴趣爱好方面
            nature_name:[],//性格倾向方面
            cityArr:[],//城市数组、对象
            cityObj:{},
            cityOpt1:[],
            cityOpt2:[],
            cityOpt3:[],
            propArr:[],//属性数组、对象
            propObj:{},
            styleArr:[],//类型数组、对象
            styleObj:{},
            belongsArr:[],//属管理数组、对象
            belongsObj:{},
            attrArr:[],//类别数组、对象
            attrObj:{},
            departArr:[],//专业数组、对象
            departObj:{},
            departOpt1:[],
            departOpt2:[],
            departOpt3:[],
            departOpt4:[],
            departOpt5:[],
            departOpt6:[],
            graduateArr:[],//毕业去向数组、对象
            graduateObj:{},
            departArr2:[],//语种数组、对象
            departObj2:{},
            userArr:[],//兴趣爱好方面数组、对象
            userObj:{},
            natureArr:[],//性格倾向方面数组、对象
            natureObj:{},
            wishArr:[],//学习愿望方面数组、对象
            wishObj:{},
            giftArr:[],//能力特长数组、对象
            giftObj:{},
            courseArr:[],//中学强弱学科数组、对象
            courseObj:{}
        };

        $scope.info={
            title:"",
            subtitle:"",
            subject:"",
            score:"",
            level:"",
            uScore:"",
        }

        init();

        function init(){
            var type = sessionStorage.getItem('type') == null ? 1:sessionStorage.getItem('type');
            switch (parseInt(type)){
                case 1:
                    $scope.info.title = "文科本一考生志愿意向表";
                    $scope.info.subtitle = "【第一阶段填报文科类第一批本科院校志愿用表】";
                    break;
                case 2:
                    $scope.info.title = "理科本一考生志愿意向表";
                    $scope.info.subtitle = "【第一阶段填报理科类第一批本科院校志愿用表】";
                    break;
                case 3:
                    $scope.info.title = "文科本二考生志愿意向表";
                    $scope.info.subtitle = "【第一阶段填报文科类第二批本科院校志愿用表】";
                    break;
                case 4:
                    $scope.info.title = "理科本二考生志愿意向表";
                    $scope.info.subtitle = "【第一阶段填报理科类第二批本科院校志愿用表】";
                    break;
                case 5:
                    $scope.info.title = "文科本三考生志愿意向表";
                    $scope.info.subtitle = "【第二阶段填报文科类第三批本科院校志愿用表】";
                    break;
                case 6:
                    $scope.info.title = "理科本三考生志愿意向表";
                    $scope.info.subtitle = "【第二阶段填报理科类第三批本科院校志愿用表】";
                    break;
                case 7:
                    $scope.info.title = "文科高职(专科)考生志愿意向表";
                    $scope.info.subtitle = "【第二阶段填报文科类高职（专科）院校志愿用表】";
                    break;
                case 8:
                    $scope.info.title = "理科高职(专科)考生志愿意向表";
                    $scope.info.subtitle = "【第二阶段填报理科类高职（专科）院校志愿用表】";
                    break;
            }
            var uScore =$scope.info.uScore= JSON.parse(sessionStorage.getItem('uScore'));
            $scope.info.subject=uScore.subject==1?"文科":"理科";
            $scope.info.score = uScore.score;
            $scope.info.level = uScore.level_a+","+uScore.level_b;

            /*属地*/
            $http.get('/loocha/wish/area?batch='+$scope.hope.batch).success(function(data,status){
                $scope.hope.area = data.response.item0;
                $scope.hope.js_province = data.response.item1;
                $scope.hope.firstCities = data.response.item2;
                $scope.hope.secondCities = data.response.item3;
                $scope.hope.thirdCities = data.response.item4;
                $scope.hope.fourthCities = data.response.item5;
                $scope.hope.fifthCities = data.response.item6;
            });
            /*专业大门类（13个）*/
            $http.get('/loocha/depart/prop?type=0&depart_type=0').success(function(data,status){
                $scope.hope.depart = data.response;
            });
            /**
             * 获取具体专业
             */
            $http.get("/loocha/batch?type="+$scope.hope.batch).success(function(data,status){
                $scope.hope.department = data.response;
            });

            /*按重点项目建设分*/
            $http.get('/loocha/school/prop/1').success(function(data,status){
                $scope.hope.prop = data.response;
            });
            /*按重点学科方向分*/
            $http.get('/loocha/school/prop?type=0&depart_type=2').success(function(data,status){
                $scope.hope.style = data.response;
            });
            /*按管理体制分*/
            $http.get('/loocha/school/prop?type=1&depart_type=1').success(function(data,status){
                $scope.hope.belongs = data.response;
            });
            /*按管理体制分*/
            $http.get('/loocha/school/prop?type=2&depart_type=1').success(function(data,status){
                $scope.hope.attr = data.response;
            });
            /*个性标签分类*/
            $http.get('/loocha/depart/prop?type=100&depart_type=0').success(function(data,status){
                $scope.hope.labelType = data.response;
            });
            /*体检限项*/
            $http.get('/loocha/depart/prop?type=30&depart_type=0').success(function(data,status){
                $scope.hope.physical = data.response;
            });
            /*语种*/
            $http.get('/loocha/depart/prop?type=37&depart_type=0').success(function(data,status){
                $scope.hope.languages = data.response;
            });
            /*喜欢与物打交道*/
            $http.get('/loocha/depart/prop?type=4&depart_type=0').success(function(data,status){
                $scope.hope.matter = data.response;
            });
            /*喜欢与人打交道*/
            $http.get('/loocha/depart/prop?type=5&depart_type=0').success(function(data,status){
                $scope.hope.people = data.response;
            });
            /*关注大小事*/
            $http.get('/loocha/depart/prop?type=6&depart_type=0').success(function(data,status){
                $scope.hope.business = data.response;
            });
            /*能力强弱*/
            $http.get('/loocha/depart/prop?type=7&depart_type=0').success(function(data,status){
                $scope.hope.ability = data.response;
            });
            /*外向型*/
            $http.get('/loocha/depart/prop?type=23&depart_type=0').success(function(data,status){
                $scope.hope.wcharacter = data.response;
            });
            /*内向型*/
            $http.get('/loocha/depart/prop?type=24&depart_type=0').success(function(data,status){
                $scope.hope.ncharacter = data.response;
            });
            /*加试*/
            $http.get('/loocha/depart/drive?parentId=675&depart_type=0').success(function(data,status){
                $scope.hope.drive = data.response;
            });
            /*多收费*/
            $http.get('/loocha/depart/drive?parentId=676&depart_type=0').success(function(data,status){
                $scope.hope.charge = data.response;
            });
            /*中学强弱学科*/
            $http.get('/loocha/depart/prop?type=3&depart_type=0').success(function(data,status){
                $scope.hope.strong = data.response;
            });
            /*就业*/
            $http.get('/loocha/depart/drive?parentId=137&depart_type=0').success(function(data,status){
                $scope.hope.job = data.response;
            });
            /*考研*/
            $http.get('/loocha/depart/drive?parentId=139&depart_type=0').success(function(data,status){
                $scope.hope.pubmed = data.response;
            });
            /*出国*/
            $http.get('/loocha/depart/drive?parentId=140&depart_type=0').success(function(data,status){
                $scope.hope.goAbroad = data.response;
            });
            /*学习愿望方面 */
            $http.get('/loocha/depart/prop?type=101&depart_type=0').success(function(data,status){
                $scope.hope.wish = data.response;
            });

            $(document).unbind('click').click(function(e){
                e = window.event || e;
                obj = $(e.srcElement || e.target);
                if($(obj).is('.btn,.btn-default,.dropdown-toggle,.dropdown-menu,.dropdown-menu li,.dropdown-menu li a')){
                }else{
                    $("#provnice .dropdown-menu,#panel-footer .dropdown-menu,#character .dropdown-menu,#depart .dropdown-menu").hide();
                }
            });
        }
        /*
         * 根据批次、地区ID 显示对应的省份
         * */
        $scope.showClassify = function(city_id){
            $("#provnice .dropdown-menu").hide();
            var istrue = $("#dropdown"+city_id).attr('data-istrue');
            if (istrue == "false"){
                $http.get('/loocha/wish/areatype?batch='+$scope.hope.batch+'&city_id='+city_id).success(function(data,status){
                    var html = [];
                    $.each(data.response,function(i,v){
                        html.push('<li><a href="javascript:;;" class="findCity" city_id="'+v.city_id+'">'+v.name+'</a></li>');
                    });
                    $("#dropdown"+city_id).append(html.join(''));

                    /*
                     * 具体是省份绑定点击、双击事件
                     * */
                    var _time = null;
                    $(".findCity").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), city_id = that.attr('city_id');
                        var list = $(".cityClk[parent_id="+city_id+"]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.city_prefer,$scope.hope.city_ignore,"city_id",$scope.hope.city_name,$scope.hope.cityArr);
                        $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.cityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status");
                            var city_id = that.attr('city_id');
                            var list = $(".cityClk[parent_id="+city_id+"]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.city_prefer,$scope.hope.city_ignore,"city_id",$scope.hope.city_name,$scope.hope.cityArr,$scope.hope.cityObj);
                            $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.cityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
                            console.log(JSON.stringify($scope.hope.cityArr));
                        },400);
                    });
                });
                $("#dropdown"+city_id).attr("data-istrue","true");
            }
            $("#dropdown"+city_id).show();
        };

        /**
         * 根据对象查询学校列表
         * @param e 当前点击对象
         */
        $scope.showSchoolList = function(e){
            function subLevel(str){
                var num = "";
                switch(str){
                    case "A+":
                        num =5;
                        break;
                    case "A":
                        num =4;
                        break;
                    case "B+":
                        num =3;
                        break;
                    case "B":
                        num =2;
                        break;
                    case "C":
                        num =1;
                        break;
                    case "D":
                        num =0;
                        break;
                }
                return num;
            }
            var param1 = {};
            param1.name="某某同学";
            param1.u_level=2;
            param1.number = 14321111111113;
            param1.city = 0;
            param1.cityarea = 0;
            param1.score=$scope.info.uScore.score;
            param1.devision = sessionStorage.getItem('type')%2 == 1 ? 1:2;//文科还是理科 1是文科2是理科
            param1.obl = subLevel($scope.info.uScore.level_a);//第一门
            param1.sel = subLevel($scope.info.uScore.level_b);//另一门

            var tramsform = function(data){
                return $.param(data);
            };
            $http.post("/loocha/exam/pscore",param1,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data,status){
                if(data.status==0){
                    $("#provnice .dropdown-menu,#panel-footer .dropdown-menu").hide();
                    var that = $(e.target),alt = that.attr('alt'),ul = that.next();
                    var istrue = ul.attr('data-istrue');
                    if(istrue == "false"){
                        var param = "";
                        if(alt =='city'){
                            var city_id = that.attr('city_id');
                            param = "level=2&attr=0&style=0&belongs=0&proptype=-1&province=0&city="+city_id;
                        }else if(alt == 'prop'){
                            var prop_id = that.attr('prop_id');
                            param = "level=2&attr=0&style=0&belongs=0&proptype="+prop_id+"&province=0&city=0";
                        }else if(alt == 'style'){
                            var style_id = that.attr('style_id');
                            param = "level=2&attr=0&style="+style_id+"&belongs=0&proptype=0&province=0&city=0";
                        }else if(alt == 'belongs'){
                            var belongs_id = that.attr('belongs_id');
                            param = "level=2&attr=0&style=0&belongs="+belongs_id+"&proptype=0&province=0&city=0";
                        }else if(alt == 'attr'){
                            var attr_id = that.attr('attr_id');
                            param = "level=2&attr="+attr_id+"&style=0&belongs=0&proptype=0&province=0&city=0";
                        }
                        $http.get('/loocha/exam/schoolprop?'+param).success(function(data,status){
                            var html = [];
                            if(data.response!=null&&data.response.list.length>0){
                                $.each(data.response.list,function(i,v){
                                    html.push('<li><a href="javascript:;;">'+v.name+'</a></li>');
                                });
                            }else{
                                html.push('<li><a href="javascript:;;">没有搜索到高校</a></li>');
                            }
                            ul.append(html.join(''));
                        });
                        ul.attr("data-istrue","true");
                    }
                    ul.show();
                }
            });
        }

        /*
         * TODO 批次 depart_type
         * */
        $scope.showDepartCls = function(course_id){
            $("#depart .dropdown-menu").hide();
            var istrue = $("#depart"+course_id).attr('data-istrue');
            if(istrue == "false"){
                $http.get('/loocha/depart/specific?course_id='+course_id+'&depart_type='+$scope.hope.batch).success(function(data,status){
                    var html = [];
                    if(data.response.length<=0){
                        html.push('<li><a href="javascript:;;">没有找到任何数据！</a></li>');
                    }else{
                        $.each(data.response,function(i,v){
                            html.push('<li><a href="javascript:;;" class="findDepart" course_id="'+v.id+'">'+v.name+'</a></li>');
                        });
                    }
                    $("#depart"+course_id).append(html.join(''));
                    var _time = null;
                    $(".findDepart").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), course_id = that.attr('course_id');
                        var list = $(".departClk[parent_id="+course_id+"]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.depart_prefer,$scope.hope.depart_ignore,"depart_id",$scope.hope.depart_name,$scope.hope.departArr);
                        $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status");
                            //course_id  是专业门类
                            var course_id = that.attr('course_id');
                            var list = $(".departClk[parent_id="+course_id+"]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.depart_prefer,$scope.hope.depart_ignore,"depart_id",$scope.hope.depart_name,$scope.hope.departArr,$scope.hope.departObj);
                            $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                        },400);
                    });
                });
                $("#depart"+course_id).attr("data-istrue","true");

            }
            $("#depart"+course_id).show();
        }
        /*个性标签*/
        $scope.showCharacter = function(type_id){
            $("#character .dropdown-menu").hide();
            var istrue = $("#pills"+type_id).attr('data-istrue');
            if (istrue == "false"){
                $http.get("/loocha/depart/drive?parentId="+type_id).success(function(data,status){
                    var html = [];
                    if(data.response.length<=0){
                        html.push('<li><a href="javascript:;;">没有找到任何数据！</a></li>');
                    }else{
                        $.each(data.response,function(i,v){
                            html.push('<li><a href="javascript:;;" class="findCharacter" type_id="'+v.id+'">'+v.name+'</a></li>');
                        });
                    }
                    $("#pills"+type_id).append(html.join(''));
                    var _time = null;
                    $(".findCharacter").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"),type_id = that.attr('type_id');
                        var list = $(".physiClk[parent_id="+type_id+"]");
                        if(type_id == 137 || type_id == 139 || type_id == 140||type_id == 682 || type_id == 683){
                            return;
                        }else if(type_id == 674 || type_id == 675 || type_id == 676){
                            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.depart_prefer2,$scope.hope.depart_ignore2,"depart_id",$scope.hope.depart_name2,$scope.hope.departArr2);
                            $scope.hope.depart_prefer2 = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.depart_ignore2 = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.depart_name2 = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.departArr2 = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                        }else if(type_id == 679 || type_id == 680 || type_id == 681){
                            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.user_prefer,$scope.hope.user_ignore,"user_id",$scope.hope.user_name,$scope.hope.userArr);
                            $scope.hope.user_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.user_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.user_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.userArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                        }else if (type_id == 684 || type_id == 685 || type_id == 686){
                            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.wish_prefer,$scope.hope.wish_ignore,"wish_id",$scope.hope.wish_name,$scope.hope.wishArr);
                            $scope.hope.wish_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.wish_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.wish_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.wishArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                        }else if(type_id == 690){
                            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,"",$scope.hope.physical_ignore,"physical_id",$scope.hope.physical_name,null);
                            $scope.hope.physical_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        }
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status");
                            var type_id = that.attr('type_id');
                            var list = $(".physiClk[parent_id="+type_id+"]");
                            if(type_id == 137 || type_id == 139 || type_id == 140){
                                var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.graduate_option,"","graduate_id",$scope.hope.graduate_name,$scope.hope.graduateArr,$scope.hope.graduateObj);
                                $scope.hope.graduate_option = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                                $scope.hope.graduate_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                                $scope.hope.graduateArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                            }else if(type_id == 674 || type_id == 675 || type_id == 676){
                                var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.depart_prefer2,$scope.hope.depart_ignore2,"depart_id",$scope.hope.depart_name2,$scope.hope.departArr2,$scope.hope.departObj2);
                                $scope.hope.depart_prefer2 = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                                $scope.hope.depart_ignore2 = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                                $scope.hope.depart_name2 =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                                $scope.hope.departArr2 =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                            }else if(type_id == 679 || type_id == 680 || type_id == 681){
                                var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.user_prefer,$scope.hope.user_ignore,"user_id",$scope.hope.user_name,$scope.hope.userArr,$scope.hope.userObj);
                                $scope.hope.user_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                                $scope.hope.user_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                                $scope.hope.user_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                                $scope.hope.userArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                            }else if(type_id == 682 || type_id == 683){
                                var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.nature_prefer,"","nature_id",$scope.hope.nature_name,$scope.hope.natureArr,$scope.hope.natureObj);
                                $scope.hope.nature_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                                $scope.hope.nature_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                                $scope.hope.natureArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                            }else if(type_id == 684 || type_id == 685 || type_id == 686){
                                var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.wish_prefer,$scope.hope.wish_ignore,"wish_id",$scope.hope.wish_name,$scope.hope.wishArr,$scope.hope.wishObj);
                                $scope.hope.wish_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                                $scope.hope.wish_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                                $scope.hope.wish_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                                $scope.hope.wishArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];

                            }else if (type_id == 690){
                                return;
                            }
                        },400);
                    });
                });
                $("#pills"+type_id).attr("data-istrue","true");
            }
            $("#pills"+type_id).show();
        }
        /*
         * 具体的县级市绑定单击事件
         * */
        $scope.agreeCity = function(e){
            var that = $(e.target),status = that.attr('status'),city_id = that.attr('city_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.city_prefer,$scope.hope.city_ignore,city_id,$scope.hope.city_name,that.html(),$scope.hope.cityArr,$scope.hope.cityObj);
            $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.cityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 具体的县级市绑定双击事件
         * */
        $scope.rejectCity = function(e){
            var that = $(e.target),status = that.attr('status'),city_id = that.attr('city_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.city_prefer,$scope.hope.city_ignore,city_id,$scope.hope.city_name,that.html(),$scope.hope.cityArr);
            $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.cityArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /***
         * 属性
         * @param e
         */
        $scope.agreeProp = function(e){
            var that = $(e.target),status = that.attr('status'),prop_id = that.attr('prop_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.prop_prefer,"",prop_id,$scope.hope.prop_name,that.html(),$scope.hope.propArr,$scope.hope.propObj);
            $scope.hope.prop_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.prop_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.propArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /*
         * 按重点学科方向分单机事件
         * */
        $scope.agreeStyle = function(e){
            var that = $(e.target),status = that.attr('status'),style_id = that.attr('style_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.style_prefer,$scope.hope.style_ignore,style_id,$scope.hope.style_name,that.html(),$scope.hope.styleArr,$scope.hope.styleObj);
            $scope.hope.style_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.style_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.style_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.styleArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 按重点学科方向分双击事件
         * */
        $scope.rejectStyle = function(e){
            var that = $(e.target),status = that.attr('status'),style_id = that.attr('style_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.style_prefer,$scope.hope.style_ignore,style_id,$scope.hope.style_name,that.html(),$scope.hope.styleArr);
            $scope.hope.style_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.style_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.style_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.styleArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 按管理体制分单机事件
         * */
        $scope.agreeBelongs = function(e){
            var that = $(e.target),status = that.attr('status'),belongs_id = that.attr('belongs_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.belongs_prefer,$scope.hope.belongs_ignore,belongs_id,$scope.hope.belongs_name,that.html(),$scope.hope.belongsArr,$scope.hope.belongsObj);
            $scope.hope.belongs_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.belongs_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.belongs_name =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.belongsArr =  mosaic.split("-")[3].length > 0 ?JSON.parse( mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 按管理体制分双击事件
         * */
        $scope.rejectBelongs = function(e){
            var that = $(e.target),status = that.attr('status'),belongs_id = that.attr('belongs_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.belongs_prefer,$scope.hope.belongs_ignore,belongs_id,$scope.hope.belongs_name,that.html(),$scope.hope.belongsArr);
            $scope.hope.belongs_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.belongs_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.belongs_name =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.belongsArr =  mosaic.split("-")[3].length > 0 ?JSON.parse( mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 按运行机制分单机事件
         * */
        $scope.agreeAttr = function(e){
            var that = $(e.target),status = that.attr('status'),attr_id = that.attr('attr_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.attr_prefer,$scope.hope.attr_ignore,attr_id, $scope.hope.attr_name,that.html(),$scope.hope.attrArr,$scope.hope.attrObj);
            $scope.hope.attr_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.attr_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.attr_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.attrArr =  mosaic.split("-")[3].length > 0 ?JSON.parse( mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 按运行机制分双击事件
         * */
        $scope.rejectAttr = function(e){
            var that = $(e.target),status = that.attr('status'),attr_id = that.attr('attr_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.attr_prefer,$scope.hope.attr_ignore,attr_id, $scope.hope.attr_name,that.html(),$scope.hope.attrArr);
            $scope.hope.attr_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.attr_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.attr_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.attrArr =  mosaic.split("-")[3].length > 0 ?JSON.parse( mosaic.split("-")[3].split(",")):[];
        };

        /*专业单机事件*/
        $scope.agreeDepart = function(e){
            var that = $(e.target),status = that.attr('status'),depart_id = that.attr('depart_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.depart_prefer,$scope.hope.depart_ignore,depart_id, $scope.hope.depart_name,that.html(),$scope.hope.departArr,$scope.hope.departObj);
            $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ?JSON.parse( mosaic.split("-")[3].split(",")):[];
        };

        /*专业双击事件*/
        $scope.rejectDepart = function(e){
            var that = $(e.target),status = that.attr('status'),depart_id = that.attr('depart_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.depart_prefer,$scope.hope.depart_ignore,depart_id, $scope.hope.depart_name,that.html(),$scope.hope.departArr);
            $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /*体检限项双击事件*/
        $scope.rejectPhysical = function(e){
            var that = $(e.target),status = that.attr('status'),physical_id = that.attr('physical_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,"",$scope.hope.physical_ignore,physical_id);
            $scope.hope.physical_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
        }
        /*
         *   语种加试多收费 单机事件
         * */
        $scope.agreeDepart2 = function(e){
            var that = $(e.target),status = that.attr('status'),depart_id = that.attr('depart_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.depart_prefer2,$scope.hope.depart_ignore2,depart_id,$scope.hope.depart_name2,that.html(),$scope.hope.departArr2,$scope.hope.departObj2);
            $scope.hope.depart_prefer2 = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore2 = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name2 = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr2 = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 语种加试多收费 双击事件
         * */
        $scope.rejectDepart2 = function(e){
            var that = $(e.target),status = that.attr('status'),depart_id = that.attr('depart_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.depart_prefer2,$scope.hope.depart_ignore2,depart_id,$scope.hope.depart_name2,that.html(),$scope.hope.departArr2);
            $scope.hope.depart_prefer2 = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore2 = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name2 = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr2 = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 能力强弱单击*/
        $scope.agreeAbility = function(e){
            var that = $(e.target),status = that.attr('status'),ability_id = that.attr('ability_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.gift_prefer,$scope.hope.gift_ignore,ability_id,$scope.hope.gift_name,that.html(),$scope.hope.giftArr,$scope.hope.giftObj);
            $scope.hope.gift_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.gift_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.gift_name =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.giftArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*能力强弱双击*/
        $scope.rejectAbility = function(e){
            var that = $(e.target),status = that.attr('status'),ability_id = that.attr('ability_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.gift_prefer,$scope.hope.gift_ignore,ability_id,$scope.hope.gift_name,that.html(),$scope.hope.giftArr);
            $scope.hope.gift_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.gift_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.gift_name =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.giftArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        }
        /*
         *   中学强弱学科 单机事件
         * */
        $scope.agreeCourse = function(e){
            var that = $(e.target),status = that.attr('status'),course_id = that.attr('course_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.course_prefer,$scope.hope.course_ignore,course_id,$scope.hope.course_name,that.html(),$scope.hope.courseArr,$scope.hope.courseObj);
            $scope.hope.course_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.course_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.course_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.courseArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 中学强弱学科 双击事件
         * */
        $scope.rejectCourse = function(e){
            var that = $(e.target),status = that.attr('status'),course_id = that.attr('course_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.course_prefer,$scope.hope.course_ignore,course_id,$scope.hope.course_name,that.html(),$scope.hope.courseArr);
            $scope.hope.course_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.course_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.course_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.courseArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /*
         *   毕业去向 单机事件
         * */
        $scope.agreeGraduate = function(e){
            var that = $(e.target),status = that.attr('status'),graduate_id = that.attr('graduate_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.graduate_option,"",graduate_id,$scope.hope.graduate_name,that.html(),$scope.hope.graduateArr,$scope.hope.graduateObj);
            $scope.hope.graduate_option = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.graduate_name =  mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.graduateArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        $scope.agreeWish = function(e){
            var that = $(e.target),status = that.attr('status'),wish_id = that.attr('wish_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.wish_prefer,$scope.hope.wish_ignore,wish_id,$scope.hope.wish_name,that.html(),$scope.hope.wishArr,$scope.hope.wishObj);
            $scope.hope.wish_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.wish_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.wish_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.wishArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        $scope.rejectWish = function(e){
            var that = $(e.target),status = that.attr('status'),wish_id = that.attr('wish_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.wish_prefer,$scope.hope.wish_ignore,wish_id,$scope.hope.wish_name,that.html(),$scope.hope.wishArr);
            $scope.hope.wish_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.wish_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.wish_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.wishArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /*
         *   兴趣 单机事件
         * */
        $scope.agreeUser = function(e){
            var that = $(e.target),status = that.attr('status'),user_id = that.attr('user_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.user_prefer,$scope.hope.user_ignore,user_id,$scope.hope.user_name,that.html(),$scope.hope.userArr,$scope.hope.userObj);
            $scope.hope.user_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.user_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.user_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.userArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 兴趣 双击事件
         * */
        $scope.rejectUser = function(e){
            var that = $(e.target),status = that.attr('status'),user_id = that.attr('user_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.user_prefer,$scope.hope.user_ignore,user_id,$scope.hope.user_name,that.html(),$scope.hope.userArr);
            $scope.hope.user_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.user_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.user_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.userArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /*性格 外向型还是内向型*/
        $scope.agreeNature = function(e){
            var that = $(e.target),status = that.attr('status'),nature_id = that.attr('nature_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.nature_prefer,$scope.hope.nature_ignore,nature_id,$scope.hope.nature_name,that.html(),$scope.hope.natureArr,$scope.hope.natureObj);
            $scope.hope.nature_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.nature_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.nature_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.natureArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        $(".btn-all").hide();
        $(".btn-show").click(function(e){
            $(this).hide();
            $(".btn-all").show();
        });

        $(".btn-hide").click(function(e){
            $(".btn-show").show();
            $(".btn-all").hide();
        });

        $scope.pay = function(){
            //    TODO 提交订单，
            $window.open('#/pay');
            //$window.location.href = "#/pay";
        };

        $scope.manual = function(){
            $window.location.href = "#/refer1";
            $(".modal-backdrop").remove();
            $(".modal-open").removeClass('modal-open');
        };

        //////////////////////////////////监听//////////////////////////////////////////////////
        $scope.$watch('hope.cityArr',function(newValue,oldValue,scope){
            console.log("newValue:"+JSON.stringify(newValue)+"oldValue:"+JSON.stringify(oldValue));
        });

        $scope.$watch('hope.departArr',function(newValue,oldValue,scope){
            console.log("newValue:"+JSON.stringify(newValue)+"oldValue:"+JSON.stringify(oldValue));
        });

        $scope.$watch('hope.cityOpt1',function(newValue,oldValue){
            console.log("newValue:"+JSON.stringify(newValue)+",oldValue:"+JSON.stringify(oldValue));
        });
    }]);
});