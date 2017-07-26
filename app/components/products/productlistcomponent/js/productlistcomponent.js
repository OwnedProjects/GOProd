angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.productlist', {
        url:'/productlist',
        component: 'productlistComponent'
    })
})
.component('productlistComponent', {
    templateUrl: 'components/products/productlistcomponent/productlist.html',
    controller: ProductlistComponent,
    controllerAs: 'productlistCtrl'
})

function ProductlistComponent(){
    var vm = this;
    vm.selectLorry = selectLorry;
    vm.supplierlist = supplierlist;
    
    function selectLorry(){
        alert('select Lorry');
    }
    
    function supplierlist(){
        alert('Supplier List');
    }
}