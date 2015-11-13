(function() {
  'use strict';

  angular
    .module('newsmaker')
    .factory('MainService', mainService);

  function mainService($http, $log) {
    var template = undefined;
    var templateUrl = '/assets/template';
    var templateConstants = {
      headline1: '###HEADLINE1###',
      headline2: '###HEADLINE2###',
      img: '###IMG###',
      source: '###SOURCE###',
      text: '###TEXT###',
      comment: '###COMMENT###'
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    var service = {
      createCode: createCode,
      getTemplate: getTemplate,
      initTemplate: initTemplate
    };

    return service;
    //////////////////////////////////////////////////////////////////////////////////////////////////

    function createCode(data) {
      var bbCode = template;
      angular.forEach(templateConstants, function(value, key) {
        bbCode = bbCode.replace(value, data[key]);
      });
      return bbCode;
    }

    function getTemplate() {
      return template;
    }

    function initTemplate() {
      $http.get(templateUrl).success(function(data) {
        template = data.replace('###TEMPLATE###\n', '');
        $log.info('MainService.initTemplate: Successfully initilialized template');
      }).error(function(error) {
        $log.error('MainService.initTemplate: Error initializing template. ' + error);
      });
    }


  }
})();
