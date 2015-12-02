/**
 * Created by Administrator on 2015/12/2.
 */
require(['app'],function(app){
    app.constant('willUrl','/exam/request/all?index=0&limit=999');
    app.constant('referUrl','/exam/order/all?index=0&limit=999&type=1');
    app.controller('willCtr', ['$scope', 'AJAX','willUrl',function ($scope,AJAX,willUrl) {
            $scope.will = {
                isShowWill:false,
                list:""
            }

            AJAX.getRequest(willUrl,'GET','')
                .success(function(data,status){
                    $scope.will.list = data.response.list;
                    $scope.will.isShowWill = true;
            });

        }]);
    app.controller('referenceCtr', ['$scope','AJAX','referUrl', function ($scope,AJAX,referUrl) {

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
});