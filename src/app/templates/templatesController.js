(function() {
  'use strict';

  angular
    .module('tplx')
    .controller('TemplatesController', TemplatesController);

  /** @ngInject */
  function TemplatesController(TemplatesService) {
    var vm = this;

    vm.addTemplateDto = {};
    vm.selectedChangeTemplate = {};
    vm.alert = {};
    vm.collapse = {
      variables: true,
      storage: true,
      defaults: true
    };
    vm.defaults = false;
    vm.addTemplate = addTemplate;
    vm.changeTemplate = changeTemplate;
    vm.deleteTemplate = deleteTemplate;
    vm.getTemplates = getTemplates;
    vm.getDefaultTemplateSettings = getDefaultTemplateSettings;
    vm.changeDefaultTemplateSettings = changeDefaultTemplateSettings;
    vm.closeAlert = closeAlert;

    function addTemplate() {
      TemplatesService.addLocalStorageTemplate(vm.addTemplateDto);
      createAlert('success', 'Template \"' + vm.addTemplateDto.name + '\" wurde gespeichert.');
      vm.addTemplateDto = {};
    }

    function changeTemplate() {
      TemplatesService.changeLocalStorageTemplate(vm.selectedChangeTemplate);
      createAlert('success', 'Template \"' + vm.selectedChangeTemplate.name + '\" wurde gespeichert.');
    }

    function deleteTemplate() {
      TemplatesService.removeLocalStorageTemplate(vm.selectedChangeTemplate);
      createAlert('success', 'Template \"' + vm.selectedChangeTemplate.name + '\" wurde gelöscht.');
    }

    function getTemplates() {
      return TemplatesService.getTemplates();
    }

    function getDefaultTemplateSettings() {
      return TemplatesService.isDefaultTemplatesDisabled();
    }

    function changeDefaultTemplateSettings() {
      TemplatesService.setLocalStorageDefaultTemplates();
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
