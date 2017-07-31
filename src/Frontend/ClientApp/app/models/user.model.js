export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id, userName, fullName, email, jobTitle, phoneNumber, roles) {
        this.id = id;
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.jobTitle = jobTitle;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
    get friendlyName() {
        let name = this.fullName || this.userName;
        if (this.jobTitle)
            name = this.jobTitle + " " + name;
        return name;
    }
}
//# sourceMappingURL=user.model.js.map