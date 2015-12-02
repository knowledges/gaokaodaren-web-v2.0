/**
 * Created by qbl on 2015/11/25.
 */
require.config({
    paths:{
        "angular":"lib/angular.min",
        "angular-ui-router":"lib/angular-ui-router.min",
        "angular-async-loader":"lib/angular-async-loader.min",
        "oclazyLoad":"lib/ocLazyLoad.min",
        "bootstrap":"lib/bootstrap/js/bootstrap.min",
        "jquery":"lib/jquery.min",
        "AES":"lib/AES.js"
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'angular-ui-router':{
            deps:['angular'],
            exports:'angular-ui-router'
        },
        'jquery':{
            exports:'jquery'
        },
        bootstrap:{
            deps:['jquery'],
            exports:'bootstrap'
        },
        'oclazyLoad':{
            deps:['jquery','angular','angular-ui-router'],
            exports:'oclazyLoad'
        },
        'AES':{
            deps:['jquery'],
            exports:'AES'
        }

    },
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['angular','./app-routes'],function(angular){
    angular.element(document).ready(function(){
        angular.bootstrap(document,['JS-gaokao']);
    });
})