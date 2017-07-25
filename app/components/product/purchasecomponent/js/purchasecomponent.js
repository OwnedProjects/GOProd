angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.purchase', {
        url: '/purchase',
        component: 'purchaseComponent'
    })
})
.component('purchaseComponent', {
    templateUrl: 'components/product/purchasecomponent/purchase.html',
    controller: PurchasebagController,
    controllerAs: 'purchasebagCtrl'
});

function PurchasebagController(){
    var vm = this;
}