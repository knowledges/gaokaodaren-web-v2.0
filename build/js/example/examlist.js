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
            var uScore = sessionStorage.getItem("uScore")|| sessionStorage.getItem("examScore");
            if(uScore != null) {
                $scope.userInfo.uScore = JSON.parse(sessionStorage.getItem("uScore")) || JSON.parse(sessionStorage.getItem("examScore"));
                $scope.userInfo.score = $scope.userInfo.uScore.score;
                $scope.userInfo.level_a = $scope.userInfo.uScore.level_a;
                $scope.userInfo.level_b = $scope.userInfo.uScore.level_b;

                $http.get(loocha+"/example?type="+$scope.userInfo.type+"&level="+encodeURI($scope.userInfo.level_a+$scope.userInfo.level_b)+"&score="+$scope.userInfo.score)
                    .success(function(data){
                        $scope.title.list = data.response;
                        angular.forEach(data.response,function(v,i){
                            $scope.title.url[i] = "http://180.96.7.211:5480/upload/"+v.type+"/"+v.level+"/"+v.score;
                            console.log($scope.title.url[i]);
                        });
                    });

            }
        }

        $scope.showExample = function(num){
            $scope.userInfo.url = $scope.title.url[num];
            $("#examList").hide();
            $("#exam").show();
        };

        $scope.goback = function(){
            $("#examList").show();
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