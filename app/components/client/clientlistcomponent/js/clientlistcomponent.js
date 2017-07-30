angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.clientlist', {
        url: '/clientlist',
        component: 'clientlistComponent'
    });
})
.component('clientlistComponent', {
    templateUrl: 'components/client/clientlistcomponent/clientlist.html',
    controller: ClientlistController,
    controllerAs: 'clientlistCtrl',
})

ClientlistController.$inject = ["ClientService", "LogService"];

function ClientlistController(ClientService, LogService){
	var vm = this;
	vm.clients = null;
	vm.editmodalFlag = false;
	vm.deletemodalFlag = false;
	vm.editModal = editModal;
	vm.init = init;

	function editModal(){
		vm.editmodalFlag = !vm.editmodalFlag;
	}

	function deleteModal(){
		vm.deletemodalFlag = !vm.deletemodalFlag;
	}

	function init(){
		ClientService.getClients()
			.then(function(response){
				vm.clients = response.Clients;
				console.log(vm.clients);
				LogService.setSuccess('Clients pulled!');
			})
			.catch(function(err){
				LogService.setError('Currently there are no clients!');
			})
	}

	vm.init();
};