/**
 * Created by qbl on 2015/11/25.
 */
define(['require',
        'angualr',
        'angular-route',
        'bootstrap',
        'jquery',
        'app'
], function (require, angular) {
    'use strict';
    require(['domReady!'],function(document){
        angular.utils(document,['gaokaoAPP'])
    })
})