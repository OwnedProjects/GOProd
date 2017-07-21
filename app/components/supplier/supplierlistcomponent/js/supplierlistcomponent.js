angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.supplierlist',{
        url:'/supplierlist',
        component: 'supplierlistComponent'
    })
})
.component('supplierlistComponent', {
    templateUrl: 'components/supplier/supplierlistcomponent/supplierlist.html',
    controller: SupplierlistController,
    controllerAs: 'supplierlistCtrl'
});

function SupplierlistController(){

}