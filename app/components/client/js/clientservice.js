angular.module('GreenApp')
    .service("ClientService", ClientService);

ClientService.$inject = ["$q", "$http"];

function ClientService($q, $http){
    var vm = this;
    vm.addClient = addClient;
    vm.getClients = getClients;
    vm.updateClient = updateClient;
    vm.deactivateClient = deactivateClient;

    function addClient(clientData){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/client.php?action=addClient',
                data: clientData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };

    function getClients(){
        return $q(function(resolve, reject){
            $http({
                method: 'GET',
                url: 'db/client.php?action=getClients',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response.data)
            }, function errorCallback(error) {
                reject (error)
            });
        })
    }

    // Update CLient
    function updateClient(clientData){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/client.php?action=updateClient',
                data: clientData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };
    

    // Update CLient
    function deactivateClient(clientData){
        return $q(function(resolve, reject) {
            $http({
                method: 'POST',
                url: 'db/client.php?action=deactivateClient',
                data: clientData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {        
                resolve(response)
            }, function errorCallback(error) {
                reject (error)
            });
        });
    };

}