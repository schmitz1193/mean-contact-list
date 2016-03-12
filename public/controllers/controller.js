'use strict'

const myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("help from the controller");

//put the get  in a function to allow the screen to refreshes when a new contact is added
const refresh = function() {
  //create route to  get our data from
  $http.get('/contactlist').success(function(response){
    console.log("I got the data I requested");
    //puts the data into our HTML or our browser
    $scope.contactlist = response;
    $scope.contact = '';  //clear after a new contact is added
  })
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response){
    console.log("Response back ", response);
    refresh();  //call to reset data on page
  });
};


}]);
