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
  controllerAs: "homeCtrl"
});

HomeController.$inject = ["$state"];

function HomeController($state){
    var vm = this;
    vm.isToggle = false;
    vm.init = init;
    vm.logedInUser = null;
        
    $state.go('home.despatches');

    function init(){
      vm.logedInUser = sessionStorage.getItem('userlist');
      if(vm.logedInUser == undefined){
          $state.go('home.login');
      }
    }

    vm.init();
};