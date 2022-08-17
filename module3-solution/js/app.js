(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

// DDO mi az az AND jel ott?
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'templates/found-items.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };
  return ddo;
}
// working on the JSON file (name in JSON: menu_items )
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function (result) {
      if (searchTerm == false)
        return [];
      // new Array for items that has the matching word
      var foundItems = [];
      var list = result.data.menu_items;
      // searching in JSON value "description", lowercase is needed because of case sensitivity
      for (var i = 0; i < list.length; i++) {
        var description = list[i].description;
        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
          foundItems.push(list[i]);
        }
      }
      return foundItems;
    });
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.isEmpty = false;
  menu.found = [];
  menu.searchTerm = '';

//add for the HTML button
  menu.getItems = function() {
    if (!(menu.searchTerm)) {
      menu.found = null;
      return;
    }
    menu.found = [];
    //when matching menu items are getting available, we will store the values in another array
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      console.log(response);
      menu.found = response;
      menu.setEmpty();
    })
    .catch(function (error) {
      alert("Something went wrong!");
    });
  };
// function for the DDO
  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
    menu.setEmpty();
  };
// when nothing is found with a matching word
  menu.setEmpty = function () {
            menu.isEmpty = !menu.found.length;
        };
}

})();