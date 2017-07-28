angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addlorry',{
        url: '/addlorry',
        component: 'addlorryComponent'
    })
})
.component('addlorryComponent', {
    templateUrl: 'components/lorry/addlorrycomponent/addlorry.html',
    controller: AddlorryController,
    controllerAs: 'addlorryCtrl'
});

function AddlorryController(){
    var vm = this;

}