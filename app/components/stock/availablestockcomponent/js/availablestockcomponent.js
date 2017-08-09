angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.availablestock', {
            url: '/availablestock',
            component: 'availablestockcomponent'
        })
})
.component('availablestockcomponent', {
    templateUrl: 'components/stock/availablestockcomponent/availablestock.html',
    controller: AvailablestockController,
    controllerAs: 'availstockCtrl'
});

AvailablestockController.$inject = ["StockService", "LogService"];

function AvailablestockController(StockService, LogService){
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