angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addproductionprofile',{
        url:'/addproductionprofile',
        component:'addproductionprofileComponent'
    })
})
.component('addproductionprofileComponent', {
    templateUrl: 'components/production/addproductionprofilecomponent/addproductionprofile.html',
    controller: AddproductionprofileController,
    controllerAs: 'addproductionCtrl'
});

function AddproductionprofileController(){

}