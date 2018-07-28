angular.module('logger', []).provider('Logger', [function () {
        var isLogEnabled = true;
        var isWarnEnabled = true;
        var isErrorEnabled = true;
        var isDebugEnabled = true;

        this.log = function (_isEnabled) {
            isLogEnabled = !!_isEnabled;
        };
        this.warn = function (_isEnabled) {
            isWarnEnabled = !!_isEnabled;
        };
        this.error = function (_isEnabled) {
            isErrorEnabled = !!_isEnabled;
        };
        this.debug = function (_isEnabled) {
            isDebugEnabled = !!_isEnabled;
        };

        this.$get = ['$log', function ($log) {

                var Logger = function (context) {
                    this.context = context;
                };
                Logger.getInstance = function (context) {

                    return new Logger(context);
                };
                Logger.supplant = function (str, o) {
                    return str.replace(
                            /\{([^{}]*)\}/g,
                            function (a, b) {
                                var r = o[b];
                                return typeof r === 'string' || typeof r === 'number' ? r : a;
                            }
                    );
                };
                Logger.getFormattedTimestamp = function (date) {
                    return Logger.supplant('{0}:{1}:{2}:{3}', [
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds(),
                        date.getMilliseconds()
                    ]);
                };
                Logger.prototype = {
                    _log: function (originalFn, args) {
                        if ((originalFn == 'log' && !isLogEnabled) || (originalFn == 'warn' && !isWarnEnabled) || (originalFn == 'debug' && !isDebugEnabled) || (originalFn == 'error' && !isErrorEnabled)) {
                            return;
                        }

                        var now = Logger.getFormattedTimestamp(new Date());
                        var message = '', supplantData = [];
                        switch (args.length) {
                            case 1:
                                message = Logger.supplant("{0} - {1}: {2}", [now, this.context, args[0]]);
                                break;
                            case 3:
                                supplantData = args[2];
                                message = Logger.supplant("{0} - {1}::{2}(\'{3}\')", [now, this.context, args[0], args[1]]);
                                break;
                            case 2:
                                if (typeof args[1] === 'string') {
                                    message = Logger.supplant("{0} - {1}::{2}(\'{3}\')", [now, this.context, args[0], args[1]]);
                                } else {
                                    supplantData = args[1];
                                    message = Logger.supplant("{0} - {1}: {2}", [now, this.context, args[0]]);
                                }
                                break;
                        }

                        $log[originalFn].call(null, Logger.supplant(message, supplantData));
                    },
                    log: function () {
                        this._log('log', arguments);
                    },
                    info: function () {
                        this._log('info', arguments);
                    },
                    warn: function () {
                        this._log('warn', arguments);
                    },
                    debug: function () {
                        this._log('debug', arguments);
                    },
                    error: function () {
                        this._log('error', arguments);
                    }
                };
                return Logger;
            }];
    }]);