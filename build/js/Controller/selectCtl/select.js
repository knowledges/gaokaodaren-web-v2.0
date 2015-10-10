/**
 * Created by qbl on 2015/10/9.
 */
angular.module("gaokaoAPP.hope.selectd",['gaokaoAPP.hope'])
.constant("provinceURL","/city/province")
.constant("propURL","/school/prop?depart_type=1")
.factory("attr",['$http',function($http){
    var reqProvince = function(path){
        return $http({
            url: path,
            method: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
    var prop = function(path,num){
        return $http({
            url:path,
            method:"GET",
            dataType:"json",
            header:{
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
    return {
        getProvince : function(path){
            return reqProvince(path);
        },
        getProp : function(path){
            return prop(path);
        }
    }
}])
.controller("wishTabCtr-attr",['$scope',"$timeout","ZYBinfoDATA","provinceURL","propURL","attr",function($scope,$timeout,ZYBinfoDATA,provinceURL,propURL,attr){
        $scope.attr = ZYBinfoDATA;
        $scope.area = "";
        $scope.style="";
        $scope.attribute="";
        $scope.belongs="";
        $scope.list_style="";

        attr.getProvince(provinceURL)
            .success(function(data,status){
                $scope.area = data.response.list;

                var list_style=[];
                for(var i =0;i<$scope.area.length;i++){
                    for (var j = 0; j < $scope.attr.city_prefer.length; j++) {
                        debugger;
                        if($scope.attr.city_prefer[j] == $scope.area[i].id){
                            list_style.push($scope.area[i].name);
                        }
                    }
                }
                list_style.join(',');
                $scope.list_style = list_style;

        });

        attr.getProp(propURL)
            .success(function(data,status){
                var list = data.response;
                var arr_style = [],arr_attr=[],attr_belongs=[];
                var list_style = [];
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
                attr_belongs.join(',');
                $scope.style = arr_style;
                $scope.attribute = arr_attr;
                $scope.belongs = attr_belongs;
            });

        $timeout(function(){
            $scope.isCheckdbox = function (no) {
                var isok = false;
                for (var i = 0; i < $scope.attr.city_prefer.length; i++) {
                    if (no == $scope.attr.city_prefer[i]) {
                        isok = true;
                        break;
                    }
                }
                return isok;
            };
        },500)


}]);