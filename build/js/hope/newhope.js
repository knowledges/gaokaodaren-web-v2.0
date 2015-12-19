/**
 * Created by Administrator on 2015/12/14.
 */
require(['app'],function(app){
    app.controller('hopeCtr',['$scope',function($scope){
        $(".btn-all").hide();
        $(".btn-show").click(function(e){
            $(this).hide();
            $(".btn-all").show();
        });

        $(".btn-hide").click(function(e){
            $(".btn-show").show();
            $(".btn-all").hide();
        })

    }]);
})