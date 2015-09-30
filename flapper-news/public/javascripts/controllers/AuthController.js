app.controller('AuthCtrl', ['$scope', '$state', 'AuthFactory', function(
    $scope, $state, AuthFactory) {

        $scope.user = {};

        $scope.register = function() {
            AuthFactory.register($scope.user).error(function(error) {
                $scope.error = error;
            }).then(function() {
                $state.go('home');
            });
        };

        $scope.logIn = function() {
            AuthFactory.logIn($scope.user).error(function(error) {
                $scope.error = error;
            }).then(function() {
                $state.go('home');
            });
        };


    }
]);
