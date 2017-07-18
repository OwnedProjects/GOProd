angular.module('GreenApp').component('loginComponent', {
  templateUrl: 'components/logincomponent/login.html',
  controller: LoginController,
  controllerAs: "loginctrl"
});

LoginController.$inject = ["LoginService", "$state"];

function LoginController(LoginService, $state){
	var vm = this;
	vm.signin = signin;
	
	function signin(){
		LoginService.checkLogin(vm.usernm, vm.passwd)
			.then(function(response){
				 $state.go('home')
			})
			.catch(function(err){
				alert("Login failed need to create a popup");
			});
	};
};