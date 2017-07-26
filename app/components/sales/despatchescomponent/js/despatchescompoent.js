angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.despatches',{
        url: '/despatches',
        component: 'despatchesComponent'
    })
})
.component('despatchesComponent', {
    templateUrl: 'components/sales/despatchescomponent/despatches.html',
    controller: DespatchesController,
    controllerAs: 'despatchesCtrl'
});

function DespatchesController(){
    var vm = this;

}