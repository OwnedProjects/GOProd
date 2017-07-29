angular.module('GreenApp')
    .service("ProductService", ProductService);

ProductService.$inject = ["$q", "$http"];

function ProductService($q, $http){
    var vm = this;
    vm.getProducts = getProducts;

    function getProducts(){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/products.php?action=getProducts',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };
}