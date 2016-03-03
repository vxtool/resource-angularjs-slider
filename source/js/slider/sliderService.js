(function() {
  'use strict';

  angular
  .module('slider')
  .service('sliderService', sliderService);

  sliderService.$inject = ['$rootScope'];

  function sliderService($rootScope) {
    var vm = this;

    var serv = {};

    serv.toPx = function(value) {
      return [value, 'px'].join('');
    };

    serv.resetItemContainer = function($scope) {
      angular.element($scope.itemContainer).css('left', serv.toPx(-$scope.itemWidth));
    };

    serv.resetItemList = function($scope) {
      $scope.itemList = $scope.itemContainer.querySelectorAll('li');
    };

    serv.performPrepend = function($scope) {
      var lastItem = angular.element($scope.itemList[$scope.itemList.length - 1]).detach();
      angular.element($scope.itemContainer).prepend(lastItem);
      serv.resetItemList($scope);
      serv.resetItemContainer($scope);
    };

    serv.performAppend = function($scope) {
      var firstItem = angular.element($scope.itemList[0]).detach();
      angular.element($scope.itemContainer).append(firstItem);
      serv.resetItemList($scope);
      serv.resetItemContainer($scope);
    };

    // applies the initial styling to the slider upon rendering (see directive link function belowe)
    serv.applyStyles = function($scope) {
      // get dom element references
      var sliderListWidth = $scope.items.length * $scope.itemWidth;
      var ulElement = $scope.element.querySelectorAll('ul');
      var liElements = $scope.element.querySelectorAll('li');
      var lastLiElement = liElements[liElements.length];

      // add dom references we will need for interaction to the scope
      $scope.itemContainer = ulElement[0];
      $scope.itemList = liElements;

      // apply styles to dom elements
      angular.element($scope.element).css({
          'min-width': serv.toPx($scope.itemWidth),
          'max-width': serv.toPx($scope.itemWidth)
      });
      angular.element(ulElement).css({
          'width': serv.toPx(sliderListWidth),
          'left': serv.toPx(-$scope.itemWidth)
      });
      angular.element(liElements).css({
          'height': serv.toPx($scope.itemHeight),
          'width': serv.toPx($scope.itemWidth),
          'line-height': serv.toPx($scope.itemHeight)
      });

      // move the last item to the front to ensure a smooth transition
      // if the Previous button is used first
      var last = angular.element(lastLiElement).detach();
      angular.element(ulElement).prepend(last);
    };

    // called when the Previous button is clicked
    serv.goToPrevious = function($event) {
      var $scope = angular.element($event.target).scope();
      angular.element($scope.itemContainer).addClass('animate');
      var leftValue = parseInt(angular.element($scope.itemContainer).css('left'));
      if (!isFinite(leftValue)) leftValue = 0;
      var newLeft = parseInt(leftValue + parseInt($scope.itemWidth));

      angular.element($scope.itemContainer).css('left', serv.toPx(newLeft));
      // given the css transition a moment to animate and then update the dom
      setTimeout(function() {
          serv.performPrepend($scope);
          angular.element($scope.itemContainer).removeClass('animate');
      }, 400);
    };

    // called when the Next button is clicked
    serv.goToNext = function($event) {
      var $scope = angular.element($event.target).scope();
      angular.element($scope.itemContainer).addClass('animate');
      var leftValue = parseInt(angular.element($scope.itemContainer).css('left'));
      if (!isFinite(leftValue)) leftValue = 0;
      var newLeft = parseInt(leftValue - parseInt($scope.itemWidth));

      angular.element($scope.itemContainer).css('left', serv.toPx(newLeft));
      // given the css transition a moment to animate and then update the dom
      setTimeout(function() {
          angular.element($scope.itemContainer).removeClass('animate');
          serv.performAppend($scope);
      }, 400);
    };

    return serv;
  };

})();
