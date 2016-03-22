/**
 * Created by qbl on 2015/10/27.
 */
angular.module('gaokaoAPP.group.all', [])
    .constant('willUrl','/exam/request/all?index=0&limit=999')
    .constant('referUrl','/exam/order/all?index=0&limit=999&type=1')
    .controller('willCtr', ['$scope','willUrl','loocha',function ($scope,willUrl,loocha) {
        $scope.will = {
            isShowWill:false,
            list:""
        };

        $http.get(loocha+willUrl).success(function(data){
            $scope.will.list = data.response.list;
            $scope.will.isShowWill = true;
        });

    }])
    .controller('referenceCtr', ['$scope','referUrl','loocha', function ($scope,referUrl,loocha) {

        $scope.refer = {
            isShowRefer:false,
            list:""
        };

        $http.get(loocha+referUrl).success(function(data){
            $scope.refer.isShowRefer = true;
            $scope.refer.list = data.response.list;
        });

    }]);