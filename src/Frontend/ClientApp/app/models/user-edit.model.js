import { User } from './user.model';
export class UserEdit extends User {
    constructor(currentPassword, newPassword, confirmPassword) {
        super();
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}
//# sourceMappingURL=user-edit.model.js.map