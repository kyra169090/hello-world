(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.check = function () {
    var foods = $scope.foodinput;
    if (foods === "" || foods == null){
      $scope.message = "Please enter data first!";
    }
    else{
      var foodarray = foods.split(',');
      // then we remove foods where characters are smaller then two characters          ITT HAGYTAM ABBA
      for (var i=0; i < foodarray.length; i++){
      if (foodarray[i].length < 3 ){
        console.log(foodarray[i]);
        foodarray.splice([i], 1);
        }
      }
    var howmany = foodarray.length;
    if (howmany < 4){
      $scope.message = "Enjoy!";
    }
    else if(howmany > 3){
      $scope.message = "Too much!";
    }
    }
  };
};

})();