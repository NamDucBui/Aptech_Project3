const Post = require('../entities/post');
const PostRepository = require('../infrastructure/postRepository');

const getPost = (id, callback) => {
    PostRepository.getPostById(id, (err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có
        if (results.length > 0) {
            const post = new Post(results[0]); // Tạo một đối tượng Post từ kết quả
            callback(null, post); // Trả về bài viết
        } else {
            callback(new Error('Post not found')); // Nếu không tìm thấy bài viết
        }
    });
};

module.exports = getPost;

