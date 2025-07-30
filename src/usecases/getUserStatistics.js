const UserRepository = require('../infrastructure/userRepository');

const getUserStatistics = (callback) => {
    UserRepository.getUserCount((err, totalUsers) => {
        if (err) return callback(err);

        UserRepository.getLoggedInUserCount((err, loggedInUsers) => {
            if (err) return callback(err);

            callback(null, { totalUsers, loggedInUsers });
        });
    });
};

module.exports = getUserStatistics;
