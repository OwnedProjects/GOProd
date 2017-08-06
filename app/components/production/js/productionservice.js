angular.module('GreenApp')
    .service("ProductionService", ProductionService);

ProductionService.$inject = ["$q", "$http"];

function ProductionService($q, $http){
    var vm = this;
}