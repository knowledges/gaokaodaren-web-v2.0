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
                templateUrl:'html/temp/tempCity.html'
            })
            ///////////////////
            ///  city > nav ///
            //////////////////
            .state('city.nav',{
                url:'/',
                templateUrl:'html/nav/nav.html',
                controller:"cityNav"
            })
            ///////////////////
            ///  city > item ///
            //////////////////
            .state('city.list',{
                url:'/{cityId:[0-9]{0,4}}',
                templateUrl:'html/city/city.html'
            })

})
.controller("tempCtr",['$scope',"$location",function($scope,$location){
}]);