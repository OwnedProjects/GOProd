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

function ClientlistController(){
	var vm = this;
	vm.ele = null;
	vm.editClientDetails = false;
	vm.showModal = showModal;
	vm.hideModal = hideModal;


	function showModal(){
		vm.editClientDetails = true;
		ele = document.getElementById('editClientDetails');
	}

	function hideModal(){
		vm.editClientDetails = false;
	}
};