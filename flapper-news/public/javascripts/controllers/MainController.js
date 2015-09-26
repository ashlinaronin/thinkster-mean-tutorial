app.controller('MainCtrl', function MainCtrl($scope, PostsFactory) {
    // Mirror the array of posts returned by the factory
    $scope.posts = PostsFactory.posts;

    // Add post to DB via the postfactory
    $scope.addPost = function() {
        // Don't let user add a blank post
        if ($scope.title) {
            PostsFactory.create({
                title: $scope.title,
                link: $scope.link
            });

            // Clear text boxes and bound title variables
            $scope.title = '';
            $scope.link = '';
        }
    };

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    }
});
