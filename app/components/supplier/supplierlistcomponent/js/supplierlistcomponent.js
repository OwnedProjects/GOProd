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

SupplierlistController.$inject = ["SupplierService", "LogService"];

function SupplierlistController(SupplierService, LogService){
    var vm = this;
    vm.suppliers = null;
    vm.init = init;

    function init(){
        SupplierService.getSuppliers()
        .then(function(response){
            vm.suppliers = response.Supplier;
            console.log(vm.suppliers);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    vm.init();
}