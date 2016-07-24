/**
 * Created by qbl on 2015/11/25.
 */
define(['app','jquery','bootstrap'],function(app,$,bootstrap){
    app.directive('onFinishRender', ["$rootScope", function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                if (scope.$last === true) {
                    $rootScope.loading = false;
                }
            }
        }
    }]);
    app.controller("homeCtrl",['$rootScope','$scope','$state','$window','$sce','$timeout','homeService','data_province','displayService',function($rootScope,$scope,$state,$window,$sce,$timeout,homeService,data_province,displayService) {

        $scope.$on("$viewContentLoaded",function(e){
            $timeout(function () {
                $('.carousel').carousel({
                    interval: 5000
                });

                $(".carousel").mouseover(handlerIn).mouseout(handlerOut);

                $(".carousel-indicators li").click(function(){
                    var num = $(this).data('slide-to');
                    $(".carousel-indicators li").removeClass('active');
                    $(".carousel-inner .item").removeClass('active');
                    $(".carousel-indicators li").eq(num).addClass('active');
                    $(".carousel-inner .item").eq(num).addClass('active');
                });
                //倒排序
                $(".glyphicon-chevron-left").click(function(e){
                    $('.carousel').carousel('prev');
                });
                //正排序
                $(".glyphicon-chevron-right").click(function(e){
                    $('.carousel').carousel('next');
                });

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
        });

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
                $state.go('depth.info',{batch:$scope.table.economic});
                //$window.location.href="#/depth/depthInfo/batch="+$scope.table.economic;
            }else{
                alert("请选择批次");
            }
        };

    }]);
});