/**
 * Created by qbl on 2015/10/19.
 */
angular.module("gaokaoAPP.temp.city",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            ///////////////
            ///  city  ///
            /////////////
            .state('city', {
                url: '/city',
                templateUrl:'html/temp/tempCity.html',
                data: { isPublic: true },
            })
            ///////////////////
            ///  city > nav ///
            //////////////////
            .state('city.nav',{
                url:'/',
                templateUrl:'html/nav/nav.html',
                data: { isPublic: true },
                controller:"cityNav"
            })
            //////////////////
            //  city > item //
            //////////////////
            .state('city.list',{
                url:'/{cityId:[0-9]{0,4}}',
                templateUrl:'html/city/city.html',
                data: { isPublic: true },
            })

})
.controller("tempCtr",['$scope',"$location",function($scope,$location){
}]);