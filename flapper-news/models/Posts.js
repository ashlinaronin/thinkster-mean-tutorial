var mongoose = require('mongoose');

// Define a new Mongoose Schema for Posts. Notice each is
// connected to a comment by an id.
var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// What's cb? callback?
PostSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
}

mongoose.model('Post', PostSchema);
