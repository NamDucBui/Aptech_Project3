const User = require('../entities/user');
const UserRepository = require('../infrastructure/userRepository');

const getUser = (id, callback) => {
    UserRepository.getUserById(id, (err, results) => {
        if(err) return callback(err);
        if(results.length > 0){
            const user = new User(results[0]);
            callback(null, user);
        } else {
            callback(new Error('User not found'));
        }
    })
}

module.exports = getUser;