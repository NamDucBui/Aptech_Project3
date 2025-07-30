const Post = require('../entities/post');
const PostRepository = require('../infrastructure/postRepository');

const createPost = (postData, callback) => {
    const post = new Post(postData); // Tạo một đối tượng Post mới
    if (!post.isValid()) {
        return callback(new Error('Invalid post data')); // Kiểm tra tính hợp lệ của dữ liệu bài viết
    }

    PostRepository.createPost(post, (err, results) => {
        if (err) return callback(err); // Xử lý lỗi nếu có
        callback(null, results); // Trả về kết quả thành công
    });
};

module.exports = createPost;


