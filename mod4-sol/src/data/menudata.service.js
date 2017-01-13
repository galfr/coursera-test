(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {

  var service = this;

  service.getAllCategories = function() {

    var request = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return request.then(

      // success callback - return simply the data
      function(result) {
        return result.data;
      },

      // error callback
      function(result) {
        console.log("http request failed");
      }
    );

  };

  service.getItemsForCategory = function(categoryShortName) {

    var request = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {category: categoryShortName}
    });

    return request.then(

      // success callback - return simply the data
      function(result) {
        return result.data;
      },

      // error callback
      function(result) {
        console.log("http request failed");
      }
    );
  };
};

})();
