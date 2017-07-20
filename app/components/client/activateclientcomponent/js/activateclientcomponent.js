angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.activateclient',{
        url: '/activateclient',
        component:'activateComponent'
    })
})
.component('activateComponent',{
    templateUrl: 'components/client/activateclientcomponent/activateclient.html',
    controller: ActivateclientController,
    controllerAs: 'activateclientCtrl'
})

function ActivateclientController(){
    
}