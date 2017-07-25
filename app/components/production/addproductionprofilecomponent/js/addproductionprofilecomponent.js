angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addproductionprofile',{
        url:'/addproductionprofile',
        component:'addproductionprofileComponent'
    })
})
.component('addproductionprofileComponent', {
    templateUrl: 'components/production/addproductionprofilecomponent/addproductionprofile.html',
    controller: AddproductionprofileController,
    controllerAs: 'productionprofileCtrl'
});

function AddproductionprofileController(){
    var vm = this;
	vm.ele = null;
    vm.totalProduct = null;
    vm.selectProfile = null;
    vm.showProfileModal = showProfileModal;
    vm.hideProfileModal = hideProfileModal;

    
	function showProfileModal(){
		ele = document.getElementById('productProfileModal');
		vm.selectProfile = true;
    }
    
    function hideProfileModal(){
		vm.selectProfile = false;
    }
}