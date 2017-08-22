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
    vm.logedInUser = null;
    vm.init = init;
    vm.logout = logout;
        
    $state.go('home.despatches');

    function logout(){
      vm.logedInUser = null;
    }

    function init(){
      vm.logedInUser = sessionStorage.getItem('userlist');
      if(vm.logedInUser == undefined){
          $state.go('home.login');
      }
    }

    vm.init();
};