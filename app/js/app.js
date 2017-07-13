angular.module('GreenApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
  var helloState = {
    name: 'login',
    url: '/login',
    component: 'loginComponent'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  
  $urlRouterProvider.otherwise('/login');
});