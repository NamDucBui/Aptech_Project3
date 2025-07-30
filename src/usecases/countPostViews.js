const PostRepository = require('../infrastructure/postRepository');

const countPostViews = (postId, callback) => {
    PostRepository.countViews(postId, (err, results) => {
        if (err) return callback(err);
        if (!results || results.length === 0) {
            return callback(new Error('Post not found'));
        }
        callback(null, results[0].post_view);
    });
};

module.exports = countPostViews; 