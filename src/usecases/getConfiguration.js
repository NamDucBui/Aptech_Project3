const Configuration = require('../entities/configuration'); 
const ConfigurationRepository = require('../infrastructure/configurationRepository');

const getConfiguration = (id, callback) => {
    ConfigurationRepository.getConfigurationById(id, (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            const configuration = new Configuration(results[0]);
            callback(null, configuration);
        } else {
            callback(new Error('Configuration not found'));
        }
    });
};

module.exports = getConfiguration;

