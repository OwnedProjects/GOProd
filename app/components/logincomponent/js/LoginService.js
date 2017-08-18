angular.module('GreenApp')
	.service("LoginService", LoginService);

LoginService.$inject = ["$q", "$http"];
	
function LoginService($q, $http){
	var vm = this;
	vm.checkLogin = checkLogin;
	
	function checkLogin(loginObj){
		return $q(function(resolve, reject) {
			 $http({
				method: "POST",
				url: "db/user.php?action=getUsers",
				data: loginObj,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function successCallback(response){
				resolve(response)
			}).catch(function errorCallback(error){
				reject(error);
			})
		});
	}
}