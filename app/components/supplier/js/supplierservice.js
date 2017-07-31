angular.module('GreenApp')
    .service("SupplierService", SupplierService);

SupplierService.$inject = ["$q", "$http"];

function SupplierService($q, $http){
    var vm = this;
    vm.addSupplier = addSupplier;
    vm.getSuppliers = getSuppliers;

    function addSupplier(tmpObj){
        return $q(function(resolve, reject){
            $http({
                method: "POST",
                url: 'db/supplier.php?action=addSupplier',
                data: tmpObj,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response){
                resolve(response)
            }, function errorCallback(error){
                reject (error);
            });
        });
    }

    function getSuppliers(){
        return $q(function(resolve, reject){
            $http({
                method: "GET",
                url: 'db/supplier.php?action=getSupplier',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response){
                resolve(response.data);
            }, function errorCallback(error){
                reject(error);
            });
        })
    }
}