/**
 * Created by qbl on 2015/11/2.
 */
angular.module('gaokaoAPP.chance',[])
.controller('chanceCtr',['$scope',function($scope){

        $scope.score = "";

        $scope.isShow = false

        init();

        $scope.changePay = function(){
            $scope.isShow = true;
        }

       function init(){
           if(localStorage.getItem("score")!=null){
               $.each(JSON.parse(localStorage.getItem("score")), function (idx, val) {
                   if (val.state == 1) {
                       $scope.score = val;
                       //TODO ����һ���Ƽ���Ϣ
                       $scope.recommShow = true;
                   }
               });

           }
       }

}]);