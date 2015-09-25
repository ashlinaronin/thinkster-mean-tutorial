var express = require('express');
var router = express.Router();

// Include mongoose and data models for Post and Comment
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

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
router.post('/posts', function(request, response, next) {
    var post = new Post(request.body);

    post.save(function(error, post) {
        if (error) {
            return next(error);
        }

        // If no error, send added post back to the client.
        response.json(post);
    });
});

/* GET /posts/:id
** Return an individual post with associated comments. */

/* PUT /posts/:id/upvote
** Upvote a post, using the post ID in the URL. */

/* POST /posts/:id/comments
** Add a new comment to a post by ID. */

/* PUT /posts/:id/comments/:id/upvote
** Upvote a comment. Maybe we want to use more descriptive id names? */

module.exports = router;
