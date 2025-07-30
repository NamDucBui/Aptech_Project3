const Configuration = require('../entities/configuration');
const ConfigurationRepository = require('../infrastructure/configurationRepository');

const createConfiguration = (configurationData, callback) => {
    const configuration = new Configuration(configurationData);

    if(!configuration.isValid()){
        return callback(new Error("Invalid configurationData"));
    }

    ConfigurationRepository.createConfiguration(configuration, (err, result) => {
        if(err){
            return callback(err);        
        } 
        return callback(null, result);
    })
}

module.exports = createConfiguration;