const db = require('./db');

class ReplyRepository {
    static createReply(reply, callback) {
        const query = `INSERT INTO replies (post_id, user_id, reply_content, reply_date, reply_target_id) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [reply.post_id, reply.user_id, reply.reply_content, reply.reply_date, reply.reply_target_id], callback);
    }

    static getAllReplies(callback) {
        db.query('SELECT * FROM replies', callback);
    }

    static getReplyById(id, callback) {
        db.query('SELECT * FROM replies WHERE reply_id = ?', [id], callback);
    }

    static updateReply(id, reply, callback) {
        const query = `UPDATE replies SET post_id = ?, user_id = ?, reply_content = ?, reply_date = ?, reply_target_id = ? WHERE reply_id = ?`;
        db.query(query, [reply.post_id, reply.user_id, reply.reply_content, reply.reply_date, reply.reply_target_id, id], callback);
    }

    static deleteReply(id, callback) {
        db.query('DELETE FROM replies WHERE reply_id = ?', [id], callback);
    }

    static getReplyByPostId(postId, callback) {
        const query = 'SELECT * FROM replies WHERE post_id = ?';
        db.query(query, [postId], callback);
    }

    static getReplyByPostId(postId, callback) {
        const query = 'SELECT * FROM replies WHERE post_id = ?';
        db.query(query, [postId], callback);
    }
}

module.exports = ReplyRepository;

