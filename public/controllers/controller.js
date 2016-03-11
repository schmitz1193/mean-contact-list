'use strict'

const myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("help from the controller");
}]);
