/**
 * Created by Administrator on 2016/5/19.
 */
require(['app'],function(app) {
    app.constant('articleURL', "/article");
    app.directive('isLoading', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last == true) {
                    $rootScope.loading = false;
                }
            }
        }
    }]);
    app.directive('isActive', ['$stateParams', function ($stateParams) {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                if (scope.$last == true) {
                    $(".list-group-item").removeClass('active');
                    var idx = $stateParams.active != undefined ? $stateParams.active : 0;
                    $(".list-group-item").eq(idx).addClass("active");
                }
                $(".list-group-item").on('click', function (event) {
                    $(".list-group-item").removeClass('active');
                    $(this).addClass('active');
                });
            }
        }
    }]);
    app.controller("examlistCtr",['$scope','$http','$stateParams','loocha',function($scope,$http,$stateParams,loocha){
        $scope.title = {
            list :"",
            url:[],
        };
        $scope.userInfo = {
            type:$stateParams.batch,
            subject:"",
            uScore:"",
            level_a:"",
            level_b:"",
            url:""
        };

        init();
        function init(){
            var uScore = sessionStorage.getItem("examScore")||sessionStorage.getItem("uScore");
            if(uScore != null) {
                $scope.userInfo.uScore = JSON.parse(sessionStorage.getItem("examScore"))||JSON.parse(sessionStorage.getItem("uScore"));
                $scope.userInfo.score = $scope.userInfo.uScore.score;
                var str_ = "";
                if($scope.userInfo.uScore.upsideDown == true){
                    str_ = $scope.userInfo.uScore.level_b1+$scope.userInfo.uScore.level_a1;
                }else{
                    str_ = $scope.userInfo.uScore.level_a+$scope.userInfo.uScore.level_b;
                }

                var param = {};
                param.type =$scope.userInfo.type;
                param.level = str_;
                param.score = $scope.userInfo.score;
                //$http.get(loocha+"/example?type="+$scope.userInfo.type+"&level="+encodeURI(str_)+"&score="+$scope.userInfo.score)
                $http({
                    method:'GET',
                    url :loocha+"/example",
                    params:param
                }).success(function (data) {
                        $scope.title.list = data.response;
                        angular.forEach(data.response,function(v,i){
                            $scope.title.url[i] = "http://180.96.7.211:5480/upload/"+v.type+"/"+v.level+"/"+v.score;
                        });
                    });

            }
        }

        $scope.showExample = function(num){
            $scope.userInfo.url = $scope.title.url[num];
            //$("#examList").hide();
            $("#exam").show();
        };

        $scope.goback = function(){
            //$("#examList").show();
            $("#exam").hide();
        };

        $(function(){
            $("#thumbnail img").click(function(e){
                var _src = $(this).attr("src");
                $("#showImg img").attr("src",_src);
                $("#showImg").show();
                $("#showImg .mask").scrollTop(0);
            });

            $("#close-button").click(function(){
                $("#showImg").hide();
            })
        });

    }])


});