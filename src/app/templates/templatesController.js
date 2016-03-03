(function() {
  'use strict';

  angular
    .module('newsmaker')
    .controller('TemplatesController', TemplatesController);

  /** @ngInject */
  function TemplatesController(TemplatesService, TEMPLATE_CONSTANTS) {
    var vm = this;

    vm.addTemplateDto = {};
    vm.selectedChangeTemplate = {};
    vm.alert = {};
    vm.isCollapsedConstants = true;
    vm.isCollapsedStorage = true;
    vm.addTemplate = addTemplate;
    vm.changeTemplate = changeTemplate;
    vm.deleteTemplate = deleteTemplate;
    vm.getTemplates = getTemplates;
    vm.getTemplateConstants = getTemplateConstants;
    vm.closeAlert = closeAlert;

    function addTemplate() {
      TemplatesService.setLocalStorageTemplate(vm.addTemplateDto.name, vm.addTemplateDto.code);
      createAlert('success', 'Template \"' + vm.addTemplateDto.name + '\" wurde gespeichert.');
      vm.addTemplateDto = {};
    }

    function changeTemplate() {
      TemplatesService.setLocalStorageTemplate(vm.selectedChangeTemplate.name, vm.selectedChangeTemplate.code);
      createAlert('success', 'Template \"' + vm.selectedChangeTemplate.name + '\" wurde gespeichert.');
    }

    function deleteTemplate() {
      TemplatesService.removeLocalStorageTemplate(vm.selectedChangeTemplate.name);
      createAlert('success', 'Template \"' + vm.selectedChangeTemplate.name + '\" wurde gelöscht.');
    }

    function getTemplates() {
      return TemplatesService.getTemplates();
    }

    function getTemplateConstants() {
      return TEMPLATE_CONSTANTS;
    }

    function createAlert(type, message) {
      vm.alert = {
        type: type,
        msg: message
      };
    }

    function closeAlert() {
      vm.alert = {}
    }
  }
})();
