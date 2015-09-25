app.controller('PostsCtrl', function PostsCtrl($scope, PostsFactory) {
    $scope.post = PostsFactory.posts[$stateParams.id];
    $scope.PostsFactory = PostsFactory;
});
