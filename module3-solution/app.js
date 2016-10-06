(function() {

'use strict;'

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('baseUrl', 'https://davids-restaurant.herokuapp.com/');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.finddishes = function() {
        ctrl.foundItems = undefined;
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
            .then(function(result){
                ctrl.foundItems = result;
            })
            .catch(function(error){
                console.log('server error1');
            });
    };
    ctrl.notFoundItems = function() {
        if (ctrl.foundItems==undefined) {
            return false;
        };
        return ctrl.foundItems.length==0;
    };
    ctrl.removeItem = function(index) {
        ctrl.foundItems.splice(index, 1);
    };
};

MenuSearchService.$inject = ['$http', 'baseUrl'];
function MenuSearchService($http, baseUrl) {
    var serv = this;
    serv.getMatchedMenuItems = function(searchTerm) {
        return $http({
            url: (baseUrl + 'menu_items.json')
        }).then(function(result){
            var foundItems = [];
            for(var itemIndex in result.data.menu_items) {
                // console.log(result.data.menu_items[itemIndex]);
                if (result.data.menu_items[itemIndex].description.indexOf(searchTerm)!==-1) {
                    foundItems.push(result.data.menu_items[itemIndex]);
                };    
            }
            //debugger;
            return foundItems;
        });
    };
};

function FoundItemsDirective() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'loader/itemsloaderindicator.template.html',
        scope: {
            dishes: '<foundItems',
            dishRemove: '&onRemove'
        },
        controller: DirectiveController,
        controllerAs: 'dirCtrl',
        bindToController: true,
        transclude: true
    };

    return ddo;
};

function DirectiveController() {
    
};

})();