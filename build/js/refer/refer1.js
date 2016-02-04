/**
 * Created by qbl on 2016/2/1.
 */
require(['app'],function(app){
    app.controller('referCtr',['$scope',function(data){
        $scope.showModel = function(){
            $("#myModal").modal('show');
        }
        $scope.showMarjor = function(){
            $("#zyb_marjor").modal('show');
        };
        $scope.reqOrder = function(){
            $("#zyb_random").modal('show');
        }
    }]);
});