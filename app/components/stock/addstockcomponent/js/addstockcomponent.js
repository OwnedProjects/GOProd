angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.addstock', {
            url: '/addstock',
            component: 'addstockComponent'
        })
})
.component('addstockComponent', {
    templateUrl: 'components/stock/addstockcomponent/addstock.html',
    controller: AddstockController,
    controllerAs: 'addstockCtrl'
});

AddstockController.$inject = ["StockService", "LogService"];

function AddstockController(StockService, LogService){
    var vm = this;
    vm.product = null;
    vm.stockProduct = null;
    vm.bags = null;
    vm.ecomeal = null;
    vm.init = init;

    function init(){
        StockService.getDetails()
        .then(function(response){
            vm.stockProduct = response;
            vm.ecomeal = [vm.stockProduct[vm.stockProduct.length-1]];
            vm.bags = [vm.stockProduct[vm.stockProduct.length-2]];
            console.log(vm.ecomeal)
            console.log(vm.bags);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    vm.init();

}