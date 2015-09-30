// Factory interfaces between Angular and the RESTful API
app.factory('PostsFactory', function PostsFactory($http, AuthFactory) {
    var factory = {};
    factory.posts = [];

    factory.getAll = function() {
        return $http.get('/posts').success(function(data) {
            // Create a deep copy of the return data so that it will be updated everywhere
            angular.copy(data, factory.posts);
        });
    };

    // Create a new post via the factory on success of posts post HTTP request
    factory.create = function(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + AuthFactory.getToken()}
        }).success(function(data) {
            factory.posts.push(data);
        });
    };

    // Upvote a post when we go to that http address
    factory.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + AuthFactory.getToken()}
        }).success(function(data) {
            post.upvotes += 1;
        });
    };

    // Get one post based on its id when we go to a url indicating a post
    factory.getPost = function(id) {
        return $http.get('/posts/' + id).then(function(response) {
            return response.data;
        });
    };

    factory.addComment = function(postId, comment) {
        return $http.post('/posts/' + postId + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + AuthFactory.getToken()}
        });
    };

    factory.upvoteComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + AuthFactory.getToken()}
        }).success(function(data) {
                comment.upvotes += 1;
            });
    };

    return factory;
});
