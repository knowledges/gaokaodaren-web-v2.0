/**
 * Created by qbl on 2015/10/20.
 */
'use strict';
require(['app','pagging'],function(app,pagging){
    app.constant("navURL_1","/article/show/3289");//城市
    app.constant('findSchoolURL',"/school");
    app.constant("propURL","/school/prop?depart_type=1");
    app.constant("provinceURL","/city/province");
    app.constant("tubeURL","/web/new/JSON/attribute.json");
    app.directive('onFinishRender',['$rootScope','$timeout',function($rootScope,$timeout){
        return{
            restrict: 'A',
            link:function(scope,elm,attr){
                if(scope.$last === true) {
                    $rootScope.loading = false;
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    }]);
    app.controller("schoolConCtl",['$scope','$stateParams','$sce','$http','loocha','navURL_1','propURL','tubeURL','provinceURL','findSchoolURL',function($scope,$stateParams,$sce,$http,loocha,navURL_1,propURL,tubeURL,provinceURL,findSchoolURL){
        $scope.school = {
            isnav: true,
            isfind:false,
            strHtml: "",
            isChars:false
        };

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
        };

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

        $scope.areaChange = function(num){
            $http.get(loocha+'/city/province/'+num.id)
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
        };

        $scope.findSchool = function(info){
            pageation($scope.info.index,info);
        };

        function pageation(currentIdx,info) {
            var param = {};
                param.type = info.type;
                param.key = info.key;
                param.style = info.style;
                param.attr = info.attr;
                param.belongs = info.belongs;
                param.level = typeof(info.level) == 'object' ? info.level.type : typeof(info.level) == null ? 0 : info.level.type;
                param.province_id = info.province_id;
                param.city_id = info.city_id;
                param.index = currentIdx - 1;
                param.limit = 10;
                param.junior = info.junior;

            $http({
                method:'GET',
                url:loocha+findSchoolURL,
                params:param
            })
            .success(function (data, status) {

                $scope.info.pageSize = data.response.sum;
                $scope.schoolList = data.response.list;

                $("#pagging").pagging({
                    sum: $scope.info.pageSize,
                    param: param,
                    current: $scope.info.index,
                    callback: function (idx, param) {
                        debugger;
                        $scope.info.index = idx;
                        pageation($scope.info.index, info);
                    }
                })
            });
        }

        $scope.showChar = function(id){
            $scope.school.isnav = false;
            $scope.school.isChars = true;
            $scope.school.isfind = false;
            $http.get(loocha+'/article/show/'+id)
                .success(function (data) {
                    $scope.school.strHtml = $sce.trustAsHtml(data);
                });
        };

        $scope.goback = function(){
            $scope.school.isnav = false;
            $scope.school.isChars = false;
            $scope.school.isfind = true;
            $scope.school.strHtml=""
        }

        function navSchool() {
            $http.get(loocha+navURL_1)
                .success(function (data) {
                    $scope.school.strHtml = $sce.trustAsHtml(data);
                });
        }

        function loading(){
            $http.get(loocha+propURL)
                .success(function(data){
                    var list = data.response;
                    var arr_style = [],arr_attr=[],attr_belongs=[];
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

            $http.get(loocha+tubeURL)
                .success(function(data){
                    var list = data.response;
                    var tube_list = [];
                    for(var i = 0; i< list.length;i++){
                        if($stateParams.type == 7 || $stateParams.type == 8){
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
                });

            $http.get(loocha+provinceURL)
                .success(function(data){
                    $scope.area = data.response.list;
                    $scope.info.province = $scope.area[0];
                });
        }

        $scope.$on('methodname',function(){
            var idx = $stateParams.type !=undefined ? $stateParams.type :0;
            $(".ulcollapse li").removeClass('actived').eq(idx).addClass("actived");

            $(".ulcollapse li").on('click',function(e){
                $(".ulcollapse li").removeClass('actived');
                $(this).addClass('actived');
            });
        })

    }]);
})
