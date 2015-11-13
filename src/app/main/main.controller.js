(function() {
  'use strict';

  angular
    .module('newsmaker')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(MainService) {
    var vm = this;

    vm.newsDto = {};
    vm.bbCode = '';
    vm.createCode = createCode;
    vm.initTemplate = initTemplate;

    function createCode() {
      vm.bbCode = MainService.createCode(vm.newsDto);
    }

    function initTemplate() {
      MainService.initTemplate();
    }
    vm.initTemplate();
  }
})();
