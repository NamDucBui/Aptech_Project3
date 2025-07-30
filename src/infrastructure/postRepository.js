const db = require('./db');

class PostRepository {
    static createPost(post, callback) {
        const query = `INSERT INTO posts (user_id, post_title, post_content, post_like, post_view, post_replies, post_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [post.user_id, post.post_title, post.post_content, post.post_like, post.post_view, post.post_replies, post.post_date], callback);
    }

    static getAllPosts(callback) {
        db.query('SELECT * FROM posts', callback);
    }

    static getPostById(id, callback) {
        db.query('SELECT * FROM posts WHERE post_id = ?', [id], callback);
    }

    static updatePost(id, post, callback) {
        const query = `UPDATE posts SET user_id = ?, post_title = ?, post_content = ?, post_like = ?, post_view = ?, post_replies = ?, post_date = ? WHERE post_id = ?`;
        db.query(query, [post.user_id, post.post_title, post.post_content, post.post_like, post.post_view, post.post_replies, post.post_date, id], callback);
    }

    static deletePost(id, callback) {
        db.query('DELETE FROM posts WHERE post_id = ?', [id], callback);
    }

    static countReplies(postId, callback) {
        const query = 'SELECT COUNT(*) as reply_count FROM replies WHERE post_id = ?';
        db.query(query, [postId], callback);
    }

    static countViews(postId, callback) {
        const query = 'SELECT post_view FROM posts WHERE post_id = ?';
        db.query(query, [postId], callback);
    }

    static incrementView(postId, callback) {
        const query = 'UPDATE posts SET post_view = post_view + 1 WHERE post_id = ?';
        db.query(query, [postId], callback);
    }

    static incrementLike(postId, callback) {
        const query = 'UPDATE posts SET post_like = post_like + 1 WHERE post_id = ?';
        db.query(query, [postId], callback);
    }
}

module.exports = PostRepository;

