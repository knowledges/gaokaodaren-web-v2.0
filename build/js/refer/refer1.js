/**
 * Created by qbl on 2016/2/1.
 */
require(['app'], function (app) {
    app.controller('referCtr1', ['$rootScope','$scope', '$http', '$stateParams','$window','$timeout','loocha','getLoginUserInfo', function ($rootScope,$scope, $http, $stateParams,$window,$timeout,loocha,getLoginUserInfo) {

        $scope.info = {
            type:"",
            title: "",
            subtitle: "",
            model: "",
        };

        $scope.num = "";

        $scope.param = {
            firSchName: "",
            firDepart_1: "",
            firDepart_2: "",
            firDepart_3: "",
            firDepart_4: "",
            firDepart_5: "",
            firDepart_6: "",
            senSchName: "",
            senDepart_1: "",
            senDepart_2: "",
            senDepart_3: "",
            senDepart_4: "",
            senDepart_5: "",
            senDepart_6: "",
            thiSchName: "",
            thiDepart_1: "",
            thiDepart_2: "",
            thiDepart_3: "",
            thiDepart_4: "",
            thiDepart_5: "",
            thiDepart_6: "",
            fourSchName: "",
            fourDepart_1: "",
            fourDepart_2: "",
            fourDepart_3: "",
            fourDepart_4: "",
            fourDepart_5: "",
            fourDepart_6: "",
            fifthSchName: "",
            fifthDepart_1: "",
            fifthDepart_2: "",
            fifthDepart_3: "",
            fifthDepart_4: "",
            fifthDepart_5: "",
            fifthDepart_6: "",
        };

        $scope.money = "";
        $scope.order_id = "";
        $scope.sub = {
            a: [],
            b: [],
            c: [],
            d: [],
            e: [],
            id: ""
        };

        $scope.persons = [];

        init();

        function init() {
            /* getLoginUserInfo.isLogoin();*/

            var _times = $timeout(function(){
                $timeout.cancel(_times);
                var times = new Date().getTime().toString();
                $http.get(loocha+"/exam/intention?out_trade_no="+localStorage.getItem("out_trade_no")+"&t="+times,{cache:false})
                    .success(function(data){
                        if (data.status == 4){
                            alert('您还没有登陆，先去登陆吧！');
                            window.location.href = "#/login";
                            return;
                        }else if (data.status == 0){
                            var manualInfo = data.response;
                            $scope.persons = manualInfo.schools;
                            $scope.sub.id = manualInfo.id;
                            $scope.info.type = manualInfo.type;

                            var type = $scope.info.type;
                            switch (parseInt(type)) {
                                case 1:
                                    $scope.info.title = "文科本一考生志自选表";
                                    $scope.info.subtitle = "【第一阶段填报文科类第一批本科院校自选表】";
                                    break;
                                case 2:
                                    $scope.info.title = "理科本一考生志自选表";
                                    $scope.info.subtitle = "【第一阶段填报理科类第一批本科院校自选表】";
                                    break;
                                case 3:
                                    $scope.info.title = "文科本二考生志自选表";
                                    $scope.info.subtitle = "【第一阶段填报文科类第二批本科院校自选表】";
                                    break;
                                case 4:
                                    $scope.info.title = "理科本二考生志自选表";
                                    $scope.info.subtitle = "【第一阶段填报理科类第二批本科院校自选表】";
                                    break;
                                case 5:
                                    $scope.info.title = "文科本三考生志自选表";
                                    $scope.info.subtitle = "【第二阶段填报文科类第三批本科院校自选表】";
                                    break;
                                case 6:
                                    $scope.info.title = "理科本三考生志自选表";
                                    $scope.info.subtitle = "【第二阶段填报理科类第三批本科院校自选表】";
                                    break;
                                case 7:
                                    $scope.info.title = "文科高职(专科)考生志自选表";
                                    $scope.info.subtitle = "【第二阶段填报文科类高职（专科）院校自选表】";
                                    break;
                                case 8:
                                    $scope.info.title = "理科高职(专科)考生志自选表";
                                    $scope.info.subtitle = "【第二阶段填报理科类高职（专科）院校自选表】";
                                    break;
                            }

                        }

                        $rootScope.loading = false;
                    });
            });
        }

        $scope.showModel = function (idx) {
            //var url ="/loocha/web/new/JSON/json.json";
            window.location.hash = window.location.hash.substr(0, 8) + "/select=" + idx;
            $("#myModal").show();
            if (idx == 1) {
                $scope.num = 'A';
            } else if (idx == 2) {
                $scope.num = 'B';
            } else if(idx == 3){
                $scope.num = 'C';
            } else if(idx == 4){
                $scope.num = 'D';
            } else if(idx == 5){
                $scope.num = 'E';
            }
        };

        $scope.setUpSch = function (e, num) {
            var that = $(e.target), sid = that.attr('sid'), name = that.attr('name'),unique_id = that.attr("unique_id");
            var select = window.location.hash.split('#/refer1/select=')[1];
            $(".depart_" + select).attr("school_id", sid);
            if (select == 1) {
                $scope.param.firSchName = $scope.info.model = "【"+unique_id+"】"+name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName.split("】")[1] && v.name != $scope.param.senSchName.split("】")[1] && v.name != $scope.param.thiSchName.split("】")[1] && v.name != $scope.param.fourSchName.split("】")[1]) {
                        v.disabled = false;
                    }
                });
            } else if (select == 2) {
                $scope.param.senSchName = $scope.info.model = "【"+unique_id+"】"+name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName.split("】")[1] && v.name != $scope.param.senSchName.split("】")[1] && v.name != $scope.param.thiSchName.split("】")[1] && v.name != $scope.param.fourSchName.split("】")[1]) {
                        v.disabled = false;
                    }
                });
            } else if (select == 3) {
                $scope.param.thiSchName = $scope.info.model ="【"+unique_id+"】"+name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName.split("】")[1] && v.name != $scope.param.senSchName.split("】")[1] && v.name != $scope.param.thiSchName.split("】")[1] && v.name != $scope.param.fourSchName.split("】")[1]) {
                        v.disabled = false;
                    }
                });
            }else if (select == 4) {
                $scope.param.fourSchName = $scope.info.model = "【"+unique_id+"】"+name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName.split("】")[1] && v.name != $scope.param.senSchName.split("】")[1] && v.name != $scope.param.thiSchName.split("】")[1] && v.name != $scope.param.fourSchName.split("】")[1]) {
                        v.disabled = false;
                    }
                });
            }else if (select == 5) {
                $scope.param.fifthSchName = $scope.info.model = "【"+unique_id+"】"+name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName.split("】")[1] && v.name != $scope.param.senSchName.split("】")[1] && v.name != $scope.param.thiSchName.split("】")[1] && v.name != $scope.param.fourSchName.split("】")[1]) {
                        v.disabled = false;
                    }
                });
            }
            $scope.persons[num - 1].disabled = true;
            $("#myModal").hide();
            window.location.hash = window.location.hash.substr(0, 8) + "";
        };

        $scope.unSetUpSch = function (e, num) {
            var that = $(e.target),school_name = that.attr("name");
            $scope.persons[num - 1].disabled = false;
            var list = $scope.persons[num - 1].departs;
            $.each(list, function (i, v) {
                v.disabled = false;
            });
            if($scope.param.firSchName!=undefined && $scope.param.firSchName.indexOf(school_name)>0){
                $scope.param.firSchName ="";
                $scope.param.firDepart_1= "";
                $scope.param.firDepart_2= "";
                $scope.param.firDepart_3= "";
                $scope.param.firDepart_4="";
                $scope.param.firDepart_5="";
                $scope.param.firDepart_6="";
            }
            if($scope.param.senSchName!=undefined && $scope.param.senSchName.indexOf(school_name)>0){
                $scope.param.senSchName="";
                $scope.param.senDepart_1= "";
                $scope.param.senDepart_2= "";
                $scope.param.senDepart_3= "";
                $scope.param.senDepart_4= "";
                $scope.param.senDepart_5= "";
                $scope.param.senDepart_6= "";
            }
            if($scope.param.thiSchName!=undefined && $scope.param.thiSchName.indexOf(school_name)>0){
                $scope.param.thiSchName="";
                $scope.param.thiDepart_1= "";
                $scope.param.thiDepart_2= "";
                $scope.param.thiDepart_3= "";
                $scope.param.thiDepart_4= "";
                $scope.param.thiDepart_5= "";
                $scope.param.thiDepart_6= "";
            }
            if($scope.param.fourSchName!=undefined && $scope.param.fourSchName.indexOf(school_name)>0){
                $scope.param.fourSchName="";
                $scope.param.fourDepart_1= "";
                $scope.param.fourDepart_2= "";
                $scope.param.fourDepart_3= "";
                $scope.param.fourDepart_4= "";
                $scope.param.fourDepart_5= "";
                $scope.param.fourDepart_6= "";
            }
            if($scope.param.fifthSchName!=undefined && $scope.param.fifthSchName.indexOf(school_name)>0){
                $scope.param.fifthSchName="";
                $scope.param.fifthDepart_1="";
                $scope.param.fifthDepart_2="";
                $scope.param.fifthDepart_3="";
                $scope.param.fifthDepart_4="";
                $scope.param.fifthDepart_5="";
                $scope.param.fifthDepart_6="";
            }
        }

        $scope.sch_close = function () {
            $("#myModal,#zyb_marjor").hide();
            window.location.hash = window.location.hash.substr(0, 8) + "";
        }

        $scope.showMarjor = function (e) {
            var that = $(e.target), volunteer = that.attr('hope'), marjor_id = that.attr('marjor');
            window.location.hash = window.location.hash.substr(0, 8) + "/marjor_id=" + marjor_id;
            if (volunteer == 1) {
                $scope.info.model = $scope.param.firSchName.split("】")[1];
                $scope.num = "A";
            } else if (volunteer == 2) {
                $scope.info.model = $scope.param.senSchName.split("】")[1];
                $scope.num = "B";
            } else if (volunteer == 3)  {
                $scope.info.model = $scope.param.thiSchName.split("】")[1];
                $scope.num = "C";
            } else if (volunteer == 4)  {
                $scope.info.model = $scope.param.fourSchName.split("】")[1];
                $scope.num = "D";
            } else if (volunteer == 5)  {
                $scope.info.model = $scope.param.fifthSchName.split("】")[1];
                $scope.num = "E";
            }
            $("#zyb_marjor").show();
        };

        $scope.setUpMar = function (e, num) {
            var that = $(e.target), volunteer = that.attr('hope'), did = that.attr('did'), name = that.attr('name');
            var marjor_id = parseInt(window.location.hash.split('#/refer1/marjor_id=')[1]);
            if (volunteer == "A") {
                switch (marjor_id) {
                    case 1:
                        $scope.param.firDepart_1 = name;
                        break;
                    case 2:
                        $scope.param.firDepart_2 = name;
                        break;
                    case 3:
                        $scope.param.firDepart_3 = name;
                        break;
                    case 4:
                        $scope.param.firDepart_4 = name;
                        break;
                    case 5:
                        $scope.param.firDepart_5 = name;
                        break;
                    case 6:
                        $scope.param.firDepart_6 = name;
                        break;
                }
            } else if (volunteer == "B") {
                switch (marjor_id) {
                    case 1:
                        $scope.param.senDepart_1 = name;
                        break;
                    case 2:
                        $scope.param.senDepart_2 = name;
                        break;
                    case 3:
                        $scope.param.senDepart_3 = name;
                        break;
                    case 4:
                        $scope.param.senDepart_4 = name;
                        break;
                    case 5:
                        $scope.param.senDepart_5 = name;
                        break;
                    case 6:
                        $scope.param.senDepart_6 = name;
                        break;
                }
            } else if (volunteer == "C") {
                switch (marjor_id) {
                    case 1:
                        $scope.param.thiDepart_1 = name;
                        break;
                    case 2:
                        $scope.param.thiDepart_2 = name;
                        break;
                    case 3:
                        $scope.param.thiDepart_3 = name;
                        break;
                    case 4:
                        $scope.param.thiDepart_4 = name;
                        break;
                    case 5:
                        $scope.param.thiDepart_5 = name;
                        break;
                    case 6:
                        $scope.param.thiDepart_6 = name;
                        break;
                }
            }else if (volunteer == "D") {
                switch (marjor_id) {
                    case 1:
                        $scope.param.fourDepart_1 = name;
                        break;
                    case 2:
                        $scope.param.fourDepart_2 = name;
                        break;
                    case 3:
                        $scope.param.fourDepart_3 = name;
                        break;
                    case 4:
                        $scope.param.fourDepart_4 = name;
                        break;
                    case 5:
                        $scope.param.fourDepart_5 = name;
                        break;
                    case 6:
                        $scope.param.fourDepart_6 = name;
                        break;
                }
            }else if (volunteer == "E") {
                switch (marjor_id) {
                    case 1:
                        $scope.param.fifthDepart_1 = name;
                        break;
                    case 2:
                        $scope.param.fifthDepart_2 = name;
                        break;
                    case 3:
                        $scope.param.fifthDepart_3 = name;
                        break;
                    case 4:
                        $scope.param.fifthDepart_4 = name;
                        break;
                    case 5:
                        $scope.param.fifthDepart_5 = name;
                        break;
                    case 6:
                        $scope.param.fifthDepart_6 = name;
                        break;
                }
            }

            $.each($scope.persons, function (i, v) {
                if (volunteer == 'A') {
                    if (v.name == $scope.param.firSchName.split("】")[1]) {
                        departSet(v, num, $scope.sub.a);
                    }
                } else if (volunteer == 'B') {
                    if (v.name == $scope.param.senSchName.split("】")[1]) {
                        departSet(v, num, $scope.sub.b);
                    }
                } else if (volunteer == 'C') {
                    if (v.name == $scope.param.thiSchName.split("】")[1]) {
                        departSet(v, num, $scope.sub.c);
                    }
                } else if (volunteer == 'D') {
                    if (v.name == $scope.param.fourSchName.split("】")[1]) {
                        departSet(v, num, $scope.sub.d);
                    }
                } else if (volunteer == 'E') {
                    if (v.name == $scope.param.fifthSchName.split("】")[1]) {
                        departSet(v, num, $scope.sub.e);
                    }
                }
            });

            function departSet(v, num, array) {
                if (marjor_id == 1) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[1] = v.departs[num - 1].sdid;
                } else if (marjor_id == 2) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[2] = v.departs[num - 1].sdid;
                } else if (marjor_id == 3) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[3] = v.departs[num - 1].sdid;
                } else if (marjor_id == 4) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[4] = v.departs[num - 1].sdid;
                } else if (marjor_id == 5) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[5] = v.departs[num - 1].sdid;
                } else {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5
                            && c_v.name != $scope.param.fourDepart_1 && c_v.name != $scope.param.fourDepart_2 && c_v.name != $scope.param.fourDepart_3 && c_v.name != $scope.param.fourDepart_4 && c_v.name != $scope.param.fourDepart_5
                            && c_v.name != $scope.param.fifthDepart_1 && c_v.name != $scope.param.fifthDepart_2 && c_v.name != $scope.param.fifthDepart_3 && c_v.name != $scope.param.fifthDepart_4 && c_v.name != $scope.param.fifthDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[6] = v.departs[num - 1].sdid;
                }
                v.departs[num - 1].disabled = true;
                $("#zyb_marjor").hide();
                window.location.hash = window.location.hash.substr(0, 8) + "";
            }
        };

        $scope.unSetUpMar = function (e, num,param) {
            param.disabled = false;
            var that = $(e.target),hope = that.attr("hope"),name = that.attr("name");
            if(hope == "A"){
                if($scope.param.firDepart_1.indexOf(name)>=0){
                    $scope.param.firDepart_1="";
                }
                if($scope.param.firDepart_2.indexOf(name)>=0){
                    $scope.param.firDepart_2="";
                }
                if($scope.param.firDepart_3.indexOf(name)>=0){
                    $scope.param.firDepart_3="";
                }
                if($scope.param.firDepart_4.indexOf(name)>=0){
                    $scope.param.firDepart_4="";
                }
                if($scope.param.firDepart_5.indexOf(name)>=0){
                    $scope.param.firDepart_5="";
                }
                if($scope.param.firDepart_6.indexOf(name)>=0){
                    $scope.param.firDepart_6="";
                }
            }else if(hope == "B"){
                if($scope.param.senDepart_1.indexOf(name)>=0){
                    $scope.param.senDepart_1="";
                }
                if($scope.param.senDepart_2.indexOf(name)>=0){
                    $scope.param.senDepart_2="";
                }
                if($scope.param.senDepart_3.indexOf(name)>=0){
                    $scope.param.senDepart_3="";
                }
                if($scope.param.senDepart_4.indexOf(name)>=0){
                    $scope.param.senDepart_4="";
                }
                if($scope.param.senDepart_5.indexOf(name)>=0){
                    $scope.param.senDepart_5="";
                }
                if($scope.param.senDepart_6.indexOf(name)>=0){
                    $scope.param.senDepart_6="";
                }
            }else if(hope == "C"){
                if($scope.param.thiDepart_1.indexOf(name)>=0){
                    $scope.param.thiDepart_1="";
                }
                if($scope.param.thiDepart_2.indexOf(name)>=0){
                    $scope.param.thiDepart_2="";
                }
                if($scope.param.thiDepart_3.indexOf(name)>=0){
                    $scope.param.thiDepart_3="";
                }
                if($scope.param.thiDepart_4.indexOf(name)>=0){
                    $scope.param.thiDepart_4="";
                }
                if($scope.param.thiDepart_5.indexOf(name)>=0){
                    $scope.param.thiDepart_5="";
                }
                if($scope.param.thiDepart_6.indexOf(name)>=0){
                    $scope.param.thiDepart_6="";
                }
            }else if(hope == "D"){
                if($scope.param.fourDepart_1.indexOf(name)>=0){
                    $scope.param.fourDepart_1="";
                }
                if($scope.param.fourDepart_2.indexOf(name)>=0){
                    $scope.param.fourDepart_2="";
                }
                if($scope.param.fourDepart_3.indexOf(name)>=0){
                    $scope.param.fourDepart_3="";
                }
                if($scope.param.fourDepart_4.indexOf(name)>=0){
                    $scope.param.fourDepart_4="";
                }
                if($scope.param.fourDepart_5.indexOf(name)>=0){
                    $scope.param.fourDepart_5="";
                }
                if($scope.param.fourDepart_6.indexOf(name)>=0){
                    $scope.param.fourDepart_6="";
                }
            }else if(hope == "E"){
                if($scope.param.fifthDepart_1.indexOf(name)>=0){
                    $scope.param.fifthDepart_1="";
                }
                if($scope.param.fifthDepart_2.indexOf(name)>=0){
                    $scope.param.fifthDepart_2="";
                }
                if($scope.param.fifthDepart_3.indexOf(name)>=0){
                    $scope.param.fifthDepart_3="";
                }
                if($scope.param.fifthDepart_4.indexOf(name)>=0){
                    $scope.param.fifthDepart_4="";
                }
                if($scope.param.fifthDepart_5.indexOf(name)>=0){
                    $scope.param.fifthDepart_5="";
                }
                if($scope.param.fifthDepart_6.indexOf(name)>=0){
                    $scope.param.fifthDepart_6="";
                }
            }
        };


        $scope.reqOrder = function () {
            //getLoginUserInfo.isLogoin();

            $scope.sub.a[0] = $scope.sub.b[0] = $scope.sub.c[0] = $scope.sub.d[0] = $scope.sub.e[0] = 0;
            var param = {};
            param.out_trade_no = localStorage.getItem("out_trade_no");
            param.a = $scope.sub.a;
            param.b = $scope.sub.b;
            param.c = $scope.sub.c;
            param.d = $scope.sub.d;
            param.e = $scope.sub.e;

            var tramsform = function (data) {
                return $.param(data);
            };
            var _times = null;
            _times = $timeout(function(){
                $timeout.cancel(_times);
                var times = new Date().getTime().toString();
                $http.post(loocha+"/exam/intention/manual/save?t="+ times, param, {
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: tramsform
                }).success(function (data) {
                    if(data.status == 3){
                        alert("已提交");
                    }else if(data.status == 0){
                        $window.location.href = "#/refer?orderId="+localStorage.getItem('out_trade_no')+"&type="+localStorage.getItem('type')+"&flag="+3;
                        //$window.location.reload(0);
                    }else if (data.status == 4){
                        alert('您还没有登陆，先去登陆吧！');
                        window.location.href = "#/login";
                    }
                })
            });
        };

        $scope.pay = function(){
            openwin('#/pay?order_id='+$scope.order_id+'&money='+$scope.money+'&type='+localStorage.getItem("type"));
            $('#zyb_random').modal('hide');
            $("#tip").modal('show');
        };

        $scope.isPay = function(){
            $http.get(loocha+'/exam/order/info?out_trade_no='+$scope.order_id)
                .success(function(data){
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

    }]);
});