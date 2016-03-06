(function() {
  'use strict';

  angular
    .module('tplx')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('templates', {
        url: '/templates',
        templateUrl: 'app/templates/templates.html',
        controller: 'TemplatesController',
        controllerAs: 'templates'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
