angular.module('GreenApp', ['ui.router', 'ngAnimate']).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');
});	