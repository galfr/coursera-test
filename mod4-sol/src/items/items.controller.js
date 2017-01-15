(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var itemsCtrl = this;
  itemsCtrl.categoryName = items.category.name;
  itemsCtrl.items = items.menu_items;
}

})();
