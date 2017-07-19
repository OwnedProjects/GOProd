angular.module('GreenApp')
	.service("LogService", LogService);

LogService.$inject = ["$rootScope", "$timeout", "$q"];
	
function LogService($rootScope, $timeout, $q){
	var vm = this;
	vm.setSuccess = setSuccess;
	vm.setError = setError;
	vm.init = init;
		
	function setSuccess(msg){
		return $q(function(resolve, reject) {
			$rootScope.log.success.push({label: msg});
			$timeout(function(){
				$rootScope.log.success.shift();
				resolve(true);
			},5000);
		});
	}
		
	function setError(msg){
		return $q(function(resolve, reject) {
			$rootScope.log.error.push({label: msg});
			$timeout(function(){
				$rootScope.log.error.shift();
				resolve(true);
			},5000);
		});
	}
	
	function init(){		
		$rootScope.log = {
			success: new Array(),
			error: new Array(),
			info: new Array(),
			warning: new Array()
		}
	};
	
	vm.init();
}