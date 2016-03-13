/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'],function(app){
    app.controller('chanceCtr',['$scope','$http','$sce','$timeout','getLoginUserInfo',function($scope,$http,$sce,$timeout,getLoginUserInfo){
        $scope.score = "";
        $scope.isShow = false;
        //TODO 批次
        $scope.isChance = 1;
        $scope.chance = [
            {
                id: 125,
                name: "南京工业大学"
            }, {
                id: 122,
                name: "东南大学"
            }, {
                id: 136,
                name: "南京财经大学"
            }
        ];
        $scope.school = {
            chanceSch:"",
            provinceSch:"",
            propSch:"",
            name:"",
            deparlist:"",
            deparName:"",
            departInfo:"",
        }
        $scope.schoolInfo ={
            name:"",
            is_211:"",
            is_985:"",
            art_sel_1:"",
            art_sel_2:"",
            sci_sel_1:"",
            sci_sel_2:"",
            attr_name:"",
            belongs_name:"",
            city_name:"",
            website:"",
            article_id:"",
            art_score2:"",
            art_score3:"",
            art_score4:"",
            sci_score2:"",
            sci_score3:"",
            sci_score4:"",
            artST2012:"",
            artST2013:"",
            artST2014:"",
            sciST2012:"",
            sciST2013:"",
            sciST2014:"",
            article_content:"",
        }
        init();

        /**
         * 概率--点击高校名称查询高校信息
         * TODO 没法确认文科还是理科 【等级、计划数、录取没法确认】
         * @param e
         */
        $scope.showChanceSchInfo = function(e){
            var that = $(e.target),key = that.html();
            $http.get("/loocha/school/byname?type="+$scope.isChance+"&key="+key).success(function(data){
                $scope.schoolInfo = data.response.list[0];
                if($scope.schoolInfo.article_id>0){
                    $http.get("/loocha/article/"+$scope.schoolInfo.article_id).success(function(data){
                        $scope.schoolInfo.article_content = $sce.trustAsHtml(data.response.content);
                        $("#mask-school").fadeIn(500);
                    });
                }
            });
        };

        $scope.changePay = function(){
            $scope.isShow = true;
        };

        function init(){
            getLoginUserInfo.isLogoin();

            if(getLoginUserInfo.isUScore() == null || getLoginUserInfo.isUScore() == ""){
                alert('亲，您还没有输入成绩，或没有使用成绩！请点击‘开始使用’');
                window.location.href = "all.score";
                window.location.reload();
            }

            $('.dropdown-toggle').dropdown();

            /**
             * 按概率范围预测高校录取概率
             */
            $("#chanceType li").unbind('click').click(function(e){
                var _this = $(e.target),param = _this.data('param');
                $("#chanceText").html(_this.html());
                $("#chanceBody").fadeIn(500);
                //TODO 请求高校
            });

            /**
             * 按院校属地预测高校录取概率
             */
            $("#provinceType li").unbind('click').click(function(e){
                var _this = $(e.target),param = _this.data('param');
                $("#proName").attr("city_id",param).html(_this.html()+'<span class="caret" city_id="'+param+'"></span>');
                $("#provinceBody").fadeIn(500);
                $("#proName").attr('istrue','0');
            });
            /**
             * 加载院校属地的具体内容
             * @param e
             */
            $scope.findCity = function(e){
                var that = $(e.target),city_id = that.attr('city_id'),istrue= that.attr('istrue');
                if(istrue == undefined || istrue == 0){
                    $http.get('/loocha/wish/bytype?batch='+$scope.isChance+'&wish_id='+city_id).success(function(data){
                        var html = [];
                        $.each(data.response,function(i,v){
                            html.push('<li><a href="javascript:;;" city_id="'+ v.city_id+'">'+ v.name+'</a></li>');
                        });
                        $("#proList").empty().prepend(html.join(''));
                        that.attr('istrue','1');
                    });
                }
            };

            /**
             * 请求高校 TODO
             */
            $("#proList").unbind('click').click(function(e){

            });

            $("#propType li").unbind('click').click(function(e){
                var _this = $(e.target),param = _this.data('param');
                $("#propName").attr("prop_id",param).html(_this.html()+'<span class="caret" city_id="'+param+'"></span>');
                $("#propNav").fadeIn(500);
                $("#propName").attr('istrue','0');
            });

            /**
             * prop_id :0(属性)、1(属管)、2(类别)、3(类型)
             * @param e
             */
            $scope.findProSch = function(e){
                var that = $(e.target),prop_id = that.attr('prop_id'),istrue= that.attr('istrue');
                if(istrue == undefined || istrue == 0){
                    var url = "";
                    if(prop_id == 0){
                        url="/loocha/school/prop?type=0&depart_type="+$scope.isChance;
                    }else if(prop_id == 1){
                        url="/loocha/school/prop?type=1&depart_type=1";
                    }else if(prop_id == 2){
                        url="/loocha/school/prop?type=2&depart_type="+$scope.isChance;
                    }else if(prop_id == 3){
                        url="/loocha/school/prop/"+$scope.isChance;
                    }
                    $http.get(url).success(function(data){
                        var html = [];
                        $.each(data.response,function(i,v){
                            html.push('<li><a href="javascript:;;" prop_id="'+ v.id+'">'+ v.name+'</a></li>');
                        });
                        $("#propList").empty().prepend(html.join(''));
                        that.attr('istrue','1');
                    });
                }
            };

            $("#propList li").unbind('click').click(function(e){
                debugger;
            });

            //if(localStorage.getItem("score")!=null){
            //    $.each(JSON.parse(localStorage.getItem("score")), function (idx, val) {
            //        if (val.state == 1) {
            //            $scope.score = val;
            //            //TODO 请求一次推荐信息
            //            $scope.recommShow = true;
            //        }
            //    });
            //}
        };

        $(".close").unbind('click').click(function(e){
            $("#mask-school,#mask-depart").fadeOut(800);
        });

        var _time = null;
        $scope.findDepart = function(e){
            console.log(e.keyCode);
            if(e.keyCode == 229){
                $timeout.cancel(_time);
                _time = $timeout(function(e){
                    $http.get("/loocha/departlist?type="+$scope.isChance+"&name="+$scope.school.name+"&index=0&limit=999").success(function(data){
                        $scope.school.deparlist = data.response.list;
                    });
                },500);
            }
        };

        $scope.findDepartInfo = function(e){
            var that = $(e.target),depart_id = that.attr("depart_id");
            $http.get("/loocha/depart/by?depart_id="+depart_id).success(function(data){
                var article_id = data.response.article_id;
                if(article_id>0){
                    $http.get("/loocha/article/show/"+article_id).success(function(data){
                        $scope.school.departInfo = $sce.trustAsHtml(data);
                        $("#mask-depart").fadeIn(800);
                    });
                }
            });


        };
    }]);
});