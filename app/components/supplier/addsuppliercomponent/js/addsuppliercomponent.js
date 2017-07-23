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

AddsupplierController.$inject = ["SupplierServie", "LogService"]

function AddsupplierController(SupplierServie, LogService){
    var vm = this;
    vm.addSupplier = addSupplier;

    function addSupplier(){
        console.log(vm.name,vm.vat,vm.product,vm.contactperson, vm.city, vm.contactno,vm.address )
        var tmpObj = {
            name: vm.name,
            vat: vm.vat,
            product: vm.product,
            contactperson: vm.contactperson,
            city: vm.city,
            state: vm.state,
            contactno: vm.contactno,
            address: vm.address
        }
        
        SupplierServie.addSupplier(tmpObj)
            .then(function(response){
                console.log(response);
            })
            .catch(function(err){
                console.log(err);
            })
    }


}