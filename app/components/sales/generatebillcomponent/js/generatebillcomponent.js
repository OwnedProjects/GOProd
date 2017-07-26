angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.generatebill',{
        url: '/generatebill',
        component: 'generatebillComponent'
    })
})
.component('generatebillComponent', {
    templateUrl: 'components/sales/generatebillcomponent/generatebill.html',
    controller: GeneratebillController,
    controllerAs: 'generatebillCtrl'
});

function GeneratebillController(){
    var vm = this;
}