app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'postsFactory',
    function($scope, $stateParams, posts) {
        $scope.post = post.posts[$stateParams.id];
    }
]);
