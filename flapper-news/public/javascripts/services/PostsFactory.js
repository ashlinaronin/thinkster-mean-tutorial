app.factory('PostsFactory', function PostsFactory($http) {
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
        return $http.post('/posts', post).success(function(data) {
            factory.posts.push(data);
        });
    };

    return factory;
});
