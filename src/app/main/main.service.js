(function() {
  'use strict';

  angular
    .module('tplx')
    .factory('MainService', mainService);

  function mainService() {


    //////////////////////////////////////////////////////////////////////////////////////////////////
    var service = {
      createCode: createCode
    };

    return service;
    //////////////////////////////////////////////////////////////////////////////////////////////////

    function createCode(selectedTemplate) {
      var bbCode = selectedTemplate.code;
      angular.forEach(selectedTemplate.variables, function(object) {
        if (angular.isUndefined(object.value)) {
          object.value = '';
        }
        bbCode = bbCode.replace(object.placeholder, object.value);
      });
      return bbCode;
    }

  }
})();
