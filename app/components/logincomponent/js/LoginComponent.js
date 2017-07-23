angular.module('GreenApp').config(function($stateProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			component: 'loginComponent'
	});
})
.component('loginComponent', {
  templateUrl: 'components/logincomponent/login.html',
  controller: LoginController,
  controllerAs: "loginctrl"
});

LoginController.$inject = ["LoginService", "$state", "LogService"];

function LoginController(LoginService, $state, LogService){
	var vm = this;
	vm.signin = signin;

	function signin(){
		LoginService.checkLogin(vm.usernm, vm.passwd)
			.then(function(response){
				LogService.setSuccess("Login Success").then(function(response){});
				$state.go('home');
			})
			.catch(function(err){
				LogService.setError("Login failed.").then(function(){});
			});
	};
};