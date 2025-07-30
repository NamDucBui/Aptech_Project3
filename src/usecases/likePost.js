const PostRepository = require('../infrastructure/postRepository');

const likePost = async (postId, userId, callback) => {
    // Check if user has already liked the post
    PostRepository.checkUserLike(postId, userId, (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results && results.length > 0) {
            // User has already liked the post, so unlike it
            PostRepository.removeLike(postId, userId, (err) => {
                if (err) {
                    return callback(err);
                }
                callback(null, { action: 'unliked' });
            });
        } else {
            // User hasn't liked the post yet, so add like
            PostRepository.addLike(postId, userId, (err) => {
                if (err) {
                    return callback(err);
                }
                callback(null, { action: 'liked' });
            });
        }
    });
};

module.exports = likePost; 