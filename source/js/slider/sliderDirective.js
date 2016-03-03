(function() {
  'use strict';

  angular
  .module('slider')
  .directive('slider', slider);

  slider.$inject = ['$timeout'];

  function slider($timeout) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './source/js/slider/slider.html',
      link: function(scope, element, attrs) {
        $timeout(function() {
          scope.element = element[0];
          if (attrs.width) { scope.itemWidth = parseInt(attrs.width); }
          if (attrs.height) { scope.itemHeight = parseInt(attrs.height); }
          scope.sliderService.applyStyles(scope);
        });
      }
    }
  }
})();
