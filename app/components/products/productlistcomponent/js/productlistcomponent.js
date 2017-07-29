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
	vm.selectedProd = null;
    vm.init = init;
    vm.showEditModal = false;
    vm.editmodal = editmodal;
    vm.closemodal = closemodal;
    vm.updateProduct = updateProduct;

    function editmodal(product){
		vm.modProdId = product.prod_id;
		vm.modProdNm = product.prod_name;
        vm.showEditModal = true;
    };
	
    function closemodal(){
        vm.showEditModal = false;
    };
	
	function updateProduct(){
		var tmpProd = {
			prod_id: vm.modProdId,
			prod_name: vm.modProdNm,
		}
		ProductService.updateProduct(tmpProd)
			.then(function(response){
				LogService.setSuccess("Product updated").then(function(){});
				tmpProd = null;
				vm.init();
				vm.closemodal();
				console.log(response);
			})
			.catch(function(error){
				tmpProd = null;
				LogService.setError(error).then(function(){});
				console.log(error)
			});
	};
	
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