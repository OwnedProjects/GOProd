angular.module('GreenApp')
	.service("LoginService", LoginService);

LoginService.$inject = ["$q"];
	
function LoginService($q){
	var vm = this;
	vm.checkLogin = checkLogin;
	
	function checkLogin(unm, pwd){
		return $q(function(resolve, reject) {
			if(unm == "admin" && pwd == "admin"){
				resolve(true);
			}
			else{
				reject(false);
			}
		});
	}
}