'use strict';
var AngularLessons = {};
var App = angular.module('AdditiveManufacturing', ['ngRoute', 'AngularLessons.directives', 'AngularLessons.services', 'AngularLessons.filters']).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        
    }]);

// constants

App.constant('URL_LINKS', {
    path: '/AdditiveManufacturing/'
});
App.run(function ($rootScope, $http, $timeout,$interval) {
    $rootScope.notifier = function (params, callback) {
        $rootScope.error = {}
        $rootScope.error.type = params.type || "message"; //there is also a confirm type which shows Yes and No buttons
        $rootScope.error.title = params.title || "error";
        $rootScope.error.choices = params.choices || [];
        $rootScope.error.notification = params.notification || "Oops! Something went wrong!";
        $("#error-module").modal('show');

        if (params.title == "timeout") {
            $timeout(function () {
                $user.logout();
            }, 2000)
        }

        $rootScope.errorResolution = function (status, value) {
            $("#error-module").modal('hide');
            callback(status, value);
        }
    }
    $rootScope.confirmationAlert = function (params) {
        $rootScope.confirmation = {}
        $rootScope.confirmation.title = params.title || "success";
        $rootScope.confirmation.notification = params.notification;
        $("#confirmation-module").modal('show');
        $timeout(function () {
            $("#confirmation-module").modal('hide');
        }, 2000);
    }
});