const PostRepository = require('../infrastructure/postRepository');

const incrementPostView = (postId, callback) => {
    PostRepository.incrementView(postId, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = incrementPostView; 