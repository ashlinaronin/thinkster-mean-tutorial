app.controller('NavCtrl', ['$scope', 'AuthFactory', function($scope, AuthFactory) {

    // Give the nav controller access to a few "public methods" of AuthFactory
    $scope.isLoggedIn = AuthFactory.isLoggedIn;
    $scope.currentUser = AuthFactory.currentUser;
    $scope.logOut = AuthFactory.logOut;
    
}]);
