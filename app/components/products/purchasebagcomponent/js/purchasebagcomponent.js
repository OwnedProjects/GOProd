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
    vm.purchaseBag = purchaseBag;
    vm.resetForm = resetForm;

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

    function purchaseBag() {
        if(vm.purchaseDate != undefined && vm.supplier_name != undefined && vm.sup_product != undefined && vm.billDate != undefined && vm.billNo != undefined && vm.lorryNo != undefined && vm.noOfBags != undefined && vm.totalAmount != undefined){
             var prodinfo = {
                supplier_id: vm.sup_product.supplier_id,
                purchase_date: JSON.stringify(vm.purchaseDate.getTime()),
                bill_date: JSON.stringify(vm.billDate.getTime()),
                billno: vm.billNo,
                lorryNo: vm.lorryNo,
                bags : vm.noOfBags,
                totalAmount: vm.totalAmount
            };
			ProductService.addNewBags(prodinfo)
				.then(function(response){
					LogService.setSuccess("Successfully added the product to the database").then(function(resp){
                        vm.resetForm();
                        vm.init();
                    });
				})
				.catch(function(err){
					LogService.setError("Bags cannot be purchased, please check the log file");
				});
        }
		else{
			LogService.setError("Fields marked with * cannot be blank");
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
    };

    function resetForm(){
        vm.sup_product = null;
        vm.purchaseDate = null;
        vm.billDate = null;
        vm.billNo = null;
        vm.lorryNo = null;
        vm.noOfBags = null;
        vm.totalAmount = null;
        vm.supplier_name = null;
    };

    vm.init();
}