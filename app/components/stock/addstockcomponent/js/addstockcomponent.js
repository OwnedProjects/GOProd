angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.addstock',{
            url: '/addstock',
            component: 'addstockComponent'
        })
})
.component('addstockComponent', {
    templateUrl: 'components/stock/addstockcomponent/addstock.html',
    controller: AddstockController,
    controllerAs: 'addstockCtrl'
})

AddstockController.$inject = ["LogService"]

function AddstockController(){
    var vm = this;
}