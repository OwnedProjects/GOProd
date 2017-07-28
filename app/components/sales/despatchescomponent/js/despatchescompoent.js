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

function DespatchesController($timeout){
    var vm = this;
    vm.selectLorryFlag = false;
    vm.selectLorryModal = selectLorryModal;
    vm.addLorryModal = addLorryModal;
    vm.addLorryFlage = false;
    vm.addLorry = addLorry;

    function addLorry(){
        alert('sasdas');
    }

    function addLorryModal(){
        $timeout( function(){
            vm.addLorryFlage = !vm.addLorryFlage;
        }, 100 );
    }

    function selectLorryModal(){
        vm.selectLorryFlag = !vm.selectLorryFlag;
    }

}