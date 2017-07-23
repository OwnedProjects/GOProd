angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
        .state('home.addclient',{
            url: '/addclient',
            component: 'addclientComponent'
        });
})
.component('addclientComponent',{
    templateUrl: 'components/client/addclientcomponent/addclient.html',
    controller: AddclientController,
    controllerAs: "addclientctrl"
});

AddclientController.$inject = ["ClientService", "LogService"];

function AddclientController(ClientService, LogService){
    var vm = this;
    vm.addClient = addClient;
    vm.reset = reset;

    function addClient(){
        //console.log(vm.name,vm.vat,vm.city,vm.state,vm.contactperson,vm.contactno,vm.address);
        var tmpObj = {
            name: vm.name,
            vat: vm.vat,
            city:vm.city,
            state: vm.state,
            contactperson:vm.contactperson,
            contactno: vm.contactno,
            address: vm.address
        };

        ClientService.addClient(tmpObj)
            .then(function(response){
                //console.log(response);
                LogService.setSuccess("Client added successfully!").then(function(){
                    vm.reset();
                });
            })
            .catch(function(err){
                //console.log(err);
                LogService.setError("Client cannot be added, try again later.");
            });
    };

    function reset(){
        vm.name = null,
        vm.vat = null,
        vm.city = null,
        vm.state = null,
        vm.contactperson = null,
        vm.contactno = null,
        vm.address = null
    };
}