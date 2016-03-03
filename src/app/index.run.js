(function() {
  'use strict';

  angular
    .module('newsmaker')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, TemplatesService) {
    TemplatesService.initTemplates();
    $log.debug('runBlock end');
  }

})();
