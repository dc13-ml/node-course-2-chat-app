class Users {
    constructor () {
        this.users = [];
    };

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    };

    removeUser (id) {
        var user = this.getUser(id);
        if (user) {
            this.users.pop(user);
        };
        return user;
    };

    getUser (id) {
        // if none found, then this statement will return undefined.
        return this.users.filter((user)=>user.id === id)[0];
    };

    getUserList(room) {
        var users = this.users.filter((user)=> user.room === room);
        // Only returns the user.name.  Not other attributes.
        var namesArray = users.map((user)=>user.name);
        return namesArray;
    };
};

module.exports = {
    Users
};