app.controller('MainCtrl', function MainCtrl($scope, PostsFactory) {
    // Mirror the array of posts returned by the factory
    $scope.posts = PostsFactory.posts;

    $scope.addPost = function() {
        // Don't let user add a blank post
        if (!$scope.title || $scope.title === '') {
            return;
        }

        console.log("in add post, title is " + $scope.title);
        console.log("in add post, link is " + $scope.link);


        $scope.posts.push(
            {
                title: $scope.title,
                link:  $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea', upvotes: 0}
                ]
            }
        );

        // Clear text boxes and bound title variables
        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    }
});
