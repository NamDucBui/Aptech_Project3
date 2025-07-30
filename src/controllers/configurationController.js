const getConfiguration = require('../usecases/getConfiguration');
const createConfiguration = require('../usecases/createConfiguration');

const createConfigurationHandler = (req, res) => {
    const configurationData = req.body; 
    createConfiguration(configurationData, (err, results) => {
        if (err) return res.status(500).send(err.message); 
        res.status(201).send('Configuration created!'); 
    });
};

const getConfigurationHandler = (req, res) => {
    const {id} = req.params;
    getConfiguration(id, (err, configuration) => {
        if (err) return res.status(err.message === 'User not found ' ? 404 : 500).send(err.message);
        res.json(configuration);
    })
}

module.exports = {
    getConfigurationHandler,
    createConfigurationHandler
}
