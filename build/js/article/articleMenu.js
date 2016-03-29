/**
 * Created by Administrator on 2016/3/29.
 */
'use strict';
require(['app'],function(app){
    app.directive('menuclk',[function(){
        return {
            restrict:'A',
            link:function(scope){
                if(scope.$last == true){
                    debugger;
                }
                $("#menu_li > li").click(function(e){
                    $("#menu_li > li").removeClass("active");
                    $(e.target).addClass("active");
                });
            }
        }
    }]);
    app.controller('artCtr',["$scope",function($scope){
        console.log('===');



    }]);
});