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
    vm.selectedQuantity = null;
    vm.removedBatchArray = new Array();
    vm.selectedBatchArray = new Array();
    vm.init = init;
    vm.selectOrderNo = selectOrderNo;
    vm.openDespatchDate = openDespatchDate;
    vm.openBatchPopUp = openBatchPopUp;
    vm.hideModal = hideModal;
    vm.selectBatch = selectBatch;
    vm.checkModQuantityChange = checkModQuantityChange;
    vm.removeSelectedBatch = removeSelectedBatch;
    vm.createBatch = createBatch;

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
            if(vm.selectedBatch != null){
                vm.errorMessage = null;
                vm.addBatchFlag = true;
                vm.modquantity = null;
                vm.modBatchId = vm.selectedBatch.batch_id;
                vm.modBatchNo = vm.selectedBatch.batch_no;
                vm.modBatchRem = vm.selectedBatch.echomeal;
            }
            else{
                LogService.setError("No batches found. Please create a new batch to complete order.");    
            }
        }
        else{
            LogService.setError("Select correct order number first.");
        }
    };

    function hideModal() {        
        vm.addBatchFlag = false;
    };

    function selectBatch(){
        if(vm.modquantity != null && vm.modquantity !=undefined && vm.modquantity != ""){
            if(vm.errorMessage == null){
                var tmpBatch = {
                    batch_id: vm.modBatchId,
                    batch_no: vm.modBatchNo,
                    echomeal: vm.modBatchRem,
                    quantity: vm.modquantity
                };
                vm.selectedBatchArray.push(tmpBatch);
                tmpBatch = null;
                for(var i in vm.batches){
                    if(vm.modBatchNo == vm.batches[i].batch_no){
                        vm.removedBatchArray.push(vm.batches[i]);
                        vm.batches.splice(i,1);
                        vm.selectedBatch = vm.batches[0];
                        break;
                    }
                }
                vm.hideModal();
            }
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
            var loppedVal = 0;
            for(var i in vm.selectedBatchArray){
                loppedVal = loppedVal + parseInt(vm.selectedBatchArray[i].quantity);
            }
            vm.selectedQuantity = (parseInt(vm.modquantity) + loppedVal);
            vm.modquantityrem = parseInt(vm.selectedOrder.quantity) - (parseInt(vm.modquantity) + loppedVal);
            if(vm.modquantityrem < 0){
                vm.errorMessage = "Quantity cannot be more than the Total Order Quantity";
            }
            if(parseInt(vm.modquantity) > parseInt(vm.modBatchRem)){
                vm.errorMessage = "Quantity cannot be more than the Batch Quantity";
            }
        }
    };

    function createBatch(){
        if(vm.orderno != undefined && vm.orderno != null && vm.orderno != "" && vm.dcno != undefined && vm.dcno != null && vm.dcno != "" && vm.despatchDate != undefined && vm.despatchDate != null && vm.despatchDate != "" && vm.lorryno != undefined && vm.lorryno != null && vm.lorryno != ""){
            if(vm.selectedQuantity == null){
                LogService.setError("Need to select atleast 1 batch to continue.");
            }
            else if(vm.selectedOrder){
                if(parseInt(vm.selectedQuantity) < parseInt(vm.selectedOrder.quantity)){
                    LogService.setError("Selected quantity does not match your Order quantity.");
                }
                else{
                    console.log("Everything is good");
                    var batchData = {
                        batchArr: vm.selectedBatchArray,
                        orderNo: vm.orderno
                    };
                    SalesService.addSalesBatches(batchData)
                        .then(function(response) {
                            console.log(response);
                        })
                        .catch(function(error){
                            LogService.setError("Batches cannot be inserted");
                        });
                }
            }
        }
    };

    function removeSelectedBatch(selbatch){
        for(var i in vm.selectedBatchArray){
            if(selbatch.batch_no == vm.selectedBatchArray[i].batch_no){
                vm.batches.push(vm.selectedBatchArray[i]);
                vm.selectedBatch = vm.batches[0];
                vm.selectedBatchArray.splice(i,1);
                var loppedVal = 0;
                for(var i in vm.selectedBatchArray){
                    loppedVal = loppedVal + parseInt(vm.selectedBatchArray[i].quantity);
                }
                vm.selectedQuantity = loppedVal;
                vm.modquantityrem = parseInt(vm.selectedOrder.quantity) - loppedVal;
                break;
            }
        }
    }

    vm.init();
}