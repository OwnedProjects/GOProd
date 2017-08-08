angular.module('GreenApp')
    .service('StockService', StockService);

StockService.$inject = ["$q", "$http"];

function StockService($q, $http){
    var vm = this;
    vm.getDetails = getDetails;
    
    function getDetails(){        
        return $q(function(resolve, reject){
            $http({
                method: "GET",
                url: 'db/stock.php?action=getStocks',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response){
                resolve(response.data.stocks);
            }, function errorCallback(error){
                reject(error);
            });
        })
    }

}