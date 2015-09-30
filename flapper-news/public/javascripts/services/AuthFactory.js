// This factory syntax protects against minification
app.factory('AuthFactory', ['$http', '$window', function($http, $window) {
    var authFactory = {};

    authFactory.saveToken = function (token) {
        $window.localStorage['flapper-news-token'] = token;
    };

    authFactory.getToken = function () {
        return $window.localStorage['flapper-news-token'];
    };

    authFactory.isLoggedIn = function () {
        var token = authFactory.getToken();

        /* If token exists, check payload to see if it has expired
        ** Payload is middle part of token between two .s.
        ** It's a JSON object that's been base 64'd - we get it back
        ** to stringified JSON by using $window.atob() then back to
        ** a JS object with JSON.parse. */
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    authFactory.currentUser = function() {
        if(authFactory.isLoggedIn()) {
            var token = authFactory.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    authFactory.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            authFactory.saveToken(data.token);
        });
    };

    authFactory.logIn = function(user) {
        return $http.post('/login', user).success(function(data) {
            authFactory.saveToken(data.token);
        });
    };

    authFactory.logOut = function() {
        $window.localStorage.removeItem('flapper-news-token');
    };


    return authFactory;
}]);
