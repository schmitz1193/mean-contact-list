'use strict'

const myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("help from the controller");

//put the get  in a function to allow the screen to refreshes when a new contact is added
const refresh = function() {
  //create route to GET our data from the server
  $http.get('/contactlist').success(function(response){
    console.log("I got the data I requested");
    //puts the data into our HTML or our browser
    $scope.contactlist = response;
    $scope.contact = '';  //clear after a new contact is added
  })
};

refresh();

// POST request
$scope.addContact = function() {
  console.log($scope.contact);
  //send the new contact data to the server
  $http.post('/contactlist', $scope.contact).success(function(response){
    console.log("Response back ", response);
    refresh();  //call to reset data on page
  });
};


// DELETE request send id from client to the server
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};


//GET request based on the id from the client, get that contact from the db
$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};


//PUT request based on the id on the scope, put those changes in the appropriate contact in the db
$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

//just blank out the info in the input--changed my mind!
$scope.deselect = function() {
  $scope.contact = "";
}

}]);
