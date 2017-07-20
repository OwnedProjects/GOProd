angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.addclient',{
            url: '/addclient',
            component: 'addclientComponent'
        });
})
.component('addclientComponent',{
    templateUrl: 'components/client/addclientcomponent/addclient.html',
    controller: AddclientController,
    controllerAs: "dashboardctrl"
});

function AddclientController(){
    
}