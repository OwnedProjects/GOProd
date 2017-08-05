angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.supplierlist',{
        url:'/supplierlist',
        component: 'supplierlistComponent'
    })
})
.component('supplierlistComponent', {
    templateUrl: 'components/supplier/supplierlistcomponent/supplierlist.html',
    controller: SupplierlistController,
    controllerAs: 'supplierlistCtrl'
});

SupplierlistController.$inject = ["ProductService", "SupplierService", "LogService"];

function SupplierlistController(ProductService, SupplierService, LogService,){
    var vm = this;
    vm.suppliers = null;
	vm.editmodalFlag = false;
	vm.deletemodalFlag = false;
	vm.noSupplierFlag = true;
    vm.selectedSupplier = null;
    vm.Products = null;
    vm.selprodId = null;
    vm.init = init;
	vm.editModal = editModal;
	vm.deleteModal = deleteModal;
	vm.hideModal = hideModal;
    vm.updateSupplier = updateSupplier;
    vm.removeSupplier = removeSupplier;
    vm.deactivateSupplier = deactivateSupplier;


    function editModal(supplier){
        vm.editmodalFlag = true;
        vm.selectedSupplier = supplier;
		vm.modName = supplier.supplier_name;
		vm.modVat = supplier.vat;
		vm.modprodName = supplier.prod_name;
		vm.modprodId = supplier.prod_id;
		vm.modCity = supplier.city;
		vm.modContactPerson = supplier.contact_person;
		vm.modContactNo = supplier.contactno;
        vm.modAddress = supplier.address;
    }
    
    function deleteModal(){

    }

	function hideModal(){
		vm.editmodalFlag = false;
		vm.selectedSupplier = null;
		vm.deletemodalFlag = false;
    }


    function updateSupplier(){
        var tmp = {
            supplier_id: vm.selectedSupplier.supplier_id,
            supplier_name: vm.modName,
            vat: vm.modVat,
            prod_id: vm.selectedSupplier.prod_id,
            contact_person: vm.modContactPerson,
            city: vm.modCity,
            contactno: vm.modContactNo,
            address: vm.modAddress
        }

        SupplierService.updateSupplier(tmp)
            .then(function(response){
                vm.hideModal();
                vm.init();
                LogService.setSuccess("Client Updated");
            })
            .catch(function(error){
                console.log(error);
            });
    }


    function removeSupplier(supplier){
        vm.deletemodalFlag = true;
        vm.selectedSupplier = supplier;
    }

    function deactivateSupplier(){
        var tmp = {
            supplier_id:  vm.selectedSupplier.supplier_id
        }
        console.log(tmp);
		SupplierService.deactivateSupplier(tmp)
        .then(function(response){
            vm.hideModal();
            vm.init();
            LogService.setSuccess("Supplier Deactivated successfuly.");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    function init(){
        ProductService.getSupplierWithProducts()
        .then(function(response){
            vm.noSupplierFlag = false;
            vm.suppliers = response.SupProd;
            //console.log(response.SupProd);
            LogService.setSuccess("Supplier pulled successfuly");
        })
        .catch(function(error){
            vm.noSupplierFlag = true;
            LogService.setError('There is no supplier.');
            //console.log(error);
        })
    }

    vm.init();
}