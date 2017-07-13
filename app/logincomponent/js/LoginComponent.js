(function(angular) {
  'use strict';
angular.module('GreenApp').component('loginComponent', {
  templateUrl: 'logincomponent/logincomponent.html',
  bindings: {
    hero: '='
  },
  controller: LoginController
});

function LoginController(){
	alert("Test")
}
})(window.angular);