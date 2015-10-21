/**
 * Created by qbl on 2015/10/20.
 */
angular.module("gaokaoAPP.navbar.School",[])
//.constant('findSchoolURL',"school")
.constant('findSchoolURL',"../JSON/fenye.json")
.controller("schoolConCtl",['$scope','$stateParams','$sce','AJAX','navURL_1','propURL','tubeURL','provinceURL','findSchoolURL',function($scope,$stateParams,$sce,AJAX,navURL_1,propURL,tubeURL,provinceURL,findSchoolURL){

            console.log($stateParams);

            $scope.school = {
                    isnav: true,
                    isfind:false,
                    strHtml: "",
                    isChars:false
            }

            $scope.info = {
                type: "",
                key: "",
                style: 0,
                attr: 0,
                belongs: 0,
                level: 0,
                province_id: 0,
                city_id: 0,
                index: 1,
                limit: 10,
                pageSize:0,
                junior: 0
            }


            if ($stateParams.type == 0) {
                    $scope.school.isnav = true;
                    $scope.school.isfind = false;
                    $scope.school.isChars = false;
                    navSchool();
            } else {
                    $scope.school.isnav = false;
                    $scope.school.isChars = false;
                    $scope.school.isfind = true;
                    $scope.info.type = $stateParams.type;
                    loading();
            }

            $scope.areaChange = function($event){
                //AJAX.getRequest('/city/province/8','GET','')
                AJAX.getRequest('../JSON/city.json','GET','')
                    .success(function(data,status){
                        var obj = [];
                        $.each(data.response.list,function(i,v){
                           if(v.type == 3){
                               obj.push(v);
                           }
                        });

                        obj.join(',');

                        $scope.city = obj;

                    });
            }

            $scope.findSchool = function(info){
                pageation($scope.info.index,info);
            }

            function pageation(currentIdx,info){
                var param = {};
                    param.type = info.type;
                    param.key = info.key;
                    param.style = info.style;
                    param.attr = info.attr;
                    param.belongs = info.belongs;
                    param.level = info.level;
                    param.province_id = info.province_id;
                    param.city_id = info.city_id;
                    param.index = currentIdx-1;
                    param.limit  = 10;
                    param.junior = info.junior;
                AJAX.getRequest(findSchoolURL,'GET', $.param(param))
                    .success(function(data,status){
                        $scope.info.pageSize = data.response.sum;
                        $scope.schoolList =  data.response.list;

                        debugger;
                        $("#pagging").pagging({
                            sum: $scope.info.pageSize,
                            param:param,
                            current: $scope.info.index,
                            callback: function(idx, param) {
                                $scope.info.index = idx;
                                pageation ($scope.info.index,info);
                            }
                        })


                    })



            }

            $scope.showChar = function(id){
                //AJAX.getRequest('/article/show/'+id,'GET','')
                $scope.school.isnav = false;
                $scope.school.isChars = true;
                $scope.school.isfind = false;
                AJAX.getRequest(navURL_1, 'GET', "")
                    .success(function (data, status) {
                        $scope.school.strHtml = $sce.trustAsHtml(data);
                    });
            }

            function navSchool() {
                    //AJAX.getRequest('/article/show/3290','GET',"")
                    AJAX.getRequest(navURL_1, 'GET', "")
                        .success(function (data, status) {
                            $scope.school.strHtml = $sce.trustAsHtml(data);
                        });

            }

            function loading(){
                AJAX.getRequest(propURL,'GET',"")
                    .success(function(data,status){
                        var list = data.response;
                        var arr_style = [],arr_attr=[],attr_belongs=[];
                        var area_list = [];
                        for (var i = 0; i < list.length; i++) {
                            if(list[i].type == 0){
                                arr_style.push(list[i]);
                            }else if(list[i].type == 2){
                                arr_attr.push(list[i]);
                            }else if(list[i].type == 1){
                                attr_belongs.push(list[i]);
                            }
                        }
                        arr_style.join(',');
                        arr_attr.join(',');
                        attr_belongs.join(',')
                        $scope.style = arr_style;
                        $scope.attribute = arr_attr;
                        $scope.belongs = attr_belongs;
                    });

                AJAX.getRequest(tubeURL,'GET','')
                    .success(function(data,status){
                        var list = data.response;
                        var tube_list = [];
                        for(var i = 0; i< list.length;i++){
                            if($stateParams == 7 || $stateParams == 8){
                                if(list[i].type == 2){
                                    tube_list.push(list[i]);
                                }
                            }else{
                                if(list[i].type == 1){
                                    tube_list.push(list[i]);
                                }
                            }

                        }
                        tube_list.join(',');
                        $scope.tube = tube_list ;
                    })

                AJAX.getRequest(provinceURL,'GET',"")
                    .success(function(data,status){
                        $scope.area = data.response.list;
                        $scope.info.province = $scope.area[0];
                    });
            }
}])