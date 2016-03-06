  (function() {
  'use strict';

  angular
    .module('tplx')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(MainService, TemplatesService, $uibModal) {
    var vm = this;

    vm.selectedTemplate = {};
    vm.bbCode = '';
    vm.clear = clear;
    vm.createCode = createCode;
    vm.getTemplates = getTemplates;

    function clear() {
      angular.forEach(vm.selectedTemplate.variables, function(object) {
        object.value = undefined;
      });
    }

    function createCode() {
      vm.bbCode = MainService.createCode(vm.selectedTemplate);

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
            return 'Your TemplateX Code';
          }
        }
      });
    }

    function getTemplates() {
      return TemplatesService.getTemplates();
    }
  }
})();
