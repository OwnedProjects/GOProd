angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addsupplier',{
        url:'/addsupplier',
        component: 'addsupplierComponent'
    });
})
.component('addsupplierComponent', {
    templateUrl: 'components/supplier/addsuppliercomponent/addsupplier.html',
    controller: AddsupplierController,
    controllerAs: 'addsupplierCtrl',
	bindings: {
        onComplete: '&?'
    }
});

AddsupplierController.$inject = ["SupplierService", "LogService", "ProductService"]

function AddsupplierController(SupplierService, LogService, ProductService){
    var vm = this;
    vm.Products = null;
    vm.addSupplier = addSupplier;
    vm.init = init;
	vm.ondone = ondone;
    vm.reset = reset;

    function addSupplier(){
        console.log(vm.name,vm.vat,vm.product,vm.contactperson, vm.city, vm.contactno,vm.address );
        var tmpObj = {
            name: vm.name,
            vat: vm.vat,
            //prodid: vm.product.prod_id,
            contactperson: vm.contactperson,
            city: vm.city,
            contactno: vm.contactno,
            address: vm.address
        };
        
        /* SupplierService.addSupplier(tmpObj)
            .then(function(response){
                //console.log(response);
                LogService.setSuccess("Supplier added successfully").then(function(){
                    vm.reset();
                });
            })
            .catch(function(err){
                //console.log(err);
                LogService.setError("Supplier cannot be added, try again later");
            }); */
		vm.ondone();
    };

    function init(){
        ProductService.getProducts()
            .then(function(response) {
                vm.Products = response.data.Products;
                vm.Products.splice((vm.Products.length-2), 2);
                vm.product = vm.Products[0];
                LogService.setSuccess("Products pulled", response.data.Products);
            })
            .catch(function(error) {
                LogService.setError("Cannot find products, Please check.");
            });
    }

    function reset(){
        vm.name = null,
        vm.vat = null,
        vm.product = null,
        vm.contactperson = null,
        vm.city = null,
        vm.contactno = null,
        vm.address = null
    };
	
	function ondone(){
		//This method is written for calls from Parent
        vm.onComplete && vm.onComplete();
    }
    vm.init();
}