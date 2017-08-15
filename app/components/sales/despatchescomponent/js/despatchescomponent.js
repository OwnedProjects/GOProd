angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.despatches',{
        url: '/despatches',
        component: 'despatchesComponent'
    })
})
.component('despatchesComponent', {
    templateUrl: 'components/sales/despatchescomponent/despatches.html',
    controller: DespatchesController,
    controllerAs: 'despatchesCtrl'
});

DespatchesController.$inject = ["SalesService", "LogService", "ProductionService", "ProductService"];

function DespatchesController(SalesService, LogService, ProductionService, ProductService){
    var vm = this;
    vm.orders = null;
    vm.batches = null;
    vm.lorries = null;
    vm.dateOptions = null;
    vm.selectedBatch = null;
    vm.selectedOrder = null;
    vm.removedBatchArray = new Array();
    vm.selectedBatchArray = new Array();
    vm.init = init;
    vm.selectOrderNo = selectOrderNo;
    vm.openDespatchDate = openDespatchDate;
    vm.openBatchPopUp = openBatchPopUp;
    vm.hideModal = hideModal;
    vm.selectBatch = selectBatch;
    vm.checkModQuantityChange = checkModQuantityChange;

    function init(){
        SalesService.getOrderNoForDespatches()
            .then(function(response){
                vm.orders = response.Orders;
                LogService.setSuccess("Orders pulled", vm.orders);
            })
            .catch(function(err){
                LogService.setError("Orders cannot be pulled.")
            });

        ProductionService.getOpenProductionBatches()
            .then(function(response){
                vm.batches = response.Batches;
                vm.selectedBatch = vm.batches[0];
                LogService.setSuccess("Batches pulled", vm.batches)
            })
            .catch(function(error){
                LogService.setError("Batches cannot be pulled.");
            });


        ProductService.getLorries()
            .then(function(response){
                vm.lorries = response.Lorries;
                LogService.setSuccess("Lorries pulled", vm.lorries)
            })
            .catch(function(error){
                LogService.setError("Lorries cannot be pulled.");
            });

            vm.dateOptions = {
                showWeeks: false
            };
            vm.despDate = {
                opened : false
            };
    };

    function selectOrderNo(){
        for(var i in vm.orders){
            if(vm.orderno == vm.orders[i].order_no){
                vm.selectedOrder = vm.orders[i];
                break;
            }
        }
    };

    function openDespatchDate(){
        vm.despDate.opened = true;
    };

    function openBatchPopUp() {
        if(vm.orderno != null && vm.orderno != undefined && vm.orderno != "" && vm.selectedOrder != null){
            vm.errorMessage = null;
            vm.addBatchFlag = true;
            vm.modquantity = null;
            vm.modBatchNo = vm.selectedBatch.batch_no;
            vm.modBatchRem = vm.selectedBatch.echomeal;
        }
        else{
            LogService.setError("Select correct order number first");
        }
    };

    function hideModal() {        
        vm.addBatchFlag = false;
    };

    function selectBatch(){
        if(vm.modquantity != null && vm.modquantity !=undefined && vm.modquantity != ""){
            var tmpBatch = {
                batchno: vm.modBatchNo,
                itemrem:vm.modBatchRem,
                quantity: vm.modquantity
            };
            vm.selectedBatchArray.push(tmpBatch);
            tmpBatch = null;
            for(var i in vm.batches){
                if(vm.modBatchNo == vm.batches[i].batch_no){
                    vm.removedBatchArray.push(vm.batches[i]);
                    vm.batches.splice(i,1);
                    console.log(vm.batches);
                    vm.selectedBatch = vm.batches[0];
                    break;
                }
            }
            //console.log(vm.batches)
            vm.hideModal();
        }
        else{
            vm.errorMessage = "Quantity cannot be empty."
        }
    };

    function checkModQuantityChange() {
        vm.errorMessage = null;
        if(isNaN(vm.modquantity)){
            vm.errorMessage = "Quantity must be a number.";
        }
        else{
            //Need to add the looped elements from selectedBatchArray
            vm.modquantityrem = parseInt(vm.selectedOrder.quantity) - parseInt(vm.modquantity);
            if(vm.modquantityrem < 0){
                vm.errorMessage = "Quantity cannot be more than the Total Order Quantity";
            }
            if(parseInt(vm.modquantity) > parseInt(vm.modBatchRem)){
                vm.errorMessage = "Quantity cannot be more than the Batch Quantity";
            }
        }
    };

    vm.init();
}