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

ProductlistComponent.$inject= ["ProductService", "LogService"];

function ProductlistComponent(ProductService, LogService){
    var vm = this;
	vm.products = null;
    vm.init = init;
    vm.showEditModal = false;
    vm.selectLorry = selectLorry;
    vm.supplierlist = supplierlist;
    vm.editmodal = editmodal;
    
    function selectLorry(){
        alert('select Lorry');
    }
    
    function supplierlist(){
        alert('Supplier List');
    };

    function editmodal(){
        vm.showEditModal = !vm.showEditModal;
    }
	
	function init(){
		ProductService.getProducts()
			.then(function(response){
				vm.products = response.data.Products;
				LogService.setSuccess("Products pulled", response.data.Products).then(function(){});
			})
			.catch(function(err){
				console.log(err);
				LogService.setError("Products cannot be pulled").then(function(){});
			});
	};
	
	vm.init();
}