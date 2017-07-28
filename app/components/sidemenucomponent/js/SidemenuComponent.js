angular.module('GreenApp').component('sidemenuComponent', {
  templateUrl: 'components/sidemenucomponent/sidemenucomponent.html',
  controller: SidemenuController,
  controllerAs: 'sidemenuCtrl'
});

function SidemenuController(){
    var vm = this;
    vm.ele = null;
    vm.ele2 = null;
    vm.isToggle = false;
    vm.toggleMenu = toggleMenu;


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
      //console.log( vm.ele.classList.contains("foo") );
    }
};