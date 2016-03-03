/**
 * Created by qbl on 2015/11/25.
 */
'use strict';
define(['require',
        'angualr',
        'angular-route',
        'bootstrap',
        'jquery',
        'app'
], function (require, angular) {

    require(['domReady!'],function(document){
        angular.utils(document,['gaokaoAPP'])
    })
})