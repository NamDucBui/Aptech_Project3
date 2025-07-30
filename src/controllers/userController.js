const createUser = require('../usecases/createUser');
const getUser = require('../usecases/getUser');
const updateUser = require('../usecases/updateUser');
const deleteUser = require('../usecases/deleteUser');
const getUserStatistics = require('../usecases/getUserStatistics');
const loginAccount = require('../usecases/loginAccount');

const createUserHandler = (req, res) => {
  const userData = req.body;
  createUser(userData, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json('User created!');
  });
};

const getAllUsersHandler = (req, res) => {
  const UserRepository = require('../infrastructure/userRepository');
  UserRepository.getAllUser((err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
};

const getUserHandler = (req, res) => {
  const { id } = req.params;
  getUser(id, (err, user) => {
    if (err) return res.status(err.message === 'User not found ' ? 404 : 500).send(err.message);
    res.json(user);
  });
};

const updateUserHandler = (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  updateUser(id, userData, (err, message) => {
    if (err) return res.status(err.message === 'User not found' ? 404 : 500).send(err.message);
    res.send(message);
  });
};

const deleteUserHandler = (req, res) => {
  const { id } = req.params;
  deleteUser(id, (err, message) => {
    if (err) return res.status(err.message === 'User not found' ? 404 : 500).send(err.message);
    res.send(message);
  });
};

const getUserStatisticsHandler = (req, res) => {
    getUserStatistics((err, statistics) => {
      
        if (err) return res.status(500).send(err.message);
        res.json(statistics);
    });
};

const loginUserHandler = (req, res) => {
  const { email, password } = req.body;

  loginAccount(email, password, (err, user) => {
    if (err) {
      return res.status(err.message === 'Invalid email or password' ? 401 : 500).send(err.message);
    }
    
    res.json({
      message: 'Login successful!',
      user: user 
    });
  });
};

module.exports = {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserStatisticsHandler,
  loginUserHandler
};
