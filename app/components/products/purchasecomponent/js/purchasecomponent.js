angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.purchase', {
        url: '/purchase',
        component: 'purchaseComponent'
    })
})
.component('purchaseComponent', {
    templateUrl: 'components/products/purchasecomponent/purchase.html',
    controller: PurchaseController,
    controllerAs: 'purchaseCtrl'
});

PurchaseController.$inject = ["ProductService", "LogService"];

function PurchaseController(ProductService, LogService){
    var vm = this;
    vm.suppliers = null;
    vm.dateOptions = null;
    vm.init = init;
    vm.selectSupplierProd = selectSupplierProd;
    vm.openPurchaseDate = openPurchaseDate;
    vm.openBillDate = openBillDate;

    function init() {
        ProductService.getSupplierWithProducts()
            .then(function(response){
                vm.suppliers=response.SupProd;
                LogService.setSuccess("Suppliers fetched.").then(function(){});
            })
            .catch(function(err){
                console.log(err)
            });

            vm.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            vm.purDate = {
                opened : false
            };
            vm.billDateMod = {
                opened : false
            };
    };

    function selectSupplierProd(){
        var flag = false;
        var index = -1;
        for(var i=0; i<vm.suppliers.length; i++){
            if(vm.supplier_name == vm.suppliers[i].supplier_name){
                flag = true;
                index = i;
                break;
            }
        }

        if(flag == false){
            vm.sup_product = null;
        }
        else{
            vm.sup_product = vm.suppliers[index].prod_name;
        }
    };

    function openBillDate(){
        vm.billDateMod.opened = true;
    };

    function openPurchaseDate(){
        vm.purDate.opened = true;
    }

    vm.init();
}