/**
 * Created by qbl on 2015/9/26.
 */
'use strict';

(function(){

    $.getParam = function(name, scope) {
        var arr,
            reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");

        if (scope) {
            arr = scope.match(reg);
        } else {
            arr = window.location.search.substr(1).match(reg);
        }

        if (arr) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    };
})(window);
