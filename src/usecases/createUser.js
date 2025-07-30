const User = require('../entities/user');
const UserRepository = require('../infrastructure/userRepository');

const createUser = async (userData, callback) => {
    try {
        const user = new User(userData);

        // Validate user data
        if (!user.isValid()) {
            return callback(new Error("Invalid user data"));
        }


        // Save the user to the database
        UserRepository.createUser(user, (err) => {
            if (err) {
                console.error("Error saving user to database:", err);
                return callback(err);
            }
            callback(null, { message: 'User created successfully!' });
        });
    } catch (error) {
        console.error("Error creating user:", error);
        callback(new Error("An error occurred while creating the user."));
    }
};

module.exports = createUser;