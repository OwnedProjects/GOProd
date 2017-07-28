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
    vm.orderFlag = false;
    vm.selectOrder = selectOrder;

    function selectOrder(){
        vm.orderFlag = !vm.orderFlag;
    }


}