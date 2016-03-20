/**
 * Created by Administrator on 2015/12/14.
 */
require(['app'],function(app){
    app.factory("classifyClk",function(){
        return {
            /**
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
                            //name.push($(v).html());
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
                        //name.splice(prefer.indexOf(idx),1);
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
                        //name.push(value);
                    }
                }else if(status == 1){
                    status = that.attr("status","0").removeClass('agree reject').addClass('cancle');
                    if(prefer.indexOf(id)>=0){
                        if(arr!=null){
                            arr.splice(prefer.indexOf(id),1);
                        }
                        //name.splice(prefer.indexOf(id),1);
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
    });
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
                            //name.splice(prefer.indexOf(idx),1);
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
                        //name.splice(prefer.indexOf(id),1);
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
    });
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
    app.directive('isSchool',function(){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$parent.$last == true){
                    /**
                     * 把 nav 高度大于 220 的添加 scroll
                     */
                    var list = $("#panel-footer .nav-pills");
                    for(var i=0;i<list.size();i++){
                        var that =list.eq(i);
                        if(that.height()>220){
                            that.addClass('nav-scroll');
                        }
                    }
                }
            }
        }
    });
    app.directive('isDepart',function(){
        return {
            restrict:"A",
            link:function(scope,elm,attr){
                if(scope.$parent.$last == true){
                    /**
                     * 把 nav 高度大于 220 的添加 scroll
                     */
                    var list = $("#depart .nav-depart");
                    for(var i=0;i<list.size();i++){
                        var that =list.eq(i);
                        if(that.height()>220){
                            that.addClass('nav-scroll');
                        }
                    }
                }
            }
        }
    });
    app.controller('hopeCtr',['$scope','$window','$http','$timeout','classifyClk','classifyDBClk','getLoginUserInfo','arraysort',function($scope,$window,$http,$timeout,classifyClk,classifyDBClk,getLoginUserInfo,arraysort){
        $scope.hope = {
            area: "",
            js_province: "",
            firstCities: "",
            secondCities: "",
            thirdCities: "",
            fourthCities: "",
            fifthCities: "",
            firstDepart:"",
            secondDepart: "",
            thirdDepart: "",
            fourthDepart: "",
            fifthDepart: "",
            schbatch: "",
            batch: sessionStorage.getItem('type')!=null ? sessionStorage.getItem('type') : 1,//批次
            depart: [],//专业
            wish: [],//学习愿望（学文、理、工）
            department: [],//具体专业
            city_prefer: [],//城市
            city_ignore: [],
            school_prefer: [],//院校属类
            school_ignore: [],
            depart_prefer: [],//专业
            depart_ignore: [],
            city_name: [],//城市名称
            depart_name: [],//专业
            cityArr: [],//城市数组、对象
            cityObj: {},
            cityOpt1: [],
            cityOpt2: [],
            cityOpt3: [],
            schoolArr: [],//院校数组、对象
            school_name: [],
            schoolObj: [],
            departArr: [],//专业数组、对象
            departObj: {},
            personality_type1:[],
            personality_type2:[],
            personality_type3:[],
            personality_type4:[],
            classify_1:[],
            classify_2:[],
            physical_1:[],//体检
            physical_2:[],
            unEnglish:[],//语种
            personality_prefer:[],
            personality_ignore:[],
            personality_name:[],
            personalitylist:[],
            personalityArr:[],
            personalityObj:[],
            langue:[],
            languename:[],
            langueArr:[],
        };
        $scope.info={
            title:"",
            subtitle:"",
            subject:"",
            score:"",
            level:"",
            uScore:"",
        };
        $scope.rates=[];

        $scope.toggle = {
            now:false
        };

        $scope.iterator = {
            firDepart1:[],firDepart2:[],firDepart3:[],firDepart4:[],firDepart5:[],
            secDepart1:[],secDepart2:[],secDepart3:[],secDepart4:[],secDepart5:[],secDepart6:[],secDepart7:[],secDepart8:[],secDepart9:[],
            thiDepart1:[],thiDepart2:[],thiDepart3:[],thiDepart4:[],thiDepart5:[],
            thiDepart6:[],thiDepart7:[],thiDepart8:[],thiDepart9:[],thiDepart10:[],
            thiDepart11:[],thiDepart12:[],thiDepart13:[],thiDepart14:[],thiDepart15:[],
            thiDepart16:[],thiDepart17:[],thiDepart18:[],thiDepart19:[],thiDepart20:[],
            thiDepart21:[],thiDepart22:[],thiDepart23:[],thiDepart24:[],thiDepart25:[],
            thiDepart26:[],thiDepart27:[],thiDepart28:[],thiDepart29:[],thiDepart30:[],
            thiDepart31:[],thiDepart32:[],thiDepart33:[],thiDepart34:[],thiDepart35:[],
            thiDepart36:[],thiDepart37:[],thiDepart38:[],thiDepart39:[],thiDepart40:[],
            thiDepart41:[],thiDepart42:[],thiDepart43:[],thiDepart44:[],thiDepart45:[],
            thiDepart46:[],thiDepart47:[],thiDepart48:[],thiDepart49:[],thiDepart50:[],
            thiDepart51:[],thiDepart52:[],thiDepart53:[],thiDepart54:[],thiDepart55:[],
            thiDepart56:[],thiDepart57:[],thiDepart58:[],thiDepart59:[],thiDepart60:[],thiDepart61:[],
            thiDepart62:[],thiDepart63:[],thiDepart64:[],thiDepart65:[],thiDepart66:[],thiDepart67:[],thiDepart68:[],
            thiDepart69:[],thiDepart70:[],thiDepart71:[],
            fourDepart1:[],fourDepart2:[],fourDepart3:[],fourDepart4:[],fourDepart5:[],fourDepart6:[],fourDepart7:[],fourDepart8:[],fourDepart9:[],fourDepart10:[],
            fifDepart1:[],fifDepart2:[],fifDepart3:[],fifDepart4:[],fifDepart5:[],fifDepart6:[],fifDepart7:[],fifDepart8:[],fifDepart9:[],fifDepart10:[],fifDepart11:[]
        };

        $scope.finshparam = {
            project:[],
            school_prefer:[],
            depart_prefer:[],
            city_prefer:[],
            personality_prefer:[]
        }

        init();

        function init(){
            getLoginUserInfo.isLogoin();
            $scope.coverage = [
                {
                    id:1,
                    name:"高校"
                },{
                    id:2,
                    name:"专业"
                },{
                    id:3,
                    name:"城市"
                },{
                    id:4,
                    name:"个性"
                }
            ];
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
                $scope.hope.area = data.response.item1;
                $scope.hope.js_province = data.response.item2;
                $scope.hope.firstCities = data.response.item3;
                $scope.hope.secondCities = data.response.item4;
                $scope.hope.thirdCities = data.response.item5;
                $scope.hope.fourthCities = data.response.item6;
                $scope.hope.fifthCities = data.response.item7;
            });

            /*院校属类*/
            $http.get('/loocha/schbath?type='+$scope.hope.batch).success(function(data,status){
                $scope.hope.schbatch = data.response;
            });

            if(type<=6){
                /*专业大门类（13个）*/
                $http.get('/loocha/depart/prop?type=0&depart_type=0').success(function(data,status){
                    $.each(data.response,function(i,v){
                        if(i<13){
                            $scope.hope.depart.push(v);
                        }
                    });
                    console.log($scope.hope.depart);
                });
            }else{
                /*专业大门类（13个）*/
                $http.get('/loocha/depart/prop?type=0&depart_type=1').success(function(data,status){
                    $.each(data.response,function(i,v){
                        if(i<19){
                            $scope.hope.depart.push(v);
                        }
                    });
                    console.log($scope.hope.depart);
                });
            }

            /**
             * 获取具体专业
             */
            $http.get("/loocha/batch?type="+$scope.hope.batch).success(function(data,status){
                $scope.hope.firstDepart = data.response.item2;
                $scope.hope.secondDepart = data.response.item3;
                $scope.hope.thirdDepart = data.response.item4;
                $scope.hope.fourthDepart = data.response.item5;
                $scope.hope.fifthDepart = data.response.item6;
                iterator_1($scope.hope.firstDepart);
                iterator_2($scope.hope.secondDepart);
                iterator_3($scope.hope.thirdDepart);
                iterator_4($scope.hope.fourthDepart);
                iterator_5($scope.hope.fifthDepart);
            });

            function iterator_1(list){
                $.each(list,function(i,v){
                    switch(parseInt(v.classify)){
                        case 1:
                            $scope.iterator.firDepart1.push(v);
                            break;
                        case 2:
                            $scope.iterator.firDepart2.push(v);
                            break;
                        case 3:
                            $scope.iterator.firDepart3.push(v);
                            break;
                        case 4:
                            $scope.iterator.firDepart4.push(v);
                            break;
                        case 5:
                            $scope.iterator.firDepart5.push(v);
                            break;
                    }
                })
            }
            function iterator_2(list){
                $.each(list,function(i,v){
                    switch(parseInt(v.classify)){
                        case 1:
                            $scope.iterator.secDepart1.push(v);
                            break;
                        case 2:
                            $scope.iterator.secDepart2.push(v);
                            break;
                        case 3:
                            $scope.iterator.secDepart3.push(v);
                            break;
                        case 4:
                            $scope.iterator.secDepart4.push(v);
                            break;
                        case 5:
                            $scope.iterator.secDepart5.push(v);
                            break;
                        case 6:
                            $scope.iterator.secDepart6.push(v);
                            break;
                        case 7:
                            $scope.iterator.secDepart7.push(v);
                            break;
                        case 8:
                            $scope.iterator.secDepart8.push(v);
                            break;
                        case 9:
                            $scope.iterator.secDepart9.push(v);
                            break;
                    }
                })
            }
            function iterator_3(list){
                $.each(list,function(i,v){
                    switch(parseInt(v.classify)){
                        case 1:
                            $scope.iterator.thiDepart1.push(v);
                            break;
                        case 2:
                            $scope.iterator.thiDepart2.push(v);
                            break;
                        case 3:
                            $scope.iterator.thiDepart3.push(v);
                            break;
                        case 4:
                            $scope.iterator.thiDepart4.push(v);
                            break;
                        case 5:
                            $scope.iterator.thiDepart5.push(v);
                            break;
                        case 6:
                            $scope.iterator.thiDepart6.push(v);
                            break;
                        case 7:
                            $scope.iterator.thiDepart7.push(v);
                            break;
                        case 8:
                            $scope.iterator.thiDepart8.push(v);
                            break;
                        case 9:
                            $scope.iterator.thiDepart9.push(v);
                            break;
                        case 10:
                            $scope.iterator.thiDepart10.push(v);
                            break;
                        case 11:
                            $scope.iterator.thiDepart11.push(v);
                            break;
                        case 12:
                            $scope.iterator.thiDepart12.push(v);
                            break;
                        case 13:
                            $scope.iterator.thiDepart13.push(v);
                            break;
                        case 14:
                            $scope.iterator.thiDepart14.push(v);
                            break;
                        case 15:
                            $scope.iterator.thiDepart15.push(v);
                            break;
                        case 16:
                            $scope.iterator.thiDepart16.push(v);
                            break;
                        case 17:
                            $scope.iterator.thiDepart17.push(v);
                            break;
                        case 18:
                            $scope.iterator.thiDepart18.push(v);
                            break;
                        case 19:
                            $scope.iterator.thiDepart19.push(v);
                            break;
                        case 20:
                            $scope.iterator.thiDepart20.push(v);
                            break;
                        case 21:
                            $scope.iterator.thiDepart21.push(v);
                            break;
                        case 22:
                            $scope.iterator.thiDepart22.push(v);
                            break;
                        case 23:
                            $scope.iterator.thiDepart23.push(v);
                            break;
                        case 24:
                            $scope.iterator.thiDepart24.push(v);
                            break;
                        case 25:
                            $scope.iterator.thiDepart25.push(v);
                            break;
                        case 26:
                            $scope.iterator.thiDepart26.push(v);
                            break;
                        case 27:
                            $scope.iterator.thiDepart27.push(v);
                            break;
                        case 28:
                            $scope.iterator.thiDepart28.push(v);
                            break;
                        case 29:
                            $scope.iterator.thiDepart29.push(v);
                            break;
                        case 30:
                            $scope.iterator.thiDepart30.push(v);
                            break;
                        case 31:
                            $scope.iterator.thiDepart31.push(v);
                            break;
                        case 32:
                            $scope.iterator.thiDepart32.push(v);
                            break;
                        case 33:
                            $scope.iterator.thiDepart33.push(v);
                            break;
                        case 34:
                            $scope.iterator.thiDepart34.push(v);
                            break;
                        case 35:
                            $scope.iterator.thiDepart35.push(v);
                            break;
                        case 36:
                            $scope.iterator.thiDepart36.push(v);
                            break;
                        case 37:
                            $scope.iterator.thiDepart37.push(v);
                            break;
                        case 38:
                            $scope.iterator.thiDepart38.push(v);
                            break;
                        case 39:
                            $scope.iterator.thiDepart39.push(v);
                            break;
                        case 40:
                            $scope.iterator.thiDepart40.push(v);
                            break;
                        case 41:
                            $scope.iterator.thiDepart41.push(v);
                            break;
                        case 42:
                            $scope.iterator.thiDepart42.push(v);
                            break;
                        case 43:
                            $scope.iterator.thiDepart43.push(v);
                            break;
                        case 44:
                            $scope.iterator.thiDepart44.push(v);
                            break;
                        case 45:
                            $scope.iterator.thiDepart45.push(v);
                            break;
                        case 46:
                            $scope.iterator.thiDepart46.push(v);
                            break;
                        case 47:
                            $scope.iterator.thiDepart47.push(v);
                            break;
                        case 48:
                            $scope.iterator.thiDepart48.push(v);
                            break;
                        case 49:
                            $scope.iterator.thiDepart49.push(v);
                            break;
                        case 50:
                            $scope.iterator.thiDepart50.push(v);
                            break;
                        case 51:
                            $scope.iterator.thiDepart51.push(v);
                            break;
                        case 52:
                            $scope.iterator.thiDepart52.push(v);
                            break;
                        case 53:
                            $scope.iterator.thiDepart53.push(v);
                            break;
                        case 54:
                            $scope.iterator.thiDepart54.push(v);
                            break;
                        case 55:
                            $scope.iterator.thiDepart55.push(v);
                            break;
                        case 56:
                            $scope.iterator.thiDepart56.push(v);
                            break;
                        case 57:
                            $scope.iterator.thiDepart57.push(v);
                            break;
                        case 58:
                            $scope.iterator.thiDepart58.push(v);
                            break;
                        case 59:
                            $scope.iterator.thiDepart59.push(v);
                            break;
                        case 60:
                            $scope.iterator.thiDepart60.push(v);
                            break;
                        case 61:
                            $scope.iterator.thiDepart61.push(v);
                            break;
                        case 62:
                            $scope.iterator.thiDepart62.push(v);
                            break;
                        case 63:
                            $scope.iterator.thiDepart63.push(v);
                            break;
                        case 64:
                            $scope.iterator.thiDepart64.push(v);
                            break;
                        case 65:
                            $scope.iterator.thiDepart65.push(v);
                            break;
                        case 66:
                            $scope.iterator.thiDepart66.push(v);
                            break;
                        case 67:
                            $scope.iterator.thiDepart67.push(v);
                            break;
                        case 68:
                            $scope.iterator.thiDepart68.push(v);
                            break;
                        case 69:
                            $scope.iterator.thiDepart69.push(v);
                            break;
                        case 70:
                            $scope.iterator.thiDepart70.push(v);
                            break;
                        case 71:
                            $scope.iterator.thiDepart71.push(v);
                            break;
                    }
                })
            }
            function iterator_4(list){
                $.each(list,function(i,v){
                    switch(parseInt(v.classify)){
                        case 1:
                            $scope.iterator.fourDepart1.push(v);
                            break;
                        case 2:
                            $scope.iterator.fourDepart2.push(v);
                            break;
                        case 3:
                            $scope.iterator.fourDepart3.push(v);
                            break;
                        case 4:
                            $scope.iterator.fourDepart4.push(v);
                            break;
                        case 5:
                            $scope.iterator.fourDepart5.push(v);
                            break;
                        case 6:
                            $scope.iterator.fourDepart6.push(v);
                            break;
                        case 7:
                            $scope.iterator.fourDepart7.push(v);
                            break;
                        case 8:
                            $scope.iterator.fourDepart8.push(v);
                            break;
                        case 9:
                            $scope.iterator.fourDepart9.push(v);
                            break;
                        case 10:
                            $scope.iterator.fourDepart10.push(v);
                            break;
                    }
                })
            }
            function iterator_5(list){
                $.each(list,function(i,v){
                    switch(parseInt(v.classify)){
                        case 1:
                            $scope.iterator.fifDepart1.push(v);
                            break;
                        case 2:
                            $scope.iterator.fifDepart2.push(v);
                            break;
                        case 3:
                            $scope.iterator.fifDepart3.push(v);
                            break;
                        case 4:
                            $scope.iterator.fifDepart4.push(v);
                            break;
                        case 5:
                            $scope.iterator.fifDepart5.push(v);
                            break;
                        case 6:
                            $scope.iterator.fifDepart6.push(v);
                            break;
                        case 7:
                            $scope.iterator.fifDepart7.push(v);
                            break;
                        case 8:
                            $scope.iterator.fifDepart8.push(v);
                            break;
                        case 9:
                            $scope.iterator.fifDepart9.push(v);
                            break;
                        case 10:
                            $scope.iterator.fifDepart10.push(v);
                            break;
                        case 11:
                            $scope.iterator.fifDepart11.push(v);
                            break;
                    }
                })
            }

            $http.get("/loocha/depart/personality").success(function(data,status){
                $scope.hope.personality_type1 =  data.response.pmap.type1;
                $scope.hope.personality_type2 =  data.response.pmap.type2;
                $scope.hope.personality_type3 =  data.response.pmap.type3;
                $scope.hope.personality_type4 =  data.response.pmap.type4;

                $scope.hope.personality_type1 = arraysort.sort($scope.hope.personality_type1);
                $scope.hope.personality_type2 = arraysort.sort($scope.hope.personality_type2);
                $scope.hope.personality_type3 = arraysort.sort($scope.hope.personality_type3);
                $scope.hope.personality_type4 = arraysort.sort($scope.hope.personality_type4);

                var physical =  arraysort.sort($scope.hope.personality_type2[2].sublist);
                $scope.hope.unEnglish[0] = $scope.hope.personality_type2[3];

                arrClassify($scope.hope.personality_type1,$scope.hope.classify_1,$scope.hope.classify_2);
                phyClassify(physical,$scope.hope.physical_1,$scope.hope.physical_2);
                function arrClassify(list,arr1,arr2){
                    $.each(list,function(i,v){
                        if(i<4){
                            arr1.push(v);
                        }else{
                            arr2.push(v);
                        }
                    });
                }
                function phyClassify(list,arr1,arr2){
                    $.each(list,function(i,v){
                        if(i<5){
                            arr1.push(v);
                        }else{
                            arr2.push(v);
                        }
                    });
                }
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
            $("#provnice .dropdown-menu,#panel-footer .dropdown-menu").hide();
            var that = $(e.target),alt = that.attr('alt'),ul = that.next();
            var istrue = ul.attr('data-istrue');
            //if(istrue == "false") {
            if (alt == 'city') {
                var city_id = that.attr('city_id');
                $http.get('/loocha/schbath/depart?cityId=' + city_id + '&type=' + $scope.hope.batch).success(function (data) {
                    //执行2次筛选
                    var list = data.response,sch_ignore = $scope.hope.school_ignore;

                    for(var i = 0;i<sch_ignore.length;i++){
                        for(var j = 0 ;j <list.length;j++){
                            if(sch_ignore[i] ==  list[j].s_id){
                                list.splice(list.indexOf(list[j]),1)
                            }
                        }
                    }
                    var html = [];
                    if (list != null) {
                        $.each(list, function (i, v) {
                            html.push('<li><a href="javascript:;;" school_id="'+ v.s_id+'" >' + v.name + '</a></li>');
                        });
                    } else {
                        html.push('<li><a href="javascript:;;">没有搜索到高校</a></li>');
                    }
                    ul.empty().append(html.join(''));
                });
                //ul.attr("data-istrue", "true");
            };
            //}
            ul.show();
        }

        /*类别*/
        $scope.atrlistClk = function(e){
            $("#panel-footer .dropdown-menu").hide();
            var isTrue = $('#attr1').attr('data-istrue');
            if(isTrue == "false"){
                $http.get('/loocha/school/prop?type=2&depart_type='+$scope.hope.batch).success(function(data,status){
                    $scope.hope.attr = data.response;
                    var html = [];
                    $.each($scope.hope.attr,function(i,v){
                        html.push('<li><a href="javascript:;;" class="findSchoolArt" attr_id="'+ v.id+'">'+ v.name+'</a></li>');
                    });
                    $("#attr1").append(html.join(''));
                    var _time = null;
                    $(".findSchoolArt").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), attr_id = that.attr('attr_id');
                        var list = $(".findSch[attr="+attr_id+"]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr);
                        $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status"), attr_id = that.attr('attr_id');
                            var list = $(".findSch[attr="+attr_id+"]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr,$scope.hope.schoolObj);
                            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
                        },400);
                    });
                });
                $('#attr1').attr("data-istrue","true");
            }
            $("#attr1").show();
        };

        /**
         * 类型
         * prop3 :985
         * prop4:211
         * prop7:C9
         * prop8:中外合作办
         * @param e
         */
        $scope.stylistClk = function(e){
            $("#panel-footer .dropdown-menu").hide();
            var isTrue = $('#style1').attr('data-istrue');
            if(isTrue == "false"){
                var html = [];
                $http.get('/loocha/school/prop/'+$scope.hope.batch).success(function(data,status){
                    $scope.hope.attr = data.response;
                    var html = [];
                    $.each($scope.hope.attr,function(i,v){
                        html.push('<li><a href="javascript:;;" class="findSchoolSty" prop_id="'+ v.id+'">'+ v.name+'</a></li>');
                    });
                    $("#style1").append(html.join(''));
                    var _time = null;
                    $(".findSchoolSty").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), prop_id = that.attr('prop_id'),id = 0;
                        if(prop_id == 20){
                            id=3;
                        }else if (prop_id == 21 ){
                            id=4;
                        }else if (prop_id == 0 ){
                            id=7;
                        }else if (prop_id == 24 ){
                            id=8;
                        }
                        var list = $(".findSch[prop"+id+"=1]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr);
                        $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status"), prop_id = that.attr('prop_id'),id = 0;
                            if(prop_id == 20){
                                id=3;
                            }else if (prop_id == 21 ){
                                id=4;
                            }else if (prop_id == 0 ){
                                id=7;
                            }else if (prop_id == 24 ){
                                id=8;
                            }
                            var list = $(".findSch[prop"+id+"=1]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr,$scope.hope.schoolObj);
                            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
                        },400);
                    });
                });
                $('#style1').attr("data-istrue","true");
            }
            $("#style1").show();
        };

        /*属性*/
        $scope.proplistClk = function(e){
            $("#panel-footer .dropdown-menu").hide();
            var isTrue = $('#prop1').attr('data-istrue');
            if(isTrue == "false"){
                var html = [];
                $http.get('/loocha/school/prop?type=0&depart_type='+$scope.hope.batch).success(function(data,status){
                    $scope.hope.attr = data.response;
                    var html = [];
                    $.each($scope.hope.attr,function(i,v){
                        html.push('<li><a href="javascript:;;"  class="findSchoolProp" style_id="'+ v.id+'">'+ v.name+'</a></li>');
                    });
                    $("#prop1").append(html.join(''));
                    var _time = null;
                    $(".findSchoolProp").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), style_id = that.attr('style_id');
                        var list = $(".findSch[style="+style_id+"]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr);
                        $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status"), style_id = that.attr('style_id');
                            var list = $(".findSch[style="+style_id+"]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr,$scope.hope.schoolObj);
                            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
                        },400);
                    });
                });
                $('#prop1').attr("data-istrue","true");
            }
            $("#prop1").show();
        };

        /*属管*/
        $scope.belongslistClk = function(e){
            $("#panel-footer .dropdown-menu").hide();
            var isTrue = $('#belongs1').attr('data-istrue');
            if(isTrue == "false"){
                var html = [];
                $http.get('/loocha/school/prop?type=1&depart_type=1').success(function(data,status){
                    $scope.hope.attr = data.response;
                    var html = [];
                    $.each($scope.hope.attr,function(i,v){
                        html.push('<li><a href="javascript:;;" class="findSchoolBel"  belongs_id="'+ v.id+'">'+ v.name+'</a></li>');
                    });
                    $("#belongs1").append(html.join(''));
                    var _time = null;
                    $(".findSchoolBel").unbind('dblclick').dblclick(function(e){
                        $timeout.cancel(_time);
                        var that = $(this), status = that.attr("status"), belongs_id = that.attr('belongs_id');
                        var list = $(".findSch[belongs="+belongs_id+"]");
                        var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr);
                        $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                        $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                        $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                        $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
                    }).unbind('click').click(function(e){
                        $timeout.cancel(_time);
                        var that = $(this);
                        _time= $timeout(function(e){
                            var status = that.attr("status"), belongs_id = that.attr('belongs_id');
                            var list = $(".findSch[belongs="+belongs_id+"]");
                            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr,$scope.hope.schoolObj);
                            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
                        },400);
                    });
                });
                $('#belongs1').attr("data-istrue","true");
            }
            $("#belongs1").show();
        };

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
        };

        $scope.showCharacter = function(id){
            $("#character .dropdown-menu").hide();
            $("#pills"+id).show();
        };

        /**
         * 院校属类 具体高校绑定单击事件
         * @param e
         */
        $scope.agreeSch = function(e){
            var that = $(e.target),status = that.attr('status'),school_id = that.attr('school_id');
            var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.school_prefer,$scope.hope.school_ignore,school_id,$scope.hope.school_name,that.html(),$scope.hope.schoolArr,$scope.hope.schoolObj);
            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /*
         * 院校属类 具体高校绑定双击击事件
         * */
        $scope.rejectSch = function(e){
            var that = $(e.target),status = that.attr('status'),school_id = that.attr('school_id');
            var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.school_prefer,$scope.hope.school_ignore,school_id,$scope.hope.school_name,that.html(),$scope.hope.schoolArr);
            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.schoolArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
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

        /**
         * 个性的单击事件
         * @param e
         */
        $scope.agreePersonality = function(e){
            var that = $(e.target),status = that.attr('status'),isClick = that.attr("operation"),s_id = that.attr('s_id');
            if(isClick == 1 || isClick == 3){
                var mosaic = classifyClk.agreenCityEvent(status,that,$scope.hope.personality_prefer,$scope.hope.personality_ignore,s_id,$scope.hope.personality_name,that.html(),$scope.hope.personalityArr,$scope.hope.personalityObj);
                $scope.hope.personality_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                $scope.hope.personality_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                $scope.hope.personality_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                $scope.hope.personalityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
            }
        };

        /**
         * 个性的双击事件
         * @param e
         */
        $scope.rejecPersonality = function(e) {
            var that = $(e.target),status = that.attr('status'),isClick = that.attr("operation"),s_id = that.attr('s_id');
            if(isClick == 2 || isClick == 3){
                var mosaic = classifyDBClk.rejectCityEvent(status,that,$scope.hope.personality_prefer,$scope.hope.personality_ignore,s_id,$scope.hope.personality_name,that.html(),$scope.hope.personalityArr);
                $scope.hope.personality_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
                $scope.hope.personality_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
                $scope.hope.personality_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
                $scope.hope.personalityArr = mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
            }
        };

        /**
         * 江苏省、一~六线城市单击
         * @param e
         */
        $scope.agreePro = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#provnice .wishId_"+id);
            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.city_prefer,$scope.hope.city_ignore,"city_id",$scope.hope.city_name,$scope.hope.cityArr,$scope.hope.cityObj);
            $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.cityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse( mosaic.split("-")[3].split(",")):[];
        };
        /**
         * 江苏省、一~六线城市双击
         * @param e
         */
        $scope.rejectPro = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#provnice .wishId_"+id);
            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.city_prefer,$scope.hope.city_ignore,"city_id",$scope.hope.city_name,$scope.hope.cityArr);
            $scope.hope.city_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.city_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.city_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.cityArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /**
         * 意向专业 热门专业、偏热专业、一般专业、偏冷专业、冷门专业单击
         * @param e
         */
        $scope.agreeDep = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#depart .wishId_"+id);
            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.depart_prefer,$scope.hope.depart_ignore,"depart_id",$scope.hope.depart_name,$scope.hope.departArr,$scope.hope.departObj);
            $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /**
         * 意向专业 热门专业、偏热专业、一般专业、偏冷专业、冷门专业双击
         * @param e
         */
        $scope.rejectDep = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#depart .wishId_"+id);
            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.depart_prefer,$scope.hope.depart_ignore,"depart_id",$scope.hope.depart_name,$scope.hope.departArr);
            $scope.hope.depart_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.depart_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.depart_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.departArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        /**
         * 意向专业 高分高校 、偏高高校、中分高校、偏低高校、低分高校单击
         * @param e
         */
        $scope.agreeSchl = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#panel-footer .wishId_"+id);
            var mosaic = classifyClk.agreenClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr,$scope.hope.schoolObj);
            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };
        /**
         * 意向专业 高分高校 、偏高高校、中分高校、偏低高校、低分高校双击
         * @param e
         */
        $scope.rejectSchl = function(e){
            var that = $(e.target),status = that.attr('status'),id=that.attr("wishid"),list = $("#panel-footer .wishId_"+id);
            var mosaic =classifyDBClk.rejectClsEvent(status,that,list,$scope.hope.school_prefer,$scope.hope.school_ignore,"school_id",$scope.hope.school_name,$scope.hope.schoolArr);
            $scope.hope.school_prefer = mosaic.split("-")[0].length > 0 ? mosaic.split("-")[0].split(","):[];
            $scope.hope.school_ignore = mosaic.split("-")[1].length > 0 ? mosaic.split("-")[1].split(","):[];
            $scope.hope.school_name = mosaic.split("-")[2].length > 0 ? mosaic.split("-")[2].split(","):[];
            $scope.hope.schoolArr =  mosaic.split("-")[3].length > 0 ? JSON.parse(mosaic.split("-")[3].split(",")):[];
        };

        $scope.reqOrder = function(){
            $('#myModal').modal('show');
        };

        $scope.readom = function(){
            $('#modal-pay').modal('show');
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
            //TODO 支付，
            alert('查看： 我的足迹-》意向参考表');
            /*TODO 提交完 根据订单ID 获取订单信息*/
            //$http.get('/loocha/exam/'+111).success(function(dadta){
            //    /*TODO代用支付接口 查看支付金额*/
            //});
            //$window.open('#/pay');
        };

        $scope.manual = function(){

            var projectSoft = [];
            $.each($scope.finshparam.project,function(i,v){
                if(v == 1){//高校
                    projectSoft[0] = i+1;
                }else if(v == 2){ //专业
                    projectSoft[1] = i+1;
                }else if (v  == 3){//城市
                    projectSoft[2] = i+1;
                }else{
                    projectSoft[3] = i+1;
                }
            });
            var param = {};
            param.sprop_prefer = [];  //优先院校属类id列表
            param.sprop_ignore = [];  //拒绝院校属类id列表
            param.school_prefer = $scope.hope.school_prefer; //优先院校id列表
            param.school_ignore = $scope.hope.school_ignore; //拒绝院校id列表
            param.city_prefer = $scope.hope.city_prefer;   //优先城市id列表
            param.city_ignore = $scope.hope.city_ignore;    //拒绝城市id列表
            param.dproptype_prefer = [];   //优先专业类别id列表
            param.dproptype_ignore = [];    //拒绝专业类别id列表
            param.dprop_prefer = $scope.hope.depart_prefer;   //优先专业id列表
            param.dprop_ignore = $scope.hope.depart_ignore;   //拒绝专业id列表
            param.pproptype_prefer = [];   //优先个性类别id列表
            param.pproptype_ignore = [];   //拒绝个性类别id列表
            param.pprop_prefer = [];   //优先个性id列表
            param.pprop_ignore = [];   //拒绝个性id列表
            param.prefer_order = projectSoft;   //志愿意向排序 学校、专业、城市、个性
            param.school_order = $scope.finshparam.school_prefer;   //高校优先id列表
            param.depart_order = $scope.finshparam.city_prefer;   //专业优先id列表
            param.city_order = $scope.finshparam.depart_prefer;     //城市优先id列表
            param.personality_order = $scope.finshparam.personality_prefer;  //个性满足优先id列表
            var tramsform = function(data){
                return $.param(data);
            };

            $http.post("/loocha/exam/intention",param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(responseDate){
                console.log('提交成功');
                $window.open('#/refer1');
                $(".modal-backdrop").remove();
                $(".modal-open").removeClass('modal-open');
            });
        };
        $scope.showLanguage = function(){
            $("#langueList").show();
        };

        $scope.findLanguage = function(e){
            var that = $(e.target),status = that.attr('status'), html=that.html(),parentId = that.attr("parentId"),s_id = that.attr('s_id');
            $("#languageShow").html(html).attr({parentId:parentId,s_id:s_id});
            $scope.hope.langue=s_id;
            $scope.hope.languename=html;
            $scope.hope.langueArr[0]={"id":s_id,"name":html};
        };

        $scope.changeSelection = function(idx,num){
            if(num == 1){
                $scope.finshparam.project[1]="";
                $scope.finshparam.project[2]="";
                $scope.finshparam.project[3]="";
                $.each($scope.coverage,function(i,v){
                    v.disabled = false;
                });
            }else if(num == 2){
                $scope.finshparam.project[2]="";
                $scope.finshparam.project[3]="";
                $.each($scope.coverage,function(i,v){
                    if(v.id!=$scope.finshparam.project[0]){
                        v.disabled = false;
                    }
                });
            }else if(num == 3){
                $.each($scope.coverage,function(i,v){
                    if(v.disabled == false && $scope.coverage[idx-1].id != v.id){
                        $scope.finshparam.project[3]= v.id+"";
                    }
                });
            }
            $scope.coverage[idx-1].disabled = true;
        };

        $scope.$watch('hope.langue',function(newValue,oldValue){
            arrPush()
        });

        $scope.$watch('hope.personality_prefer',function(newValue,oldValue){
            arrPush()
        });

        function arrPush(){
            var personalitylist = [];
            $scope.hope.personalitylist = personalitylist.concat($scope.hope.langueArr,$scope.hope.personalityArr);
        }

    }]);
});