angular.module('GreenApp')
    .service("ProductionService", ProductionService);

ProductionService.$inject = ["$q", "$http"];

function ProductionService($q, $http){
    var vm = this;
    vm.addNewBatch = addNewBatch;
    vm.getOpenProductionBatches = getOpenProductionBatches;

    function addNewBatch(batchinfo){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/production.php?action=addNewBatch',
				data: batchinfo,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };

    function getOpenProductionBatches(){
        return $q(function(resolve, reject) {
            $http({
                method: 'GET',
                url: 'db/production.php?action=getOpenProductionBatches',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data);
            }, function errorCallback(error) {
                reject (error);
            });
        });
    };
}