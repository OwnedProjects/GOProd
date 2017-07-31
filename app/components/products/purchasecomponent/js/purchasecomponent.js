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
    vm.init = init;
    vm.selectSupplierProd = selectSupplierProd;

    function init() {
        ProductService.getSupplierWithProducts()
            .then(function(response){
                vm.suppliers=response.SupProd;
                LogService.setSuccess("Suppliers fetched.").then(function(){});
            })
            .catch(function(err){
                console.log(err)
            });
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

    vm.init();
}