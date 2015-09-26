app.controller('PostsCtrl', function PostsCtrl($scope, PostsFactory, post) {
    $scope.post = post;

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
