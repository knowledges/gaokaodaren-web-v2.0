/**
 * Created by Administrator on 2015/12/14.
 */
require(['app'],function(app){
    app.controller('hopeCtr',['$scope','$window',function($scope,$window){
        $(".btn-all").hide();
        $(".btn-show").click(function(e){
            $(this).hide();
            $(".btn-all").show();
        });

        $(".btn-hide").click(function(e){
            $(".btn-show").show();
            $(".btn-all").hide();
        })

        $scope.pay = function(){
            //    TODO 提交订单，
            $window.open('#/pay');
            //$window.location.href = "#/pay";
        }

        $scope.manual = function(){
            $window.location.href = "#/refer1";
            $(".modal-backdrop").remove();
            $(".modal-open").removeClass('modal-open');
        }

    }]);
})