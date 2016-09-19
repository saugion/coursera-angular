(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.msg1 = "Enjoy!";
  $scope.msg2 = "Too much!";
  $scope.msg3 = "Please enter data first";
  $scope.result = "Let's see how hungry you are...";

  $scope.setMsg = function () {
  	if (!$scope.entireMessage) {
  		$scope.result = $scope.msg3;
  	}
  	else {
  		var i = $scope.entireMessage.split(",").filter(String).length;

	   	if (i <= 3) {
	    	$scope.result = $scope.msg1;
	  	}
	  	else {
	  		$scope.result = $scope.msg2;
	  	}
  	}
  };
}

})();