(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.message_color ="";
  $scope.lunchMenu = "";
  $scope.lunchMenu_border_color = "";

  $scope.checkTooMuch = function() {
    var num_of_items = calcNumItems($scope.lunchMenu);

    if (num_of_items === 0) {
      $scope.message = "Please enter data first";
      $scope.message_color = "red";
      $scope.lunchMenu_border_color = "red";
    }
    else {
      $scope.message_color = "green";
      $scope.lunchMenu_border_color = "green";

      if (num_of_items <= 3) {
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message = "Too much!";
      }
    }
  }
}

function calcNumItems(str) {
  if (str.length === 0) {
    return 0;
  }
  else {
    return str.split(",").length;
  }
}
})();
