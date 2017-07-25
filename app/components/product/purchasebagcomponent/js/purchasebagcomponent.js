angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.purchasebag', {
        url: '/purchasebag',
        component: 'purchasebagComponent'
    })
})
.component('purchasebagComponent', {
    templateUrl: 'components/product/purchasebagcomponent/purchasebag.html',
    controller: PurchasebagController,
    controllerAs: 'purchasebagCtrl'
});

function PurchasebagController(){
    var vm = this;
}