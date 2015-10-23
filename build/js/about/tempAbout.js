/**
 * Created by qbl on 2015/10/23.
 */
/**
 * Created by qbl on 2015/10/19.
 */
angular.module("gaokaoAPP.about",['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            ///////////////
            ///  city  ///
            /////////////
            .state('about', {
                url: '/about',
                templateUrl:'html/about/about.html'
            })
            ///////////////////
            ///  city > nav ///
            //////////////////
            .state('about.nav',{
                url:'/',
                templateUrl:'html/nav/nav.html',
                controller:"aboutNav"
            })
    })
