(function() {
  'use strict';

  angular
    .module('newsmaker')
    .factory('TemplatesService', templatesService);

  function templatesService($http, $log, LOCAL_STORAGE_PREFIX, TEMPLATE_URL) {
    var templates = [];

    //////////////////////////////////////////////////////////////////////////////////////////////////
    var service = {
      getTemplates: getTemplates,
      initTemplates: initTemplates,
      setLocalStorageTemplate: setLocalStorageTemplate,
      removeLocalStorageTemplate: removeLocalStorageTemplate
    };

    return service;
    //////////////////////////////////////////////////////////////////////////////////////////////////

    function getTemplates() {
      return templates;
    }

    function initTemplates() {
      // step 1: fetch templates.json
      $http.get(TEMPLATE_URL).success(function(data) {
        templates = data.templates;

        // step 2: fetch local storage
        readLocalStorage();
        $log.info('TemplatesService.initTemplate: Successfully initilialized template');
      }).error(function(error) {
        $log.error('TemplatesService.initTemplate: Error initializing template. ' + error);
      });
    }

    function readLocalStorage() {
      for(var key in localStorage) {
        if (key.startsWith(LOCAL_STORAGE_PREFIX)) {
          templates.push({
            name: key.replace(LOCAL_STORAGE_PREFIX, ''),
            locked: false,
            code: localStorage[key]
          });
        }
      }
    }

    function setLocalStorageTemplate(name, code) {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + name, code);
      initTemplates();
    }

    function removeLocalStorageTemplate(name) {
      localStorage.removeItem(LOCAL_STORAGE_PREFIX + name);
      initTemplates();
    }
  }
})();
