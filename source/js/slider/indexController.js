(function() {
  'use strict';

  angular
  .module('slider')
  .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'sliderService'];

  function IndexController($scope, sliderService) {
    var vm = this;

    $scope.sliderService  = sliderService;
    $scope.itemWidth      = 500;
    $scope.itemHeight     = 300;
    $scope.items          = [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' }
    ];
  }
})();
