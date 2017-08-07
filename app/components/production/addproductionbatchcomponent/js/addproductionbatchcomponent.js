angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addproductionbatch',{
        url:'/addproductionbatch',
        component:'addproductionComponent'
    })
})
.component('addproductionComponent', {
    templateUrl: 'components/production/addproductionbatchcomponent/addproductionbatch.html',
    controller: AddproductionController,
    controllerAs: 'prodBatchCtrl'
});

AddproductionController.$inject = ["ProductService", "ProductionService", "LogService"];

function AddproductionController(ProductService, ProductionService, LogService){
    var vm = this;
    vm.Products = null;
    vm.init = init;
    vm.openPurchaseDate = openPurchaseDate;
    vm.calcFinalProd = calcFinalProd;
    vm.createBatch = createBatch;
    vm.resetForm = resetForm;

    function init() {
        ProductService.getProducts()
            .then(function(response) {
                vm.Products = response.data.Products;
                LogService.setSuccess("Products pulled.");
                vm.dateOptions = {
                    showWeeks: false
                };
                vm.purDate = {
                    opened : false
                };
            })
            .catch(function(error) {
                LogService.setError("Cannot find products. Please check the log file");
            })
    };

    function openPurchaseDate() {
        vm.purDate.opened = true;
    };

    function calcFinalProd() {
        var rom = (vm.ROM == undefined)?0:(vm.ROM == null)?0:(vm.ROM == "")?0:(vm.ROM == " ")?0:parseFloat(vm.ROM);
        var shw = (vm.SHW == undefined)?0:(vm.SHW == null)?0:(vm.SHW == "")?0:(vm.SHW == " ")?0:parseFloat(vm.SHW);
        var fp = (vm.FP == undefined)?0:(vm.FP == null)?0:(vm.FP == "")?0:(vm.FP == " ")?0: parseFloat(vm.FP);
        var awf = (vm.AWF == undefined)?0:(vm.AWF == null)?0:(vm.AWF == "")?0:(vm.AWF == " ")?0:parseFloat(vm.AWF);
        if(isNaN(rom)){
            rom = 0;
        }
        if(isNaN(shw)){
            shw = 0;
        }
        if(isNaN(fp)){
            fp = 0;
        }
        if(isNaN(awf)){
            awf = 0;
        }
        vm.echomeal = rom + shw + fp + awf;
        var tmpObj = {
            rom: rom,
            shw: shw,
            fp: fp,
            awf: awf,
            echomeal: vm.echomeal,
        }
        return tmpObj;
    };

    function createBatch() {
        if(vm.ROM != undefined && vm.SHW != undefined && vm.FP != undefined && vm.AWF != undefined && vm.bags != undefined && vm.echomeal != undefined && vm.purchaseDate != undefined && vm.batchno != undefined){
            var tmpObj = vm.calcFinalProd();
            var batchObj = {
                batchno: vm.batchno,
                prod_date: vm.purchaseDate.getTime(),
                rom: tmpObj.rom,
                shw: tmpObj.shw,
                fp: tmpObj.fp,
                awf: tmpObj.awf,
                echomeal: tmpObj.echomeal,
                bags: vm.bags
            };
            ProductionService.addNewBatch(batchObj)
                .then(function(response){
                    vm.resetForm();
                    LogService.setSuccess("New batch added successfully", response);
                })
                .catch(function(error){
                    LogService.setError("Batch cannot be added.");
                });
        }
        else{
            LogService.setError("Fields marked with * cannot be blank");
        }
    }

    function resetForm() {
        vm.batchno = null;
        vm.purchaseDate = null;
        vm.ROM = null;
        vm.SHW = null;
        vm.FP = null;
        vm.AWF = null;
        vm.bags = null;
        vm.echomeal = null;
    };

    vm.init();
}