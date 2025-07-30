
const UserRepository = require('../infrastructure/userRepository');

const loginAccount = (email, password, callback) => {
    // Tìm người dùng theo email
    UserRepository.findUserByEmail(email, (err, user) => {
        if (err) {
            return callback(err); // Lỗi trong quá trình tìm kiếm
        }
        if (!user) {
            return callback(new Error('Invalid email or password')); // Không tìm thấy người dùng
        }

        if (user.password !== password) { // So sánh mật khẩu không mã hóa
            return callback(new Error('Invalid email or password')); // Mật khẩu không đúng
        }

        // Đăng nhập thành công, trả về thông tin người dùng
        callback(null, user);
    });
};

module.exports = loginAccount;