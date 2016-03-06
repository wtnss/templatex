(function () {
  'use strict';

  angular
    .module('tplx')
    .controller('ModalInstanceController', ModalInstanceController);

  function ModalInstanceController($uibModalInstance, bbCode, title) {
    var vm = this;

    vm.bbCode = bbCode;
    vm.title = title;
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      $uibModalInstance.close();
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
