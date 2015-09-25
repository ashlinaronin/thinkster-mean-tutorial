app.controller('PostsCtrl', function PostsCtrl($scope, $stateParams, PostsFactory) {
    $scope.post = PostsFactory.posts[$stateParams.postId];
    $scope.PostsFactory = PostsFactory;

    $scope.incrementUpvotes = function(comment) {
        comment.upvotes += 1;
    }
});
