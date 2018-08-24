const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Dennis',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Foo',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Joe',
            room: 'Node Course'
        }];
    });

    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: 123,
            name: 'Dennis', 
            room: 'Udemy'};
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for Node Course', ()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Dennis', 'Joe']);
    });

    it('should return names for React Course', ()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Foo']);
    });

    it('should remove a user', ()=>{
        var userId = '2';
        var user = users.removeUser(userId);
        expect(users.users.length).toBe(2);
        expect(user.name).toEqual('Foo');
    });

    it('should not remove a user', ()=>{
        var userId = '5';
        var user = users.removeUser(userId);
        expect(users.users.length).toEqual(3);
    });

    it('should find a user', ()=>{
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
        expect(user.name).toBe('Dennis');
    });

    it('should not find a user', ()=>{
        var userId = '5';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });
});