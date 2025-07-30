const PostRepository = require('../infrastructure/postRepository');

const incrementPostLike = (postId, callback) => {
    PostRepository.incrementLike(postId, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

module.exports = incrementPostLike; 