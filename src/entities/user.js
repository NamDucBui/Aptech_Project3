const bcrypt = require('bcrypt');

class User {
    constructor({
        user_id,
        username,
        password,
        email,
        contact_details,
        personal_info,
        professional_info,
        qualifications,
        experience,
        achievement,
        profile_visibility,
        logged_in
    }) {
        this.user_id = user_id;
        this.username = username;
        this.password = password; 
        this.email = email;
        this.contact_details = contact_details;
        this.personal_info = personal_info;
        this.professional_info = professional_info;
        this.qualifications = qualifications;
        this.experience = experience;
        this.achievement = achievement;
        this.profile_visibility = profile_visibility;
        this.logged_in = logged_in;
    }

    // Phương thức kiểm tra tính hợp lệ của đối tượng User
    isValid() {
        return (
            typeof this.username === 'string' && this.username.length > 0 &&
            typeof this.password === 'string' && this.password.length > 0 &&
            typeof this.email === 'string' && this.email.includes('@') && this.email.includes('.') &&
            (this.contact_details === null || typeof this.contact_details === 'string') &&
            (this.personal_info === null || typeof this.personal_info === 'string') &&
            (this.professional_info === null || typeof this.professional_info === 'string') &&
            (this.qualifications === null || typeof this.qualifications === 'string') &&
            (this.experience === null || typeof this.experience === 'number') &&
            (this.achievement === null || typeof this.achievement === 'string') &&
            (this.profile_visibility === null || typeof this.profile_visibility === 'string') &&
            typeof this.logged_in === 'number' && (this.logged_in === 0 || this.logged_in === 1)
        );
    }


}

module.exports = User;