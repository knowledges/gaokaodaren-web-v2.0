/**
 * Created by qbl on 2015/10/13.
 */
angular.module('gaokaoAPP.hope.personality',[])
.constant("personalityURL","../JSON/cool.json")
.factory('DATA',['$http',function($http){
    var request = function(path){
        return $http({
            url:path,
            method: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
    }
    return {
        getRequest : function(path){
            return  request(path);
        }
    }
}])
.controller("wishTabCtr-cool",['$scope','ZYBinfoDATA','personalityURL','DATA',function($scope,ZYBinfoDATA,personalityURL,DATA){
        $scope.personality = ZYBinfoDATA;

        DATA.getRequest(personalityURL)
            .success(function(data,status){
                debugger;
            });


}]);
