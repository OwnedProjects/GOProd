angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.clientlist', {
        url: '/clientlist',
        component: 'clientlistComponent'
    });
})
.component('clientlistComponent', {
    templateUrl: 'components/client/clientlistcomponent/clientlist.html',
    controller: ClientlistComponent,
    controllerAs: 'clientlistCtrl',
});

function ClientlistComponent($state){
    
}