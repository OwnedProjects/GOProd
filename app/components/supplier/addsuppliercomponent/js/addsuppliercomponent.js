angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addsupplier',{
        url:'/addsupplier',
        component: 'addsupplierComponent'
    });
})
.component('addsupplierComponent', {
    templateUrl: 'components/supplier/addsuppliercomponent/addsupplier.html',
    controller: AddsupplierController,
    controllerAs: 'addsupplierCtrl'
});

function AddsupplierController(){

}