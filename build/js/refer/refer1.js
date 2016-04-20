/**
 * Created by qbl on 2016/2/1.
 */
require(['app'], function (app) {
    app.controller('referCtr', ['$scope', '$http', '$stateParams','loocha','getLoginUserInfo', function ($scope, $http, $stateParams,loocha,getLoginUserInfo) {

        $scope.info = {
            title: "",
            subtitle: "",
            model: ""
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
        };

        $scope.money = "";
        $scope.order_id = "";
        $scope.sub = {
            a: [],
            b: [],
            c: [],
            id: ""
        };

        $scope.persons = [];

        init();

        function init() {
            getLoginUserInfo.isLogoin();

            setInterval(function(){
                getLoginUserInfo.isLogoin();
            },600000);

            var type = localStorage.getItem('type') == null ? 1 : localStorage.getItem('type');
            var manualInfo = JSON.parse(localStorage.getItem("manualInfo"));
            $scope.persons = manualInfo.schools;
            $scope.sub.id = manualInfo.id;
            switch (parseInt(type)) {
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
        }

        $scope.showModel = function (idx) {
            //var url ="/loocha/web/new/JSON/json.json";
            window.location.hash = window.location.hash.substr(0, 8) + "/select=" + idx;
            $("#myModal").show();
            if (idx == 1) {
                $scope.num = 'A';
            } else if (idx == 2) {
                $scope.num = 'B';
            } else {
                $scope.num = 'C';
            }
        };

        $scope.setUpSch = function (e, num) {
            var that = $(e.target), sid = that.attr('sid'), name = that.attr('name');
            var select = window.location.hash.split('#/refer1/select=')[1];
            $(".depart_" + select).attr("school_id", sid);
            if (select == 1) {
                $scope.param.firSchName = $scope.info.model = name;
                $.each($scope.persons, function (i, v) {
                    v.disabled = false;
                });
            } else if (select == 2) {
                $scope.param.senSchName = $scope.info.model = name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName) {
                        v.disabled = false;
                    }
                });
            } else {
                $scope.param.thiSchName = $scope.info.model = name;
                $.each($scope.persons, function (i, v) {
                    if (v.name != $scope.param.firSchName && v.name != $scope.param.senSchName) {
                        v.disabled = false;
                    }
                });
            }
            $scope.persons[num - 1].disabled = true;
        };

        $scope.unSetUp = function (e, num) {
            $scope.persons[num - 1].disabled = false;
        }

        $scope.sch_close = function () {
            $("#myModal").hide();
            window.location.hash = window.location.hash.substr(0, 8) + "";
        }

        $scope.showMarjor = function (e) {
            var that = $(e.target), volunteer = that.attr('hope'), marjor_id = that.attr('marjor');
            window.location.hash = window.location.hash.substr(0, 8) + "/marjor_id=" + marjor_id;
            if (volunteer == 1) {
                $scope.info.model = $scope.param.firSchName;
                $scope.num = "A";
            } else if (volunteer == 2) {
                $scope.info.model = $scope.param.senSchName;
                $scope.num = "B";
            } else {
                $scope.info.model = $scope.param.thiSchName;
                $scope.num = "C";
            }
            $("#zyb_marjor").show();
        };

        $scope.setUpMar = function (e, num) {
            var that = $(e.target), volunteer = that.attr('hope'), did = that.attr('did'), name = that.attr('name');
            var marjor_id = parseInt(window.location.hash.split('#/refer1/marjor_id=')[1]);
            if (volunteer == 'A') {
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
            } else if (volunteer == 'B') {
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
            } else {
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
            }

            $.each($scope.persons, function (i, v) {
                if (volunteer == 'A') {
                    if (v.name == $scope.param.firSchName) {
                        departSet(v, num, $scope.sub.a);
                    }
                } else if (volunteer == 'B') {
                    if (v.name == $scope.param.senSchName) {
                        departSet(v, num, $scope.sub.b);
                    }
                } else {
                    if (v.name == $scope.param.thiSchName) {
                        departSet(v, num, $scope.sub.c);
                    }
                }
            });

            function departSet(v, num, array) {
                if (marjor_id == 1) {
                    $.each(v.departs, function (c_i, c_v) {
                        c_v.disabled = false;
                    });
                    array[1] = v.departs[num - 1].sdid;
                } else if (marjor_id == 2) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1
                            && c_v.name != $scope.param.senDepart_1
                            && c_v.name != $scope.param.thiDepart_1) {
                            c_v.disabled = false;
                        }
                    });
                    array[2] = v.departs[num - 1].sdid;
                } else if (marjor_id == 3) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2) {
                            c_v.disabled = false;
                        }
                    });
                    array[3] = v.departs[num - 1].sdid;
                } else if (marjor_id == 4) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3) {
                            c_v.disabled = false;
                        }
                    });
                    array[4] = v.departs[num - 1].sdid;
                } else if (marjor_id == 5) {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4) {
                            c_v.disabled = false;
                        }
                    });
                    array[5] = v.departs[num - 1].sdid;
                } else {
                    $.each(v.departs, function (c_i, c_v) {
                        if (c_v.name != $scope.param.firDepart_1 && c_v.name != $scope.param.firDepart_2 && c_v.name != $scope.param.firDepart_3 && c_v.name != $scope.param.firDepart_4 && c_v.name != $scope.param.firDepart_5
                            && c_v.name != $scope.param.senDepart_1 && c_v.name != $scope.param.senDepart_2 && c_v.name != $scope.param.senDepart_3 && c_v.name != $scope.param.senDepart_4 && c_v.name != $scope.param.senDepart_5
                            && c_v.name != $scope.param.thiDepart_1 && c_v.name != $scope.param.thiDepart_2 && c_v.name != $scope.param.thiDepart_3 && c_v.name != $scope.param.thiDepart_4 && c_v.name != $scope.param.thiDepart_5) {
                            c_v.disabled = false;
                        }
                    });
                    array[6] = v.departs[num - 1].sdid;
                }
                v.departs[num - 1].disabled = true;
            }
        };

        $scope.unSetUpMar = function (e, num) {
        };


        $scope.reqOrder = function () {
            getLoginUserInfo.isLogoin();

            $scope.sub.a[0] = $scope.sub.b[0] = $scope.sub.c[0] = 0;
            var param = {};
            param.id = $scope.sub.id;
            param.a = $scope.sub.a;
            param.b = $scope.sub.b;
            param.c = $scope.sub.c;

            var tramsform = function (data) {
                return $.param(data);
            };

            $http.post(loocha+"/exam/intention/manual", param, {
                headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: tramsform
            }).success(function (data) {
                $http.get(loocha+'/exam/' + data.response.id).success(function (result) {
                    $scope.order_id = result.response.order_id;
                    $scope.money = result.response.money;
                    $("#zyb_random").show();
                });
            })
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