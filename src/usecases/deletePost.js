const PostRepository = require('../infrastructure/postRepository');

const deletePost = (id, callback) => {
  PostRepository.deletePost(id, (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows > 0) {
      callback(null, 'Post deleted!');
    } else {
      callback(new Error('Post not found'));
    }
  });
};

module.exports = deletePost;