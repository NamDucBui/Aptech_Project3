const Post = require('../entities/post');
const PostRepository = require('../infrastructure/postRepository');

const getAllPosts = (callback) => {
    PostRepository.getAllPosts((err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có

        // Tạo một mảng các đối tượng Post từ kết quả
        const posts = results.map(result => new Post(result));
        callback(null, posts); // Trả về mảng bài viết
    });
};

module.exports = getAllPosts;


