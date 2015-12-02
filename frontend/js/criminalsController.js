angular.module('CriminalsApp')
  .controller('CriminalsController', ['$scope', '$http', function CriminalsController($scope, $http) {
    $scope.all = [];

    $scope.newCriminal    = {};
    $scope.addCriminal    = addCriminal;
    $scope.showCriminal   = showCriminal;
    $scope.editCriminal   = {};
    $scope.updateCriminal = updateCriminal;
    $scope.removeCriminal = removeCriminal;

    getCriminals();

    function getCriminals() {
      $http
        .get('http://localhost:3000/criminals')
        .success(function(data) {
          $scope.all = data.criminals;
        })
    };

    function addCriminal() {
      $http
        .post('http://localhost:3000/criminals', $scope.newCriminal)
        .success(function(data) {
          getCriminals();
        });
      $scope.newCriminal = {};
    };

    function showCriminal(criminal) {
      $scope.editCriminal = criminal;
    }

    function updateCriminal() {
      $http
        .patch('http://localhost:3000/criminals/' + $scope.editCriminal._id, $scope.editCriminal)
        .success(function(data) {
          getCriminals();
        });
      $scope.editCriminal = {};
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

