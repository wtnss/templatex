(function() {
  'use strict';

  angular
    .module('newsmaker')
    .factory('MainService', mainService);

  function mainService(TEMPLATE_CONSTANTS) {


    //////////////////////////////////////////////////////////////////////////////////////////////////
    var service = {
      createCode: createCode
    };

    return service;
    //////////////////////////////////////////////////////////////////////////////////////////////////

    function createCode(newsDto) {
      var bbCode = newsDto.selectedTemplate.code;
      angular.forEach(TEMPLATE_CONSTANTS, function(value, key) {
        if (angular.isUndefined(newsDto[key])) {
          newsDto[key] = '';
        }
        bbCode = bbCode.replace(value, newsDto[key]);
      });
      return bbCode;
    }

  }
})();
