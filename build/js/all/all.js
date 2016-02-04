/**
 * Created by qbl on 2015/10/27.
 */
angular.module('gaokaoAPP.group.all', [])
    .constant('willUrl','/loocha/exam/request/all?index=0&limit=999')
    .constant('referUrl','/loocha/exam/order/all?index=0&limit=999&type=1')
    .controller('willCtr', ['$scope', 'AJAX','willUrl',function ($scope,AJAX,willUrl) {
        $scope.will = {
            isShowWill:false,
            list:""
        }

        AJAX.getRequest(willUrl,'GET','')
            .success(function(data,status){
                $scope.will.list = data.response.list;
                $scope.will.isShowWill = true;
            });

    }])
    .controller('referenceCtr', ['$scope','AJAX','referUrl', function ($scope,AJAX,referUrl) {

        $scope.refer = {
            isShowRefer:false,
            list:""
        }

        AJAX.getRequest(referUrl,'GET','')
            .success(function(data,status){
                $scope.refer.isShowRefer = true;
                $scope.refer.list = data.response.list;
            });

    }]);