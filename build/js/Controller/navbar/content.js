/**
 * Created by qbl on 2015/10/20.
 */
require(['app'],function(app){
    app.constant("cityList","../JSON/cityContent.json");
    app.constant("findCity","/city");
    app.controller("cityConCtl",['$scope','$stateParams','$http','$sce','AJAX','navURL_1','cityList','findCity',function($scope,$stateParams,$http,$sce,AJAX,navURL_1,cityList,findCity){

            $scope.content = {
                isNav : true,
                isfind:false,
                page:"",
                cityName:""
            };

            getCityList($stateParams.cityId);

            $scope.navigation = function(){/**导航*/
                 getRequed();
            }

            $scope.findCity = function(){
                $scope.content.isfind=true;
                var param = {};
                param.key = $scope.content.cityName
                AJAX.getRequest(findCity,'GET',param)
                    .success(function(data,status){
                        $scope.content.cityList = data.response.list;
                    });
            }


            function getRequed(){
                AJAX.getRequest(navURL_1,'GET','')
                    .success(function(data,status){
                        $scope.content.page = $sce.trustAsHtml(data);
                    });
            }

            function getCityList(num){
                AJAX.getRequest("/city/province/"+num,'GET','')
                    .success(function(data,status){
                        var obj = [];
                        $.each(data.response.list,function(i,v){
                            if(v.type == 3){
                                obj.push(v);
                            }
                        });
                        $scope.content.cityList = obj;
                    })
            }
        }])
});
