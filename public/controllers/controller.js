'use strict'

const myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("help from the controller");

  //create route to  get our data from
  $http.get('/contactlist').success(function(response){
    console.log("I got the data I requested");
    //puts the data into our HTML or our browser
    $scope.contactlist = response;
  })

}]);
