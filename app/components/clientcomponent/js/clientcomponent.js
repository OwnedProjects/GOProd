angular.module('GreenApp').config(function($stateProvider) {
	$stateProvider
		.state('home.client', {
			url: '/client',
			component: 'clientComponent'
	});
})
.component('clientComponent', {
  templateUrl: 'components/clientcomponent/clientcomponent.html',
  controller: ClientController,
  controllerAs: "clientctrl"
});

function ClientController(){
    
}