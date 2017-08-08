angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.availablestock', {
            url: '/availablestock',
            component: 'availablestockComponent'
        })
})
.component('availablestockComponent', {
    templateUrl: 'components/stock/availablestockcomponent/availablestock.html',
    controller: AvailablestockController,
    controllerAs: 'availablestockCtrl'
});

AvailablestockController.$inject = ["StockService", "LogService"];

function AvailablestockController(){
    var vm = this;
    vm.stockProduct = null;
}