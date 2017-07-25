angular.module('GreenApp').config(function($stateProvider){
    $stateProvider
    .state('home.addproductionbatch',{
        url:'/addproductionbatch',
        component:'addproductionComponent'
    })
})
.component('addproductionComponent', {
    templateUrl: 'components/production/addproductionbatchcomponent/addproductionbatch.html',
    controller: AddproductionController,
    controllerAs: 'addproductionCtrl'
});

function AddproductionController(){
    var vm = this;
	vm.ele = null;
    vm.selectProfile = null;
    vm.showProfileModal = showProfileModal;
    vm.hideProfileModal = hideProfileModal;
    vm.setprofileDetails = setprofileDetails;

	function showProfileModal(){
		vm.selectProfile = true;
		ele = document.getElementById('selectProfileModal');
    }
    
    function hideProfileModal(){
		vm.selectProfile = false;
		ele = document.getElementById('selectProfileModal');
    }

    function setprofileDetails(){

    }
}