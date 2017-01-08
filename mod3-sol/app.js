(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: "found_items.template.html",
    scope: {
      items: '<',
      onRemove: '&'
    },
    // controller: ShoppingListDirectiveController,
    // controllerAs: 'list',
    // bindToController: true
  };

  return ddo;
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.matchedItems = [];
  ctrl.searchTerm = "";
  ctrl.buttonClicked = false;

  // call service http request function, simply update the list of matched items
  // in the controller on return
  ctrl.narrowDown = function() {
    ctrl.buttonClicked = true;

    // if the user supplied an empty string, update matchedItems to an empty array,
    // otherwise, retrieve items from server and update
    if (ctrl.searchTerm != "") {

      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      promise.then(function (response) {
        ctrl.matchedItems = response;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }
    else {
      ctrl.matchedItems = [];
    }

  };


  ctrl.removeItem = function(index) {
    ctrl.matchedItems.splice(index, 1);
  }
};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return promise.then(function(response) {
      var foundItems = [];

      for (var i = 0; i < response.data.menu_items.length; i++) {

        // the required string found in the description of the item, insert into foundItems list
        if (response.data.menu_items[i].description.indexOf(searchTerm) != -1) {
          foundItems.push(response.data.menu_items[i]);
        }
      }

      return foundItems;
    });

  };
}

})();
