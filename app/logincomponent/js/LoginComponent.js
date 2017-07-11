(function(angular) {
  'use strict';
angular.module('heroApp').component('heroDetail', {
  templateUrl: 'logincomponent/logincomponent.html',
  bindings: {
    hero: '='
  }
});
})(window.angular);