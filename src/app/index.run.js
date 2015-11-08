(function() {
  'use strict';

  angular
    .module('newsmaker')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
