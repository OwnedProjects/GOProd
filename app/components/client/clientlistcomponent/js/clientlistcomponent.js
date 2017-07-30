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
	vm.selectedClient = null;
	vm.editmodalFlag = false;
	vm.deletemodalFlag = false;
	vm.init = init;
	vm.editModal = editModal;
	vm.deleteModal = deleteModal;
	vm.hideModal = hideModal;
	vm.updateClient = updateClient;
	vm.deleteClient = deleteClient;

	function editModal(client){
		vm.editmodalFlag = true;
		vm.selectedClient = client;
		vm.modName = client.client_name;
		vm.modVat = client.vat_no;
		vm.modCity = client.city;
		vm.modState = client.state;
		vm.modContactPerson = client.contact_person;
		vm.modContactNo = client.contact_no;
		vm.modAddress = client.address;
	}

	function hideModal(){
		vm.editmodalFlag = false;
		vm.selectedClient = null;
		vm.deletemodalFlag = false;
	}

	function updateClient(){
		var tmp = {
			client_id: vm.selectedClient.client_id,
			client_name: vm.modName,
			vat_no: vm.modVat,
			city : vm.modCity,
			state: vm.modState,
			contact_person: vm.modContactPerson,
			contact_no: vm.modContactNo,
			address: vm.modAddress
		};

		ClientService.updateClient(tmp)
			.then(function(response){
				vm.hideModal();
				vm.init();
				LogService.setSuccess("Client Updated");
			})
			.catch(function(error){
				console.log(error)
			})
		console.log(tmp);
	}


	function deleteModal(client){
		vm.selectedClient = client;
		vm.deletemodalFlag = true;
	}

	function deleteClient(){
		var tmp = {
			client_id: vm.selectedClient.client_id
		}

		ClientService.deactivateClient(tmp)
			.then(function(response){
				vm.hideModal();
				vm.init();
				LogService.setSuccess("Client Deactivated", vm.selectedClient);
			})
			.catch(function(error){
				console.log(error);
			})
	}


	function init(){
		ClientService.getClients()
			.then(function(response){
				vm.clients = response.Clients;
				//LogService.setSuccess('Clients pulled!');
			})
			.catch(function(err){
				LogService.setError('Currently there are no clients!');
			})
	}

	vm.init();
};