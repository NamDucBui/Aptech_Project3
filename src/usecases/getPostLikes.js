const PostRepository = require('../infrastructure/postRepository');

const getPostLikes = (postId, callback) => {
    PostRepository.getPostLikes(postId, (err, results) => {
        if (err) return callback(err);
        if (!results || results.length === 0) {
            return callback(new Error('Post not found'));
        }
        callback(null, results[0].post_like);
    });
};

module.exports = getPostLikes; 