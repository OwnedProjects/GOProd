angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.neworder',{
        url: '/neworder',
        component: 'neworderComponent'
    })
})
.component('neworderComponent', {
    templateUrl: 'components/sales/newordercomponent/neworder.html',
    controller: NeworderController,
    controllerAs: 'neworderCtrl'
});

NeworderController.$inject = ["ClientService", "LogService", "SalesService"];

function NeworderController(ClientService, LogService, SalesService){
    var vm = this;
    vm.clients = null;
    vm.init = init;
    vm.getDestination = getDestination;
    vm.openOrderDate = openOrderDate;
    vm.purchaseNewOrder = purchaseNewOrder;

    function init() {
        ClientService.getClients()
            .then(function(response){
                vm.clients = response.Clients;
                LogService.setSuccess("Clients pulled.");
            })
            .catch(function(error) {
                LogService.setError("Clients cannot be fetched.")
            });
            
            vm.dateOptions = {
                showWeeks: false
            };
            vm.purDate = {
                opened : false
            };
    };

    function getDestination() {
        var index = -1;
        var flag = false;
        for(var i=0; i<vm.clients.length; i++){
            if(vm.clientnm == vm.clients[i].client_name){
                index = i;
                flag = true;
                break;
            }
        }
        if(flag == true){
            vm.clientDet = vm.clients[index];
        }else{
            vm.clientDet = null;
        }
    };

    function purchaseNewOrder() {
        if(vm.orderno != undefined && vm.clientnm != undefined && vm.clientDet.city != undefined && vm.orderDate != undefined && vm.quantity != undefined){
            var orderInfo = {
                orderNo: vm.orderno,
                clientId: vm.clientDet.client_id,
                orderDate: vm.orderDate.getTime(),
                quantity: vm.quantity
            };
            console.log(orderInfo)
            SalesService.addNewOrder(orderInfo)
                .then(function(response){
                    LogService.setSuccess("Successfully placed order.")
                })
                .catch(function(error){
                    LogService.setError(error);
                });
        }else{
            LogService.setError("Fields marked with * cannot be left blank.");
        }
    };

    function openOrderDate(){
        vm.purDate.opened = true;
    };

    vm.init();
}