'use strict';

/* Directives */

var AppDirectives = angular.module('AngularLessons.directives', []);

AppDirectives.directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

AppDirectives.directive('validSubmit', ['$parse', function ($parse) {
        return {
            // we need a form controller to be on the same element as this directive
            // in other words: this directive can only be used on a &lt;form&gt;
            require: 'form',
            // one time action per form
            link: function (scope, element, iAttrs, form) {
                form.$submitted = false;

                // get a hold of the function that handles submission when form is valid
                var fn = $parse(iAttrs.validSubmit);

                // register DOM event handler and wire into Angular's lifecycle with scope.$apply
                element.on('submit', function (event) {
                    scope.$apply(function () {
                        // on submit event, set submitted to true (like the previous trick)
                        form.$submitted = true;

                        // if form is valid, execute the submission handler function and reset form submission state
                        if (form.$valid) {
                            fn(scope, {$event: event});
                            form.$submitted = false;
                        }
                    });
                });
            }
        };
    }
]);

AppDirectives.directive('datetimez', function () {// used in RCA datetime both
    return {
        restrict: 'A', // A match with only matches attribute name , E Element Name, C Class name
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {//Directives that want to modify the DOM #Link do the Job
            var options = {format: 'M d, yyyy'};
            if (element.hasClass('no-previous')) {
                options.beforeShowDay = function (date) {
                    var curDate = new Date();
                    curDate.setHours(0, 0, 0, 0);
                    return (date >= curDate);
                }
            }
            element.datepicker(options);
            element.datepicker().on('changeDate', function (e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});
AppDirectives.directive("ngcEatClick", function factory() {
    return function (scope, element, attrs) {
        element.click(function (e) {
            e.stopPropagation();
        });
    }
});
AppDirectives.directive('ngcSortable', function factory() {
    return function (scope, element, attrs) {	// attribute ngc-sortable-on-update calls a passed in function
        scope.$watch(attrs.ngcSortable, function ngWatchAction(value) {
            var options = {
                cancel: 'input,textarea,button,select,option,.new-tag', //Prevents sorting if you start on elements matching the selector.
                containment: "parent",
                items: '> *:not(.static)',
                start: function (e, ui) {
                    ui.item.data('start', ui.item.index());//ui.item.index() get index & stored in start
                    ui.item.parent().css('overflow', 'auto');
                },
                update: function (e, ui) {
                    var start = ui.item.data('start'),
                            end = ui.item.index();
                    value.splice(end, 0, value.splice(start, 1)[0]);
                    scope.$apply();
                    if (attrs.ngcSortableOnUpdate)
                        scope.$eval(attrs.ngcSortableOnUpdate);
                }
            }
            if (element.find(".ngc-sortable-handle").length > 0)
                options.handle = ".ngc-sortable-handle";
            element.sortable(options);
        });
    }
});
AppDirectives.directive('isolatedScopeWithTransclusion', function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            tasks: '=',
            add:'&'
        },
        controller: function ($scope) {
            $scope.addTask = function () {
                
                $scope.add();
                if (!$scope.tasks)
                    $scope.tasks = [];

                $scope.tasks.push({
                    title: $scope.title
                });

            };
        },
        template: '<div>Name: <input type="text" ng-model="title" />&nbsp;' +
                '<button ng-click="addTask()">Add Task</button>' +
                '<div class="taskContainer"><br />' +
                '<ng-transclude></ng-transclude>' +
                '</div></div>'
    };
});
AppDirectives.directive('myIsolatedScopeWithName', function () {
    return {
        scope: {
            name: '@'
        },
        template: 'Name: {{ name }}'
    };
});

AppDirectives.directive('myIsolatedScopeWithModelAndFunction', function () {
    return {
        scope: {
            datasource: '=',
            action: '&'
        },
        template: '<ul><li ng-repeat="kj in datasource">{{ kj }}</li></ul> ' +
                  '<button ng-click="action()">Change Data</button>'
    };
});