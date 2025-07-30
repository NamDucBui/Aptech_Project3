const db = require('./db');

class UserRepository {
    static createUser(user, callback){
        const query = `INSERT INTO users (username, password, email, contact_details, personal_info, professional_info, qualifications, experience, achievement, profile_visibility, logged_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [user.username, user.password, user.email, user.contact_details, user.personal_info, user.professional_info, user.qualifications, user.experience, user.achievement, user.profile_visibility, user.logged_in], callback); // Bỏ user_id vì nó tự động tăng
    }

    static getAllUser(callback){
        db.query('SELECT * FROM users', callback);
    }

    static getUserById(id, callback){
        db.query('SELECT * FROM users WHERE user_id = ?', [id], callback);
    }

    static updateUser(id, user, callback){
        const query = `UPDATE users SET username = ?, password = ?, email = ?, contact_details = ?, personal_info = ?, professional_info = ?, qualifications = ?, experience = ?, achievement = ?, profile_visibility = ?, logged_in = ? WHERE user_id = ?`;
        db.query(query, [user.username, user.password, user.email, user.contact_details, user.personal_info, user.professional_info, user.qualifications, user.experience, user.achievement, user.profile_visibility, user.logged_in, id], callback);
    }

    static deleteUser(id, callback){
        db.query('DELETE FROM users WHERE user_id = ?', [id], callback);
    }

    static getUserCount(callback) {
        db.query('SELECT COUNT(*) AS count FROM users', (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].count);
        });
    }

    static getLoggedInUserCount(callback) {
        db.query('SELECT COUNT(*) AS count FROM users WHERE logged_in = 1', (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].count);
        });
    }

    static findUserByEmail(email, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null); 
            callback(null, results[0]); 
        });
    }

}

module.exports = UserRepository;
