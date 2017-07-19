angular.module('GreenApp').config(function($stateProvider) {
	$stateProvider
		.state('home.dashboard', {
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