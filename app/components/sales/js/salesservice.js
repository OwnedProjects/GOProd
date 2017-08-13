angular.module('GreenApp')
    .service("SalesService", SalesService);

SalesService.$inject = ["$q", "$http"];

function SalesService($q, $http){
    var vm = this;
    vm.addNewOrder = addNewOrder;
    vm.getOrderNoForDespatches = getOrderNoForDespatches;

    function addNewOrder(orderData){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/sales.php?action=addNewOrder',
                data: orderData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };

    function getOrderNoForDespatches(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/sales.php?action=getOrderNoForDespatches',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };
}