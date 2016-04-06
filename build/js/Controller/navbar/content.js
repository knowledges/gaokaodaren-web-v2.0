/**
 * Created by qbl on 2015/10/20.
 */
require(['app'],function(app){
    //app.constant("cityList","../JSON/cityContent.json");
    //app.constant("findCity","/city");
    app.controller("cityConCtl",['$scope','$stateParams','$http','$sce','$rootScope','loocha',function($scope,$stateParams,$http,$sce,$rootScope,loocha){

            $scope.content = {
                isfind:true,
                cityName:"",
                listCity_0:"",
                listCity_1:"",
                listCity_2:"",
                listCity_3:"",
                listCity_4:"",
                listCity_5:""
            };

            getCityList($stateParams.cityId);

            $scope.findCity = function(){
                $scope.content.isfind = true;
                $http.get('/city?key='+$scope.content.cityName)
                    .success(function(data,status){
                        $scope.content.cityList = data.response.list;
                    });
            }

            $scope.findBack = function(){
                $scope.content.isfind = false;
            }

            function getCityList(num){
                $http.get(loocha+"/city/province/"+num)
                    .success(function(data,status){
                        $scope.content.isfind = false;

                        var param = [],param_child=[];
                        var list_0= [],list_1=[],list_2 = [],list_3 = [],list_4 = [],list_5=[];
                        if(data.response.list.length>1){
                            $.each(data.response.list,function(i,v){
                                if(v.type == 2){
                                    param.push(v);
                                }else if(v.type == 3){
                                    param_child.push(v);
                                }
                            });

                            for(var i = 0;i<param.length;i++) {
                                for (var j = 0; j < param_child.length; j++) {
                                    if (param[i].id == param_child[j].province_area_id) {
                                        if(param[i].id == 39||param[i].id == 42||param[i].id == 44||param[i].id == 46||param[i].id == 48||param[i].id == 50||param[i].id == 52||param[i].id == 54||param[i].id == 56||param[i].id == 57||param[i].id == 58||param[i].id == 59||param[i].id == 61||param[i].id == 63||param[i].id == 65||param[i].id == 66||param[i].id == 68||param[i].id == 69||param[i].id == 71||param[i].id == 73||param[i].id == 75||param[i].id == 76||param[i].id == 78||param[i].id == 79||param[i].id == 80){
                                            list_1.push(param_child[j]);
                                        }else if(param[i].id == 40||param[i].id == 43||param[i].id == 45||param[i].id == 47||param[i].id == 49||param[i].id == 51||param[i].id == 53||param[i].id == 55||param[i].id == 60||param[i].id == 62||param[i].id == 64||param[i].id == 67||param[i].id == 70||param[i].id == 72||param[i].id == 74||param[i].id == 77){
                                            list_2.push(param_child[j]);
                                        }else if(param[i].id == 41){
                                            list_3.push(param_child[j]);
                                        }else if(param[i].id == 349){
                                            list_4.push(param_child[j]);
                                        }else if(param[i].id == 350){
                                            list_5.push(param_child[j]);
                                        }
                                    }else if(param_child[j].type == 3 && param_child[j].province_area_id == 0){
                                        if(list_0.indexOf(param_child[j])<0){
                                            list_0.push(param_child[j]);
                                        }
                                    }
                                }
                            }
                            $scope.content.listCity_0 = list_0;
                            $scope.content.listCity_1 = list_1;
                            $scope.content.listCity_2 = list_2;
                            $scope.content.listCity_3 = list_3;
                            $scope.content.listCity_4 = list_4;
                            $scope.content.listCity_5 = list_5;
                        }else{
                            $.each(data.response.list,function(i,v){
                                list_0.push(v);
                            });
                            $scope.content.listCity_0 = list_0;
                        }
                        $rootScope.loading = false;
                    });
            }
        }])
});
