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
    vm.selectLorryFlag, vm.addLorryFlage = false;
    vm.selectLorryModal = selectLorryModal;
    vm.addLorryModal = addLorryModal;
    vm.addLorry = addLorry;

    function addLorry(){
        alert('sasdas');
    }

    function addLorryModal(){
        if(vm.addLorryFlage){
            vm.addLorryFlage = false;
        }
        else{
            vm.addLorryFlage = true;
        }
    }

    function selectLorryModal(){
        if(vm.selectLorryModal){
            vm.selectLorryModal = false;
        }
        else{
            vm.selectLorryModal = true;
        }
    }
}