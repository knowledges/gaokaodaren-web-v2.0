/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP.home",[])
    .constant("men2","/menu?index=0&limit=8&parent_id=15")
    .constant("men3","/menu?index=0&limit=8&parent_id=16")
    .constant("men4","/menu?index=0&limit=4&parent_id=17")
    .constant("men5","/menu?index=0&limit=4&parent_id=21")
    .constant("men6","/menu?index=0&limit=8&parent_id=22")
    .constant("men7","/article?index=0&limit=8&menu_id=93&key=")
    .factory('htmlService',function(){
        return {
            htmlPage:""
        }
    })
    .controller("homeCtr",['$scope','$window','$sce','AJAX','provinceURL','men7','men2','men3','men4','men5','men6','htmlService',function($scope,$window,$sce,AJAX,provinceURL,men7,men2,men3,men4,men5,men6,htmlService) {
        $scope.table = {
            tbyl:"",
            fsfx:"",
            zszc:"",
            byqx:"",
            gxtz:"",
            zxxl:""
        }
        $scope.ishide = true;

        $scope.service = htmlService;
        $scope.insertHTML = "";
        $scope.$watch('service',function(newValue,oldValue){
            if(newValue.htmlPage!=""){
                $scope.ishide = false;
                $scope.insertHTML = $sce.trustAsHtml(newValue.htmlPage);
            }
        },true);

        function locationHref(type,user_level,obl,sel,score){
            $window.location.href="#/hope?type="+type+"&user_level="+user_level+"&obl="+obl+"&sel="+sel+"&score="+score;
        }

        $scope.menu = {
            provincelist: ""
        }

        init();

        function init() {

            AJAX.getRequest(provinceURL, 'GET', '')/**省份*/
                .success(function (data, status) {
                    $scope.table.provincelist = data.response.list;
                });

            $('.carousel').carousel({
                interval: 5000
            })

            /**
             * 填报要领
             */
            AJAX.getRequest(men2,'GET','')
                .success(function(data,status){
                    $scope.table.tbyl = data.response.list;
                });

            /**
             * 分数分析
             */
            AJAX.getRequest(men3,'GET','')
                .success(function(data,status){
                    $scope.table.fsfx = data.response.list;
                });

            /**
             * 招生政策
             */
            AJAX.getRequest(men4,'GET','')
                .success(function(data,status){
                    $scope.table.zszc = data.response.list;
                });

            /**
             * 毕业去向
             */
            AJAX.getRequest(men5,'GET','')
                .success(function(data,status){
                    $scope.table.byqx = data.response.list;
                });

            /**
             * 个性特征
             */
            AJAX.getRequest(men6,'GET','')
                .success(function(data,status){
                    $scope.table.gxtz = data.response.list;
                });
            /**
             * 咨询线路
             */
            AJAX.getRequest(men7,'GET','')
                .success(function(data,status){
                    $scope.table.zxxl = data.response.list;
                });

        }

    }]);