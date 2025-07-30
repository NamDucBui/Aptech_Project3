const User = require('../entities/user');
const UserRepository = require('../infrastructure/userRepository');

const updateUser = (id, userData, callback) => {
  // Ensure user data is correctly parsed
  const user = new User({
    ...userData,
    user_id: id
  });

  // Debugging: Log user details to check for issues
  console.log('User being validated:', user);

  if (!user.isValid()) {
    console.error('Validation failed for user:', user);
    return callback(new Error('Invalid user data: ' + JSON.stringify(user))); // Thêm chi tiết lỗi
  }

  UserRepository.updateUser(id, user, (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows > 0) {
      callback(null, 'User updated!');
    } else {
      callback(new Error('User not found'));
    }
  });
};

module.exports = updateUser;

