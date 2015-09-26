var express = require('express');
var router = express.Router();

// Not sure if this is the right require order
var passport = require('passport');
var jwt = require('express-jwt');

// Include mongoose and data models for Post and Comment
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

// Create a middleware for authenticating jwt tokens
// Again, we should be using an environment var for secret
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


// Create route middleware for getting post object from db
router.param('postId', function(request, response, next, postId) {
    var query = Post.findById(postId);

    query.exec(function (error, post) {
        if (error) {
            return next(error);
        }
        if (!post) {
            return next(new Error('can\'t find post'));
        }

        // once we've got the object from the db, attach it to the request
        request.post = post;

        // continue
        next();
    });
});

// Create route middleware for getting comment object from db
router.param('commentId', function(request, response, next, commentId) {
    var query = Comment.findById(commentId);

    query.exec(function (error, comment) {
        if (error) {
            return next(error);
        }
        if (!comment) {
            return next(new Error('can\'t find comment'));
        }

        // once we've got the object from the db, attach it to the request
        request.comment = comment;

        // continue
        next();
    });
});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /posts
** Return a list of posts and associated metadata. */
router.get('/posts', function(request, response, next) {
    Post.find(function(error, posts) {
        if (error) {
            return next(error);
        }

        // If no error, send retrieved posts back to the client.
        response.json(posts);
    });
});



/* POST /posts
** Create a new post. */
router.post('/posts', auth, function(request, response, next) {
    var post = new Post(request.body);

    // Get author from payload when creating a new post
    post.author = request.payload.username;

    post.save(function(error, post) {
        if (error) {
            return next(error);
        }

        // If no error, send added post back to the client.
        response.json(post);
    });
});

/* GET /posts/:id
** Return an individual post with associated comments.
** Here we are using Express's param() function to automatically
** load the post object from the DB based on its ID and then
** pass it to the route as part of the request. */
router.get('/posts/:postId', function(request, response) {
    request.post.populate('comments', function(error, post) {
        if (error) { return next(error); }

        response.json(post);
    });
});



/* PUT /posts/:id/upvote
** Upvote a post, using the post ID in the URL. */
router.put('/posts/:postId/upvote', auth, function(request, response, next) {
    request.post.upvote(function(error, post) {
        if (error) { return next(error); }

        response.json(post);
    });
});

/* POST /posts/:id/comments
** Add a new comment to a post by ID. */
router.post('/posts/:postId/comments', auth, function(request, response, next) {
    var comment = new Comment(request.body);
    comment.post = request.post;
    comment.author = request.payload.username;

    comment.save(function(error, comment) {
        if (error) { return next(error); }

        request.post.comments.push(comment);
        request.post.save(function(error, post) {
            if (error) { return next(error); }

            response.json(comment);
        });
    });
});

/* PUT /posts/:id/comments/:id/upvote
** Upvote a comment. Maybe won't work??
** Need another middleware function for :comment */
router.put('/posts/:postId/comments/:commentId/upvote', auth, function(request, response, next) {
    request.comment.upvote(function(error, comment) {
        if (error) { return next(error); }

        response.json(comment);
    });
});


/* Register as a new user, create a username and password. */
router.post('/register', function(request, response, next) {
    if (!request.body.username || !request.body.password) {
        return response.status(400).json({message: 'Please fill out all the fields'});
    }

    var user = new User();

    user.username = request.body.username;

    user.setPassword(request.body.password);

    user.save(function (error) {
        if (error) {return next(error); }

        return response.json({token: user.generateJWT()});
    });
});

/* Login-- authenticate user and return a token to the client. */
router.post('/login', function(request, response, next) {
    if (!request.body.username || !request.body.password) {
        return response.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(error, user, info) {
        if (error) { return next(error); }

        if (user) {
            return response.json({token: user.generateJWT()});
        } else {
            return response.status(401).json(info);
        }
    })(request, response, next);
});

// What is that goofy thing on line 181?




module.exports = router;
