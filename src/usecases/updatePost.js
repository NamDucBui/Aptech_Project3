const Post = require('../entities/post');
const PostRepository = require('../infrastructure/postRepository');

const updatePost = (id, postData, callback) => {
    // Đảm bảo dữ liệu bài viết được phân tích đúng
    const post = new Post({
        ...postData,
        post_id: id // Sử dụng post_id để cập nhật
    });

    // Debugging: Ghi lại chi tiết bài viết để kiểm tra vấn đề
    console.log('Post being validated:', post);

    if (!post.isValid()) {
        console.error('Validation failed for post:', post);
        return callback(new Error('Invalid post data'));
    }

    PostRepository.updatePost(id, post, (err, results) => {
        if (err) return callback(err);
        if (results.affectedRows > 0) {
            callback(null, 'Post updated!');
        } else {
            callback(new Error('Post not found'));
        }
    });
};

module.exports = updatePost;

