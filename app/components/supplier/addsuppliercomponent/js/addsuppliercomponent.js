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
    controllerAs: 'addsupplierCtrl'
});

AddsupplierController.$inject = ["SupplierService", "LogService"]

function AddsupplierController(SupplierService, LogService){
    var vm = this;
    vm.addSupplier = addSupplier;
    vm.reset = reset;

    function addSupplier(){
        console.log(vm.name,vm.vat,vm.product,vm.contactperson, vm.city, vm.contactno,vm.address )
        var tmpObj = {
            name: vm.name,
            vat: vm.vat,
            product: vm.product,
            contactperson: vm.contactperson,
            city: vm.city,
            contactno: vm.contactno,
            address: vm.address
        };
        
        SupplierService.addSupplier(tmpObj)
            .then(function(response){
                //console.log(response);
                LogService.setSuccess("Supplier added successfully").then(function(){
                    vm.reset();
                });
            })
            .catch(function(err){
                //console.log(err);
                LogService.setError("Supplier cannot be added, try again later");
            })
    }

    function reset(){
        name = null,
        vat = null,
        product = null,
        contactperson = null,
        city = null,
        contactno = null,
        address = null
    };

}