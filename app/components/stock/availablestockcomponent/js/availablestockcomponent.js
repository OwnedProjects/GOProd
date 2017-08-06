angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.availablestock', {
            url: '/availablestock',
            component: 'availablestockComponent'
        })
})
.component('availablestockComponent', {
    templateUrl: 'components/stock/availablestockcomponent/availablestock.html',
    controller: AvailablestockController,
    controllerAs: 'availablestockCtrl'
});

function AvailablestockController(){
    var vm = this;
    
}