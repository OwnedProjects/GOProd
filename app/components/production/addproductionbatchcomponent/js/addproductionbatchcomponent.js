angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addproductionbatch',{
        url:'/addproductionbatch',
        component:'addproductionComponent'
    })
})
.component('addproductionComponent', {
    templateUrl: 'components/production/addproductionbatchcomponent/addproductionbatch.html',
    controller: AddproductionController,
    controllerAs: 'addproductionCtrl'
});

function AddproductionController(){

}