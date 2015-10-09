/**
 * Created by qbl on 2015/10/9.
 */
angular.module("gaokaoAPP.hope.selectd",['gaokaoAPP.hope'])
.constant("provinceURL","/city/province")
.factory("attr",['$http',function($http){
    var reqProvince = function(path){
        return $http({
            url: path,
            method: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
    }
    return {
        getProvince : function(path){
            return reqProvince(path);
        }
    }
}])
.controller("wishTabCtr-attr",['$scope',"ZYBinfoDATA","provinceURL","attr",function($scope,ZYBinfoDATA,provinceURL,attr){
        $scope.attr = ZYBinfoDATA;
        $scope.attr = {
            responseList :""
        }
        attr.getProvince(provinceURL)
            .success(function(data,status){
                $scope.attr.responseList = data.response.list;
            })

}]);