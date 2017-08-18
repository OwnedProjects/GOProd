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
		var loginObj = {
			user_name: vm.usernm, 
			password: vm.passwd
		}
		LoginService.checkLogin(loginObj)
			.then(function(response){
				console.log(response);
				//$state.go('home');
			})
			.catch(function(err){
				//LogService.setError("Login failed.").then(function(){});
			});
	};
};