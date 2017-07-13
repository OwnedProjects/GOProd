angular.module('GreenApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
  var helloState = {
    name: 'login',
    url: '/login',
    component: 'loginComponent'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    component: 'dashboardComponent'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  
  $urlRouterProvider.otherwise('/login');
});