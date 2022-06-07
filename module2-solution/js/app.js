(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);  //shares data and services between controllers

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
      var moveItemRight = this;

      moveItemRight.items = ShoppingListCheckOffService.ToBuyItemsOriginal();

      moveItemRight.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
    }

      moveItemRight.errorMessage = function () {
      if(moveItemRight.items.length > 0)
        return false ;

      return true ;
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getBoughtItems();

  showList.errorMessage = function () {
    if(showList.items.length > 0)
      return false ;

    return true ;
  }
}


function ShoppingListCheckOffService() {
  var service = this;

  // kezdeti lista megjelenítése
  var toBuyItems = [
  {
      name: "Mutfruit",
      quantity: 10
  },
  {
      name: "Brahmin Meat",
      quantity: 5
  },
  {
      name: "Nuka Cola",
      quantity: 3
  },
  {
      name: "Deathclaw steak",
      quantity: 2
  },
  {
      name: "Bloatfly meat",
      quantity: 2
  },
    ];

    service.ToBuyItemsOriginal = function () {
    return toBuyItems;
    }

       // lista módosítása pipára kattintásnál 
   var boughtItems = [];
   service.buyItem = function (itemIndex) {
      
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex,1);
    }
      //vásároltak mutatása
    service.getBoughtItems = function () {
    return boughtItems;
    }
  
  
}


})();