angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.clientlist', {
        url: '/clientlist',
        component: 'clientlistComponent'
    });
})
.component('clientlistComponent', {
    templateUrl: 'components/client/clientlistcomponent/clientlist.html',
    controller: ClientlistComponent,
    controllerAs: 'clientlistCtrl',
})
.controller('EditModalInstanceCtrl', EditModalInstanceCtrl);

ClientlistComponent.$inject = ["$uibModal", "$timeout"];

function ClientlistComponent($uibModal, $timeout){
    var vm = this;
	vm.items = [1,2,3,4,5];
	vm.testData = "Hello Message";
	vm.openEditDialog = openEditDialog;
	
	function openEditDialog(size){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'myModalContent.html',
			size: size,
			controller: 'EditModalInstanceCtrl',
			controllerAs: 'modctrl',
			resolve: {
				items: function () {
				return vm.items;
			}
      }
		});
		
		
		modalInstance.result.then(function (selectedItem) {
			console.log("dismissed", selectedItem);
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};	
};

function EditModalInstanceCtrl($uibModalInstance, items) {
	var modctrl = this;
	modctrl.items = items;
	modctrl.selected = {
		item: modctrl.items[0]
	};

	modctrl.ok = function () {
		$uibModalInstance.close(modctrl.selected.item);
	};

	modctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};