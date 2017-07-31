export class Permission {
    constructor(name, value, groupName, description) {
        this.name = name;
        this.value = value;
        this.groupName = groupName;
        this.description = description;
    }
}
Permission.viewUsersPermission = "users.view";
Permission.manageUsersPermission = "users.manage";
Permission.viewRolesPermission = "roles.view";
Permission.manageRolesPermission = "roles.manage";
Permission.assignRolesPermission = "roles.assign";
//# sourceMappingURL=permission.model.js.map