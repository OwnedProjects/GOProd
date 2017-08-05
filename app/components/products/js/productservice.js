angular.module('GreenApp')
    .service("ProductService", ProductService);

ProductService.$inject = ["$q", "$http"];

function ProductService($q, $http){
    var vm = this;
    vm.getProducts = getProducts;
    vm.updateProduct = updateProduct;
    vm.getSupplierWithProducts = getSupplierWithProducts;
	vm.addNewProduct = addNewProduct;
    vm.getLorries = getLorries;
    vm.getSupplierWithProductBag = getSupplierWithProductBag;

    function getProducts(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/products.php?action=getProducts',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };
	
    function updateProduct(prodinfo){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/products.php?action=updateProduct',
				data: prodinfo,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
	
    function getSupplierWithProducts(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/products.php?action=getSupplierWithProducts',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
	
    function getSupplierWithProductBag(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/products.php?action=getSupplierWithProductBag',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
	
    function addNewProduct(prodinfo){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/products.php?action=addNewProduct',
                data: prodinfo,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
	
    function getLorries(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/products.php?action=getLorries',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
}