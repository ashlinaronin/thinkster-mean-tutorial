app.controller('MainCtrl', [
    '$scope',
    'postsFactory'
    function($scope) {
        $scope.test = 'Hello world!';

        // Mirror the array of posts returned by the factory
        $scope.posts = PostsFactory.posts;

        $scope.addPost = function() {
            // Don't let user add a blank post
            if (!$scope.title || $scope.title === '') {
                return;
            }

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
    }
]);
