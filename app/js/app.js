angular.module('GreenApp', ['ui.router']).config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
});	