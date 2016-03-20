/**
 * Created by qbl on 2016/2/1.
 */
require(['app'],function(app){
    app.controller('referCtr',['$scope','$http','$stateParams',function($scope,$http,$stateParams){

        $scope.info = {
            title:"",
            subtitle:"",
            model:""
        };

        $scope.num = "";

        $scope.param={
            firSchName:"",
            firDepart_1:"",
            firDepart_2:"",
            firDepart_3:"",
            firDepart_4:"",
            firDepart_5:"",
            firDepart_6:"",
            senSchName:"",
            senDepart_1:"",
            senDepart_2:"",
            senDepart_3:"",
            senDepart_4:"",
            senDepart_5:"",
            senDepart_6:"",
            thiSchName:"",
            thiDepart_1:"",
            thiDepart_2:"",
            thiDepart_3:"",
            thiDepart_4:"",
            thiDepart_5:"",
            thiDepart_6:"",
        };

        $scope.money="";

        $scope.sub = {
            a:[],
            b:[],
            c:[],
            school_id:[]
        };

        $scope.persons = [
            {"name":"浙江师范大学（金华）","id":25,list:[{"id": 29194,"departName": "小学教育（师范）"},{"id": 29193,"departName": "机械设计制造及其自动化"},{"id": 22194,"departName": "统计学（师范） "},{"id": 29154,"departName": "小学教育（师范）"},{"id": 2912,"departName": "小学教育（师范）"},{"id": 29094,"departName": "小学教育（师范）"}]},
            {"name":"青岛大学","id":18,list:[{"id": 3089,"departName": "机械工程"}]},
            {"name":"江苏大学（镇江）","id":20,list:[{"id": 2285,"departName": "统计学"},{"id": 2185,"departName": "统计学"},{"id": 2385,"departName": "统计学"},{"id": 1285,"departName": "统计学"},{"id": 8285,"departName": "统计学"},{"id": 7285,"departName": "统计学"},{"id": 5285,"departName": "统计学"},{"id": 2205,"departName": "统计学"}]},
            {"name":"山东理工大学（淄博）","id":30,list:[{"id": 2907,"departName": "机械设计制造及其自动化"},{"id": 2917,"departName": "机械设计制造及其自动化"},{"id": 2397,"departName": "机械设计制造及其自动化"},{"id": 295,"departName": "机械设计制造及其自动化"},{"id": 29444,"departName": "机械设计制造及其自动化"},{"id": 29555,"departName": "机械设计制造及其自动化"},{"id": 29111,"departName": "机械设计制造及其自动化"}]}
        ];

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
        }

        $scope.showModel = function(idx){
            //var url ="/loocha/web/new/JSON/json.json";
            window.location.hash =  window.location.hash.substr(0,8)+"/select="+idx;
            $("#myModal").show();
            if(idx == 1){
                $scope.num = 'A';
            }else if(idx == 2){
                $scope.num = 'B';
            }else {
                $scope.num = 'C';
            }
        };

        $scope.setUpSch = function(e,num){
            var that  = $(e.target),sid = that.attr('sid'),name = that.attr('name');
            var select = window.location.hash.split('#/refer1/select=')[1];
            $(".depart_"+select).attr("school_id",sid);
            if(select == 1){
                $scope.param.firSchName = $scope.info.model = name;
                $.each($scope.persons,function(i,v){
                    v.disabled = false;
                });
                $scope.sub.school_id[0] = $scope.persons[num-1].id;
            }else if(select == 2){
                $scope.param.senSchName= $scope.info.model = name;
                $.each($scope.persons,function(i,v){
                    if(v.name!=$scope.param.firSchName){
                        v.disabled = false;
                    }
                });
                $scope.sub.school_id[1] = $scope.persons[num-1].id;
            }else{
                $scope.param.thiSchName= $scope.info.model= name;
                $.each($scope.persons,function(i,v){
                    if(v.name!=$scope.param.firSchName && v.name!=$scope.param.senSchName){
                        v.disabled = false;
                    }
                });
                $scope.sub.school_id[2] = $scope.persons[num-1].id;
            }
            $scope.persons[num-1].disabled = true;
        };

        $scope.unSetUp = function(e,num){
            $scope.persons[num-1].disabled = false;
        }

        $scope.sch_close = function(){
            $("#myModal").hide();
            window.location.hash =  window.location.hash.substr(0,8)+"";
        }

        $scope.showMarjor = function(e){
            var that = $(e.target),volunteer = that.attr('hope'),marjor_id = that.attr('marjor');
            window.location.hash = window.location.hash.substr(0,8)+"/marjor_id="+marjor_id;
            if(volunteer == 1){
                $scope.info.model = $scope.param.firSchName;
                $(".departSet").attr("hope",$scope.num);
            }else if (volunteer == 2){
                $scope.info.model = $scope.param.senSchName;
                $(".departSet").attr("hope",$scope.num);
            }else{
                $scope.info.model = $scope.param.thiSchName;
                $(".departSet").attr("hope",$scope.num);
            }
            $("#zyb_marjor").show();
        };

        $scope.setUpMar = function(e,num){
            var that = $(e.target),volunteer = that.attr('hope'),did=that.attr('did'),name=that.attr('name');
            var marjor_id = parseInt(window.location.hash.split('#/refer1/marjor_id=')[1]);
            if(volunteer == 'A'){
                switch(marjor_id){
                    case 1:
                        $scope.param.firDepart_1=name;
                        break;
                    case 2:
                        $scope.param.firDepart_2=name;
                        break;
                    case 3:
                        $scope.param.firDepart_3=name;
                        break;
                    case 4:
                        $scope.param.firDepart_4=name;
                        break;
                    case 5:
                        $scope.param.firDepart_5=name;
                        break;
                    case 6:
                        $scope.param.firDepart_6=name;
                        break;
                }
            }else if(volunteer == 'B'){
                switch(marjor_id){
                    case 1:
                        $scope.param.senDepart_1=name;
                        break;
                    case 2:
                        $scope.param.senDepart_2=name;
                        break;
                    case 3:
                        $scope.param.senDepart_3=name;
                        break;
                    case 4:
                        $scope.param.senDepart_4=name;
                        break;
                    case 5:
                        $scope.param.senDepart_5=name;
                        break;
                    case 6:
                        $scope.param.senDepart_6=name;
                        break;
                }
            }else {
                switch(marjor_id){
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

            $.each($scope.persons,function(i,v){
                if(volunteer == 'A'){
                    if(v.name == $scope.param.firSchName){
                        departSet(v,num,$scope.sub.a);
                    }
                }else if(volunteer == 'B'){
                    if(v.name == $scope.param.senSchName){
                        departSet(v,num,$scope.sub.b);
                    }
                }else{
                    if(v.name == $scope.param.thiSchName){
                        departSet(v,num,$scope.sub.c);
                    }
                }
            });

            function departSet(v,num,array){
                if(marjor_id == 1){
                    $.each(v.list,function(c_i,c_v){
                        c_v.disabled = false;
                    });
                    array[1] = v.list[num-1].id;
                }else if (marjor_id == 2){
                    $.each(v.list,function(c_i,c_v){
                        if(c_v.departName!=$scope.param.firDepart_1
                        && c_v.departName!=$scope.param.senDepart_1
                        && c_v.departName!=$scope.param.thiDepart_1){
                            c_v.disabled = false;
                        }
                    });
                    array[2] = v.list[num-1].id;
                }else if (marjor_id == 3){
                    $.each(v.list,function(c_i,c_v){
                        if(c_v.departName!=$scope.param.firDepart_1 && c_v.departName!=$scope.param.firDepart_2
                        && c_v.departName!=$scope.param.senDepart_1 && c_v.departName!=$scope.param.senDepart_2
                        && c_v.departName!=$scope.param.thiDepart_1 && c_v.departName!=$scope.param.thiDepart_2 ){
                            c_v.disabled = false;
                        }
                    });
                    array[3] = v.list[num-1].id;
                }else if (marjor_id == 4){
                    $.each(v.list,function(c_i,c_v){
                        if(c_v.departName!=$scope.param.firDepart_1 && c_v.departName!=$scope.param.firDepart_2 && c_v.departName!=$scope.param.firDepart_3
                        && c_v.departName!=$scope.param.senDepart_1 && c_v.departName!=$scope.param.senDepart_2 && c_v.departName!=$scope.param.senDepart_3
                        && c_v.departName!=$scope.param.thiDepart_1 && c_v.departName!=$scope.param.thiDepart_2 && c_v.departName!=$scope.param.thiDepart_3){
                            c_v.disabled = false;
                        }
                    });
                    array[4] = v.list[num-1].id;
                }else if (marjor_id == 5){
                    $.each(v.list,function(c_i,c_v) {
                        if (c_v.departName != $scope.param.firDepart_1 && c_v.departName != $scope.param.firDepart_2 && c_v.departName != $scope.param.firDepart_3 && c_v.departName != $scope.param.firDepart_4
                         && c_v.departName != $scope.param.senDepart_1 && c_v.departName != $scope.param.senDepart_2 && c_v.departName != $scope.param.senDepart_3 && c_v.departName != $scope.param.senDepart_4
                         && c_v.departName != $scope.param.thiDepart_1 && c_v.departName != $scope.param.thiDepart_2 && c_v.departName != $scope.param.thiDepart_3 && c_v.departName != $scope.param.thiDepart_4) {
                            c_v.disabled = false;
                        }
                    });
                    array[5] = v.list[num-1].id;
                }else{
                    $.each(v.list,function(c_i,c_v) {
                        if(c_v.departName!=$scope.param.firDepart_1 && c_v.departName!=$scope.param.firDepart_2 && c_v.departName!=$scope.param.firDepart_3 && c_v.departName!=$scope.param.firDepart_4 && c_v.departName!=$scope.param.firDepart_5
                        && c_v.departName!=$scope.param.senDepart_1 && c_v.departName!=$scope.param.senDepart_2 && c_v.departName!=$scope.param.senDepart_3 && c_v.departName!=$scope.param.senDepart_4 && c_v.departName!=$scope.param.senDepart_5
                        && c_v.departName!=$scope.param.thiDepart_1 && c_v.departName!=$scope.param.thiDepart_2 && c_v.departName!=$scope.param.thiDepart_3 && c_v.departName!=$scope.param.thiDepart_4 && c_v.departName!=$scope.param.thiDepart_5){
                            c_v.disabled = false;
                        }
                    });
                    array[6] = v.list[num-1].id;
                }
                v.list[num-1].disabled = true;
            }
        };

        $scope.unSetUpMar = function(e,num){
        };


        $scope.reqOrder = function(){
            $scope.sub.a[0]=$scope.sub.b[0]=$scope.sub.c[0]=0;
            var param = {};
            param.id = $scope.sub.school_id;
            param.a = $scope.sub.a;
            param.b = $scope.sub.b;
            param.c = $scope.sub.c;

            var tramsform = function(data){
                return $.param(data);
            };

            $http.post("/loocha/exam/intention/manual",param,{
                headers:{'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:tramsform
            }).success(function(data){
                /*TODO 提交完 根据订单ID 获取订单信息*/
                $http.get('/loocha/exam/'+111).success(function(result){
                    var out_trade_no = result.response.order_id;
                    $scope.money = result.response.money;
                });
            })

            $("#zyb_random").show();
        }
    }]);
});