angular.module('GreenApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('login', {
            url: '/login',
		component: 'loginComponent'
	})
	.state('home', {
            url: '/home',
		component: 'dashboardComponent'
	});
	
	$urlRouterProvider.otherwise('/login');
});