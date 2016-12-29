(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  // Initialize to buy items in the controller
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  // handle buy click event
  toBuy.buy = function(itemIndex) {
    // simply forward to service
    ShoppingListCheckOffService.buy(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  // Initialize already bought items in the controller
  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
};

function ShoppingListCheckOffService() {
  var service = this;

  /* Initialize to Buy list, pre populate with some stuff */
  var toBuyItems = [
    {
      name: 'Bananas',
      quantity: 10
    },
    {
      name: 'Apples',
      quantity: 6
    },
    {
      name: 'Avocados',
      quantity: 3
    },
    {
      name: 'Carrots',
      quantity: 7
    },
    {
      name: 'Tomatoes',
      quantity: 2
    }
  ];

  /* Initialize AlreadyBought list, Initially empty */
  var alreadyBoughtItems = [];

  service.buy = function(itemIndex) {
    alreadyBoughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
  };

  service.getToBuyItems = function() {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtItems;
  };

}

})();
