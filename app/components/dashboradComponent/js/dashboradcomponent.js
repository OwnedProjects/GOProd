angular.module('GreenApp').component('dashboradComponent', {
  templateUrl: 'components/dashboradComponent/dashborad.html',
  bindings: {
    hero: '='
  },
  controller: dashboardController,
  controllerAs: "dashboardctrl"
});

function dashboardController(){
    alert('asdfasd');
};