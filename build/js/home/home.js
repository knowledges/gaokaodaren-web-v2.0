/**
 * Created by qbl on 2015/11/25.
 */
define(['app','jquery','bootstrap'],function(app,$,bootstrap){
    app.directive('onFinishRender', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                if (scope.$last === true) {
                    $rootScope.loading = false;
                    $timeout(function () {
                        $('.carousel').carousel({
                            interval: 5000
                        });

                        $(".carousel").mouseover(handlerIn).mouseout(handlerOut);
                        function handlerIn(){
                            $('.carousel').carousel('pause');
                            var num = $("#myCarousel ol li[class='active']").data("slide-to");
                            $(".carousel-item").hide();
                            $("#item"+num).show();
                            if(num>0 && num <4){
                                $(".floatAdv").hide();
                            }else{
                                $(".floatAdv").show();
                            }
                        }
                        function handlerOut(){
                            $('.carousel').carousel({'pause':"true"});
                        }
                        //scope.$emit(attr.onFinishRender);
                    },1000);
                }
            }
        }
    }]);
    app.controller("homeCtrl",['$rootScope','$scope','$window','$sce','homeService','data_province','displayService',function($rootScope,$scope,$window,$sce,homeService,data_province,displayService) {
        $scope.table = {
            provincelist:"",
            economic:"",
        };

        $scope.ishide = displayService.isShow;
        $scope.service = homeService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);

        init();

        function init() {
            $(".modal-backdrop").hide();
            $scope.table.provincelist = data_province.data.response.list;
        }

        $scope.back = function(){
            $scope.ishide = true;
            $scope.insertHTML = "";
        };
        $scope.intoDepth = function(){
            if($scope.table.economic!=""){
                $window.location.href="#/depth/depthInfo/batch="+$scope.table.economic;
            }else{
                alert("请选择批次");
            }
        };

        $scope.toggleOpen = function(e){
            var that = $(e.target),_id = $(that).data("target");
            $(".adv_collapse").removeClass("in");
            $(_id).addClass("in");
        };

        $scope.$on("loading", function (ngRepeatFinishedEvent) {

        });
    }]);
});