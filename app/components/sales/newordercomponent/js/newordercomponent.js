angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.neworder',{
        url: '/neworder',
        component: 'neworderComponent'
    })
})
.component('neworderComponent', {
    templateUrl: 'components/sales/newordercomponent/neworder.html',
    controller: NeworderController,
    controllerAs: 'neworderCtrl'
});

function NeworderController(){
    var vm = this;
    vm.createOder = createOder;

    function createOder(){
        aler('create order');
    }
}