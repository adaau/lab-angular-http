angular.module('CriminalsApp')
  .controller('CriminalsController', ['$scope', '$http', function CriminalsController($scope, $http) {
    $scope.all = [];

    $scope.newCriminal    = {};
    $scope.addCriminal    = addCriminal;
    $scope.editCriminal   = {};
    $scope.updateCriminal = updateCriminal;
    $scope.removeCriminal = removeCriminal;

    getCriminals();
    function addCriminal() {
      $http
        .post('http://localhost:3000/criminals', $scope.newCriminal)
        .success(function(data) {
          getCriminals();
        });
      $scope.newCriminal = {};
    };


    function getCriminals() {
      $http
        .get('http://localhost:3000/criminals')
        .success(function(data) {
          $scope.all = data.criminals;
        })
    };

    $scope.showCriminal = function(criminal) {
      $scope.editCriminal = criminal;
    }

    function updateCriminal(criminal) {
      $http
        .put('http://localhost:3000/criminals/' + criminal._id, $scope.editCriminal)
        .success(function(data) {
          getCriminals();
        })
    };

    function removeCriminal(criminal) {
      $http
        .delete('http://localhost:3000/criminals/' + criminal._id)
        .then(function(data) {
          var index = $scope.all.indexOf(criminal);
          $scope.all.splice(index, 1);
      })
    };

  }]);

