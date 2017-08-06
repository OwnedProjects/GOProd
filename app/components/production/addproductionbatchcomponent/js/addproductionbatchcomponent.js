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
    }

    vm.init();
}