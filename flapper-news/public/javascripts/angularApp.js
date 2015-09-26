var app = angular.module('flapperNews', ['ui.router']);


/* By using the resolve property here, we make sure that anytime our home state
** is entered, we automatically query all posts from our backend before the
** state actually finishes loading. */
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['PostsFactory', function(PostsFactory) {
                return PostsFactory.getAll();
            }]
        }
    });

    // Whenever we go to a url with a postid, get data from factory db
    // and return it to controller
    $stateProvider.state('posts', {
        url: '/posts/:postId',
        templateUrl: 'partials/posts.html',
        controller: 'PostsCtrl',
        resolve: {
            post: ['$stateParams', 'PostsFactory', function($stateParams, PostsFactory) {
                return PostsFactory.getPost($stateParams.postId);
            }]
        }
    });


    // Set up default state for unspecified routes
    $urlRouterProvider.otherwise('home');

})
