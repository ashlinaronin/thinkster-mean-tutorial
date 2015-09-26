app.controller('PostsCtrl', function PostsCtrl($scope, PostsFactory, post) {
    $scope.post = post;

    $scope.addComment = function() {
        // Don't allow user to submit empty comment
        if ($scope.body) {
            PostsFactory.addComment(post._id, {
                body: $scope.body,
                author: 'user'
            }).success(function(comment) {
                $scope.post.comments.push(comment);
            });

            // Reset input field and bound var after adding comment
            $scope.body = '';
        }
    };

    $scope.incrementUpvotes = function(comment) {
        PostsFactory.upvoteComment(post, comment);
    };
});
