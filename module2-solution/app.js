(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function (item) {
    ShoppingListCheckOffService.buyItem(item);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = [
    { name: "cookies", quantity: 10 },
    { name: "oranges", quantity: 2 },
    { name: "apple", quantity: 1 },
    { name: "bars chocolate", quantity: 3 },
    { name: "milk bottles", quantity: 2 }
  ];

  var alreadyBoughtList = [];

  service.buyItem = function(item) {
    toBuyList.splice(toBuyList.indexOf(item), 1);
    alreadyBoughtList.push(item);
  }

  service.getToBuyItems = function () {
    return toBuyList;
  };

  service.getAlreadyBoughtItems = function() {
    return alreadyBoughtList;
  };
}

})();
