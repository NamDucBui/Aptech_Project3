class Configuration {
    constructor({
        configuration_id,
        configuration_name,
        value
    }) {
        this.configuration_id = configuration_id; 
        this.configuration_name = configuration_name;
        this.value = value;
    }

    isValid() {
        return (
            typeof this.configuration_name === 'string' && this.configuration_name.length > 0 &&
            (this.value === null || typeof this.value === 'string')
        );
    }
}

module.exports = Configuration;