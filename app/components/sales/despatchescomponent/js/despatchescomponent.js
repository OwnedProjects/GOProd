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
    vm.init = init;
    vm.openDespatchDate = openDespatchDate;

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

    function openDespatchDate(){
        vm.despDate.opened = true;
    };

    vm.init();
}