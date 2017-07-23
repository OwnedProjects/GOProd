angular.module('GreenApp')
	.service("LogService", LogService);

LogService.$inject = ["$rootScope", "$timeout", "$q", "$http"];
	
function LogService($rootScope, $timeout, $q, $http){
	var vm = this;
	vm.setSuccess = setSuccess;
	vm.setError = setError;
	vm.init = init;
		
	function setSuccess(msg, data){
		return $q(function(resolve, reject) {
			$rootScope.log.success.push({label: msg});
			var dt = new Date();
			var filedata;
			if(data != undefined){
				filedata = {
					filenm: "log_success_"+dt.getDate()+"_"+(dt.getMonth()+1)+"_"+dt.getFullYear()+".txt",
					fdata: "(" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ") - " + msg + " - " + data
				};
			}
			else{
				filedata = {
					filenm: "log_success_"+dt.getDate()+"_"+(dt.getMonth()+1)+"_"+dt.getFullYear()+".txt",
					fdata: "(" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ") - " + msg
				};
			}
			console.log(filedata);
			$http({
                method: 'POST',
                url: 'db/create-logs.php?action=filelog',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: filedata
            }).then(function successCallback(response) {
				$timeout(function(){
					$rootScope.log.success.shift();
					resolve(true);
				},3000);
            }, function errorCallback(error) {
				$timeout(function(){
					console.log(error)
					reject (error)
				},3000);
            });
		});
	}
		
	function setError(msg, data){
		return $q(function(resolve, reject) {
			$rootScope.log.error.push({label: msg});
			var dt = new Date();
			var filedata;
			if(data != undefined){
				filedata = {
					filenm: "log_error_"+dt.getDate()+"_"+(dt.getMonth()+1)+"_"+dt.getFullYear()+".txt",
					fdata: "(" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ") - " + msg + " - " + data
				};
			}
			else{
				filedata = {
					filenm: "log_error_"+dt.getDate()+"_"+(dt.getMonth()+1)+"_"+dt.getFullYear()+".txt",
					fdata: "(" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ") - " + msg
				};
			}
			console.log(filedata);
			$http({
                method: 'POST',
                url: 'db/create-logs.php?action=filelog',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: filedata
            }).then(function successCallback(response) {
				$timeout(function(){
					$rootScope.log.error.shift();
					resolve(true);
				},3000);
            }, function errorCallback(error) {
				$timeout(function(){
					console.log(error)
					reject (error)
				},3000);
            })
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