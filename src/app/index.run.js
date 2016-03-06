(function() {
  'use strict';

  angular
    .module('tplx')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, TemplatesService) {
    TemplatesService.initTemplates();
    $log.debug('runBlock end');
  }

})();
