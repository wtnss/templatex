(function() {
  'use strict';

  angular
    .module('tplx')
    .factory('TemplatesService', templatesService);

  function templatesService($http, $log, LOCAL_STORAGE_DEFAULTS, LOCAL_STORAGE_TEMPLATES, TEMPLATE_URL) {
    var defaultTemplates = [];
    var storedTemplates = [];
    var defaults = {isDisabled: false};

    //////////////////////////////////////////////////////////////////////////////////////////////////
    var service = {
      getTemplates: getTemplates,
      initTemplates: initTemplates,
      addLocalStorageTemplate: addLocalStorageTemplate,
      changeLocalStorageTemplate: changeLocalStorageTemplate,
      removeLocalStorageTemplate: removeLocalStorageTemplate,
      isDefaultTemplatesDisabled: isDefaultTemplatesDisabled,
      setLocalStorageDefaultTemplates: setLocalStorageDefaultTemplates
    };

    return service;
    //////////////////////////////////////////////////////////////////////////////////////////////////

    function getTemplates() {
      var templates  = [];
      if (angular.isDefined(defaultTemplates) && !defaults.isDisabled) {
        templates = templates.concat(defaultTemplates);
      }
      if (angular.isDefined(storedTemplates)) {
        templates = templates.concat(storedTemplates);
      }
      return templates;
    }

    function initTemplates() {
      // step 1: fetch templates.json
      $http.get(TEMPLATE_URL).success(function(data) {
        defaultTemplates = data.templates;

        // step 2: fetch templates from local storage
        readLocalStorage();

        // step 3: extract placeholders from templates code
        addTemplateVariables();
        $log.info('TemplatesService.initTemplates: Successfully initilialized templates');
      }).error(function(error) {
        $log.error('TemplatesService.initTemplates: Error initializing templates. ' + error);
      });
    }

    function readLocalStorage() {
      var storage = localStorage.getItem(LOCAL_STORAGE_TEMPLATES);
      if (angular.isDefined(storage) && storage !== null) {
        storedTemplates = angular.fromJson(storage);
      }
    }

    function addTemplateVariables() {
      angular.forEach(getTemplates(), function(template) {
        var variables = [];
        var placeholders = template.code.match(/(###)(.*?)(###)/g);
        angular.forEach(placeholders, function(placeholder) {
          var name = placeholder.match(/[^#|]+/g);
          if (name.length > 1) {
            variables.push({
              name: name[0],
              placeholder: placeholder,
              type: 'textarea',
              size: name[1]
            });
          } else {
            variables.push({
              name: name[0],
              placeholder: placeholder,
              type: 'text'
            });
          }
        });
        template.variables = variables;
      });
    }

    function addLocalStorageTemplate(template) {
      storedTemplates.push({
        name: template.name,
        category: template.category,
        locked: false,
        code: template.code
      });
      setLocalStorageItem(storedTemplates);
    }

    function changeLocalStorageTemplate(template) {
      var index = storedTemplates.indexOf(template);
      storedTemplates[index] = {
        name: template.name,
        category: template.category,
        locked: false,
        code: template.code
      };
      setLocalStorageItem(storedTemplates);
    }

    function removeLocalStorageTemplate(template) {
      var index = storedTemplates.indexOf(template);
      storedTemplates.splice(index, 1);
      setLocalStorageItem(storedTemplates);
    }

    function setLocalStorageItem(templates) {
      angular.forEach(templates, function(object) {
        object.variables = undefined;
      });
      localStorage.setItem(LOCAL_STORAGE_TEMPLATES, angular.toJson(templates));
      initTemplates();
    }

    function isDefaultTemplatesDisabled(option) {
      var storage = localStorage.getItem(LOCAL_STORAGE_DEFAULTS, option);
      if (angular.isDefined(storage) && storage !== null) {
        defaults.isDisabled = angular.fromJson(storage);
      }
      return defaults;
    }

    function setLocalStorageDefaultTemplates() {
      localStorage.setItem(LOCAL_STORAGE_DEFAULTS, angular.toJson(defaults.isDisabled));
    }
  }
})();
