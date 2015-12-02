/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'],function(app){
    app.controller('chanceCtr',['$scope',function($scope){

        $scope.score = "";

        $scope.isShow = false;

        init();

        $scope.changePay = function(){
            $scope.isShow = true;
        };

        function init(){
            if(localStorage.getItem("score")!=null){
                $.each(JSON.parse(localStorage.getItem("score")), function (idx, val) {
                    if (val.state == 1) {
                        $scope.score = val;

                        //TODO 请求一次推荐信息
                        $scope.recommShow = true;
                    }
                });
            }
        };
    }])
});