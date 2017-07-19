angular.module('GreenApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']).config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
});	