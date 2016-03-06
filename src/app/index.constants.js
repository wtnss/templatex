(function() {
  'use strict';

  angular
    .module('tplx')
    .constant('TEMPLATE_URL', './assets/templates.json')
    .constant('LOCAL_STORAGE_TEMPLATES', 'tplx_templates')
    .constant('LOCAL_STORAGE_DEFAULTS', 'tplx_defaults')
    .constant('TEMPLATE_CONSTANTS', {
      headline1: '###HEADLINE1###',
      headline2: '###HEADLINE2###',
      img: '###IMG###',
      source: '###SOURCE###',
      text: '###TEXT###',
      comment: '###COMMENT###'
    });

})();
