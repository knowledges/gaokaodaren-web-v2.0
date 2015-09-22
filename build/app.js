/**
 * Created by qbl on 2015/9/22.
 */
'use strict';

angular.module("gaokaoAPP",[
    'ngRoute',
    'gaokaoAPP.home'
    //'gaokaoAPP.hope'
    //'gaokaoAPP.required',
    //'gaokaoAPP.analyse',
    //'gaokaoAPP.policy',
    //'gaokaoAPP.city',
    //'gaokaoAPP.school',
    //'gaokaoAPP.major',
    //'gaokaoAPP.graduated',
    //'gaokaoAPP.Personality',
    //'gaokaoAPP.consult',
    //'gaokaoAPP.about'
]).
config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:"/html"})
}]);