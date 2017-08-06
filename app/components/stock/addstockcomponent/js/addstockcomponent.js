angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.addstock', {
            url: '/addstock',
            component: 'addstockcomponent'
        })
})
.component('addstockcomponent', {
    templateUrl: 'components/stock/addstockcomponent/addstock.html',
    controller: AddstockController,
    controllerAs: 'addstockCtrl'
});

function AddstockController(){
    var vm = this;
    
}