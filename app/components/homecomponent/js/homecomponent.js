angular.module('GreenApp').config(function($stateProvider) {
	$stateProvider
		.state('home', {
      url: '/home',
      component: 'homeComponent'
	});
})
.component('homeComponent', {
  templateUrl: 'components/homecomponent/home.html',
  controller: HomeController,
  controllerAs: "homectrl"
});

HomeController.$inject = ["$state"];

function HomeController($state){
    var vm = this;
    vm.isToggle = false;
    $state.go('home.purchase');
};