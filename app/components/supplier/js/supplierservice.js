angular.module('GreenApp')
    .service("SupplierServie", SupplierServie);

SupplierServie.$inject = ["$q", "$http"];

function SupplierServie($q, $http){
    var vm = this;
    vm.addSupplier = addSupplier;

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
}