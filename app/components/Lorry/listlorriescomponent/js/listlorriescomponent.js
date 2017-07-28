angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.listlorries',{
        url: '/listlorries',
        component: 'listlorriesComponent'
    })
})
.component('listlorriesComponent', {
    templateUrl: 'components/lorry/listlorriescomponent/listlorries.html',
    controller: ListlorriesController,
    controllerAs: 'listlorriesCtrl'
});

function ListlorriesController(){
    var vm = this;
}

