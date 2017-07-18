angular.module('GreenApp', ['ui.router', 'ngAnimate']).config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
});	