angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.purchase', {
        url: '/purchase',
        component: 'purchaseComponent'
    })
})
.component('purchaseComponent', {
    templateUrl: 'components/products/purchasecomponent/purchase.html',
    controller: PurchasebagController,
    controllerAs: 'purchasebagCtrl'
});

function PurchasebagController(){
    var vm = this;
}