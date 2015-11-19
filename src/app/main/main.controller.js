(function() {
  'use strict';

  angular
    .module('newsmaker')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(MainService, $uibModal) {
    var vm = this;

    vm.newsDto = {};
    vm.bbCode = '';
    vm.clear = clear;
    vm.createCode = createCode;
    vm.initTemplate = initTemplate;

    function clear() {
      vm.newsDto = {};
    }

    function createCode() {
      vm.bbCode = MainService.createCode(vm.newsDto);

      $uibModal.open({
        animation: true,
        templateUrl: 'bbCodeModal.html',
        controller: 'ModalInstanceController',
        controllerAs: 'modali',
        size: 'lg',
        resolve: {
          bbCode: function () {
            return vm.bbCode;
          },
          title: function () {
            return 'News: BB-Code!';
          }
        }
      });
    }

    function initTemplate() {
      MainService.initTemplate();
    }
    vm.initTemplate();
  }
})();
