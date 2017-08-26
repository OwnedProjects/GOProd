angular.module('GreenApp').component('sidemenuComponent', {
  templateUrl: 'components/sidemenucomponent/sidemenucomponent.html',
  controller: SidemenuController,
  controllerAs: 'sidemenuCtrl'
});

SidemenuController.$inject = ["$state"];

function SidemenuController($state){
    var vm = this;
    vm.ele = null;
    vm.ele2 = null;
    vm.loggedInUser = null;
    vm.isToggle = false;
    vm.toggleMenu = toggleMenu;
    vm.init = init;


    function toggleMenu(){
      vm.ele = document.getElementById('wrapper-cnt').classList;
      vm.ele2 = document.getElementById('sideMenu').classList;
      if(vm.isToggle == false){
          vm.ele.add('toggle');
          vm.ele2.add('compact');
      }
      else{
          vm.ele.remove('toggle');
          vm.ele2.remove('compact');
      }
      vm.isToggle = !vm.isToggle;
    }

    function init(){
      vm.loggedInUser = sessionStorage.getItem('userlist');
      if(vm.loggedInUser == undefined){
        $state.go('login');
      }
    }
    vm.init();
};