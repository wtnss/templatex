(function() {
  'use strict';

  angular
    .module('newsmaker')
    .constant('TEMPLATE_URL', './assets/templates.json')
    .constant('LOCAL_STORAGE_PREFIX', 'ntmpl_')
    .constant('TEMPLATE_CONSTANTS', {
      headline1: '###HEADLINE1###',
      headline2: '###HEADLINE2###',
      img: '###IMG###',
      source: '###SOURCE###',
      text: '###TEXT###',
      comment: '###COMMENT###'
    });

})();
