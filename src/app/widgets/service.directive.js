'use strict';

angular.module('mopify.widgets.directive.service', [
    'mopify.services.servicemanager'
])

.directive('mopifyService', function($rootScope, ServiceManager) {

    return {
        restrict: 'E',
        scope: {
            service: '='
        },
        templateUrl: 'widgets/service.directive.tmpl.html',
        link: function(scope, element, attrs) {
                
            /**
             * Get the current service and extend it's connection state
             */
            scope.service.connected = ServiceManager.isEnabled(scope.service);

            /**
             * Connect the service with mopify
             */
            scope.connectService = function(){
                ServiceManager.enableService(scope.service);
                scope.service.connected = !scope.service.connected;
            };

            /**
             * Disconnect the service from mopify
             */
            scope.disconnectService = function(){
                ServiceManager.disableService(scope.service);
                scope.service.connected = !scope.service.connected;
            };

        }
    };

});