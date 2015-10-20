/**
 * Created by qbl on 2015/10/20.
 */
angular.module("gaokaoAPP.city.content",[])
.constant("cityList","../JSON/cityContent.json")
//.constant("cityList","/city/province")
.constant("findCity","../JSON/cityname.json")
//.constant("findCity","/city")
.controller("cityConCtl",['$scope','$stateParams','AJAX','navURL_1','$sce','cityList','findCity',function($scope,$stateParams,AJAX,navURL_1,$sce,cityList,findCity){

        console.log("ID:"+$stateParams.cityType);

        $scope.content = {
            isNav : true,
            isfind:false,
            page:"",
            cityName:""
        }

        if($stateParams.cityType == 0){
            getRequed()
        }else{
            debugger;
            $scope.content.isNav=false;
            getCityList($stateParams.cityType);
        }

        $scope.navigation = function(){/**导航*/
            getRequed();
        }

        $scope.findCity = function(){
            $scope.content.isfind=true;
            AJAX.getRequest(findCity,'GET', $.param({"key":$scope.content.cityName}))
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
            //AJAX.getRequest("/city/province/"+num,'GET','')
            AJAX.getRequest(cityList,'GET','')
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