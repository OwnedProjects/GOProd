angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.activateclient',{
        url: '/activateclient',
        component:'activateComponent'
    })
})
.component('activateComponent',{
    templateUrl: 'components/client/activateclientcomponent/activateclient.html',
    controller: ActivateclientController,
    controllerAs: 'activateclientCtrl'
})

ActivateclientController.$inject = ["ClientService", "LogService"];

function ActivateclientController(ClientService, LogService){
    var vm = this;
    vm.showactiveModal = false;
	vm.selectedClient = null;
    vm.deActiveClients = null;
    vm.init = init;
    vm.showModal = showModal;
    vm.hideactivateModal = hideactivateModal;
    vm.activateClient = activateClient;

    
    function showModal(client){
        vm.showactiveModal = true;
        vm.selectedClient = client;
        console.log(client);
    }

    function hideactivateModal(){
        vm.showactiveModal = false;
    }

    function activateClient(){
		var tmp = {
			client_id: vm.selectedClient.client_id
		}

        ClientService.activateClients(tmp)
            .then(function(response){
				vm.hideactivateModal();
				vm.init();
				LogService.setSuccess("Client Activated", vm.selectedClient);
            })
            .catch(function(error){
				console.log(error);
            })
    }



    function init(){       
		ClientService.getDeactiveClient()
			.then(function(response){
                //console.log(response.deactiveClients);
				vm.deActiveClients = response.deactiveClients;
			})
			.catch(function(err){
				LogService.setError('Currently there are no clients!');
			})
    }

    vm.init();
}