'use strict';

/* Filters */

var AppFilters = angular.module('AngularLessons.filters', []);

AppFilters.filter('trustAsHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});
AppFilters.filter('canvote', function () {
    return function (data, age) {
        var filterd = [];
        if (!age) {
            age = 18;
        }
        for (var i = 0; i < data.length; i++) {
            var value = data[i];
            if (value.voterage >= age) {
                filterd.push(value);
            }
        }
        return filterd;
    }
});