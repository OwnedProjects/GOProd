angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.activatesupplier',{
        url: '/activatesupplier',
        component: 'activatesupplierComponent'
    })
})
.component('activatesupplierComponent',{
    templateUrl: 'components/supplier/activatesuppliercomponent/activatesupplier.html',
    controller: ActivatesupplierController,
    controllerAs: 'activatesupplierCrtl'
});

function ActivatesupplierController(){

}