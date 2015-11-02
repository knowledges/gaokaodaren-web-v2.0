/**
 * Created by qbl on 2015/11/2.
 */
angular.module('gaokaoAPP.chance',[])
.controller('chanceCtr',['$scope',function($scope){

        $scope.firstDoor = [
            {
                id: "5",
                name: "A+"
            }, {
                id: 4,
                name: "A",
            }, {
                id: 3,
                name: "B+",
            }, {
                id: 2,
                name: "B+",
            }, {
                id: 1,
                name: "C",
            }, {
                id: 0,
                name: "D",
            }
        ];

        $scope.info = {
            firDoor:$scope.firstDoor[0],
            sceDoor:$scope.firstDoor[0],
            name:"",
            number:"",
            city:"",
            cityarea:"",
            scroe:""
        };

}]);