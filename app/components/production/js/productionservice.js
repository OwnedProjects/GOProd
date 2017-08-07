angular.module('GreenApp')
    .service("ProductionService", ProductionService);

ProductionService.$inject = ["$q", "$http"];

function ProductionService($q, $http){
    var vm = this;
    vm.addNewBatch = addNewBatch;

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
}