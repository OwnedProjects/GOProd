angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.purchasebag', {
        url: '/purchasebag',
        component: 'purchasebagComponent'
    })
})
.component('purchasebagComponent', {
    templateUrl: 'components/products/purchasebagcomponent/purchasebag.html',
    controller: PurchasebagController,
    controllerAs: 'purchasebagCtrl'
});

PurchasebagController.$inject = ["ProductService", "LogService"];

function PurchasebagController(ProductService, LogService){
    var vm = this;
    vm.dateOptions = null;
    vm.init = init;
    vm.selectSupplierProd = selectSupplierProd;
    vm.openPurchaseDate = openPurchaseDate;
    vm.openBillDate = openBillDate;
    vm.addSupplierModal = addSupplierModal;
    vm.hideModal = hideModal;
    vm.hideSupplierModal = hideSupplierModal;

    function init() {
        ProductService.getSupplierWithProductBag()
            .then(function(response){
                vm.suppliers=response.SupProd;
                console.log(vm.suppliers);
                LogService.setSuccess("Suppliers fetched.").then(function(){});
            })
            .catch(function(err){
                console.log(err)
            });
        ProductService.getLorries()
            .then(function(response){
                vm.lorries=response.Lorries;
                LogService.setSuccess("Lorries fetched.").then(function(){});
            })
            .catch(function(err){
                console.log(err)
            });

            vm.dateOptions = {
                showWeeks: false
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
        if(vm.suppliers){
            for(var i=0; i<vm.suppliers.length; i++){
                if(vm.supplier_name == vm.suppliers[i].supplier_name){
                    flag = true;
                    index = i;
                    break;
                }
            }
        }

        if(flag == false){
            vm.sup_product = null;
        }
        else{
            vm.sup_product = vm.suppliers[index];
        }
    };


    function openBillDate(){
        vm.billDateMod.opened = true;
    };

    function openPurchaseDate(){
        vm.purDate.opened = true;
    };

    function addSupplierModal(){
        vm.addSupplierFlag = true;
    };

    function hideModal(){
        vm.addSupplierFlag = false;
    };

    function hideSupplierModal(){
        vm.init();
        vm.addSupplierFlag = false;
    }

    vm.init();
}