app.controller('PostsCtrl', function PostsCtrl($scope, $stateParams, PostsFactory) {
    $scope.post = PostsFactory.posts[$stateParams.postId];
    $scope.PostsFactory = PostsFactory;

    $scope.addComment = function() {
        // Don't allow user to submit empty comment
        if ($scope.body) {
            $scope.post.comments.push(
                {
                    body: $scope.body,
                    author: 'user',
                    upvotes: 0
                }
            );
            // Reset input field and bound var after adding comment
            $scope.body = '';
        }
    }

    $scope.incrementUpvotes = function(comment) {
        comment.upvotes += 1;
    }
});
