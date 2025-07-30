const UserRepository = require('../infrastructure/userRepository');

const deleteUser = (id, callback) => {
  UserRepository.deleteUser(id, (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows > 0) {
      callback(null, 'User deleted!');
    } else {
      callback(new Error('User not found'));
    }
  });
};

module.exports = deleteUser;

