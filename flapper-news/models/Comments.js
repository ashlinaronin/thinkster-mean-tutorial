var mongoose = require('mongoose');


// Create a new Mongoose Schema for Comments. Notice each is
// connected to a post by an id.
var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

// What's cb? callback?
CommentSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
}

mongoose.model('Comment', CommentSchema);
