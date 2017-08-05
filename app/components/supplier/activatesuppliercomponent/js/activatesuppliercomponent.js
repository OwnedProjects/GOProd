angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.activatesupplier',{
        url: '/activatesupplier',
        component: 'activatesupplierComponent'
    })
})
.component('activatesupplierComponent',{
    templateUrl: 'components/supplier/activatesuppliercomponent/activatesupplier.html',
    controller: ActivatesupplierController,
    controllerAs: 'activatesupplierCrtl'
});

ActivatesupplierController.$inject = ["SupplierService", "LogService"]

function ActivatesupplierController(SupplierService, LogService){
    var vm = this;
    vm.activateFlag = false;
    vm.dsuppliers = null;
    vm.selectedSupplier = null;
    vm.noSupplierFlag = true;
    vm.init = init;
    vm.activateSuppliers = activateSuppliers;
    vm.hideModal = hideModal;
    vm.getSupplier = getSupplier;

    function getSupplier(supplier){
        vm.selectedSupplier = supplier;
		vm.activateFlag = true;
        //console.log(vm.selectedSupplier.supplier_id);
    }
    
    function activateSuppliers(){
		var tmp = {
			supplier_id: vm.selectedSupplier.supplier_id
		}
        SupplierService.activateSupplier(tmp)
        .then(function(response){
            console.log(response);
            vm.init();
            vm.hideModal();
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
	function hideModal(){
		vm.activateFlag = false;
		vm.selectedSupplier = null;
    }

    function init(){
        SupplierService.getdeactiveSupplier()
            .then(function(response){
                vm.noSupplierFlag = false;
                vm.dsuppliers = response;
                //LogService.setSuccess('Supplier pulled Successfuly.');
            })
            .catch(function(error){
                vm.noSupplierFlag = true;
                LogService.setError('There is no deactiavted supplier.');
                console.log(error);
            })
    }

    vm.init();

}