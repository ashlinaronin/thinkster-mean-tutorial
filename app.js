var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'MainCtrl'
        });

        $stateProvider.state('posts', {
            url: '/posts/{id}',
            templateUrl: 'partials/posts.html',
            controller: 'PostsCtrl'
        });

        // Set up default state for unspecified routes
        $urlRouterProvider.otherwise('home');

    }
]);
