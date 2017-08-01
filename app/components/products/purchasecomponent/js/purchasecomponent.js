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
    vm.calcTotalAmt = calcTotalAmt;
    vm.purchaseProduct = purchaseProduct;

    function init() {
        ProductService.getSupplierWithProducts()
            .then(function(response){
                vm.suppliers=response.SupProd;
                //LogService.setSuccess("Suppliers fetched.").then(function(){});
            })
            .catch(function(err){
                console.log(err)
            });

            vm.dateOptions = {
                startingDay: new Date()
            };
            vm.purDate = {
                opened : false
            };
            vm.billDateMod = {
                opened : false
            };
    };

	function purchaseProduct(){
		if(vm.purchaseDate != undefined && vm.sup_product != undefined && vm.billDate != undefined && vm.supplier_name != undefined && vm.billNo != undefined && vm.lorryNo != undefined && vm.weight != undefined && vm.rate != undefined){
			ProductService.addNewProduct()
				.then(function(response){
					LogService.setSuccess("Successfully added the product to the database");
				})
				.catch(function(err){
					LogService.setError("This product cannot be added, please check the log file");
				})
		}
		else{
			LogService.setError("Fields marked with * cannot be blank");
		}
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
	
	function calcTotalAmt(){
		var weight,rate,lorryfreight;
		weight = (vm.weight==undefined)?0:(vm.weight==null)?0:(vm.weight=="")?0:(vm.weight==" ")?0:vm.weight;
		rate = (vm.rate==undefined)?0:(vm.rate==null)?0:(vm.rate=="")?0:(vm.rate==" ")?0:vm.rate;
		lorryfreight = (vm.lorryfreight==undefined)?0:(vm.lorryfreight==null)?0:(vm.lorryfreight=="")?0:(vm.lorryfreight==" ")?0:vm.lorryfreight;
		if(isNaN(weight))
		{
			weight = 0;
		}
		if(isNaN(rate))
		{
			rate = 0;
		}
		if(isNaN(lorryfreight))
		{
			lorryfreight = 0;
		}
		vm.totalamt = (parseFloat(weight) * parseFloat(rate)) + parseFloat(lorryfreight);
	}

    vm.init();
}