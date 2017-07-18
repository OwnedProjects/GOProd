angular.module('GreenApp').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('dashboard', {
            url: '/dashboard',
		component: 'dashboardComponent'
	});
})
.component('dashboardComponent', {
  templateUrl: 'components/dashboardComponent/dashboard.html',
  controller: DashboardController,
  controllerAs: "dashboardctrl"
});

function DashboardController(){
    //alert('asdfasd');
};