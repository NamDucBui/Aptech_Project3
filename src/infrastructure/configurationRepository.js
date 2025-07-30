const db = require('./db');

class ConfigurationRepository {
    static createConfiguration(configuration, callback) {
        const query = `INSERT INTO configurations (configuration_name, value) VALUES (?, ?)`;
        db.query(query, [configuration.configuration_name, configuration.value], callback);
    }

    static getAllConfigurations(callback) {
        db.query('SELECT * FROM configurations', callback);
    }

    static getConfigurationById(id, callback) {
        db.query('SELECT * FROM configurations WHERE configuration_id = ?', [id], callback);
    }

    static updateConfiguration(id, configuration, callback) {
        const query = `UPDATE configurations SET configuration_name = ?, value = ? WHERE configuration_id = ?`;
        db.query(query, [configuration.configuration_name, configuration.value, id], callback);
    }

    static deleteConfiguration(id, callback) {
        db.query('DELETE FROM configurations WHERE configuration_id = ?', [id], callback);
    }
}

module.exports = ConfigurationRepository;

