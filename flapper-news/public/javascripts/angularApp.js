var app = angular.module('flapperNews', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl'
    });

    $stateProvider.state('posts', {
        url: '/posts/:postId',
        templateUrl: 'partials/posts.html',
        controller: 'PostsCtrl'
    });

    // Set up default state for unspecified routes
    $urlRouterProvider.otherwise('home');

})
