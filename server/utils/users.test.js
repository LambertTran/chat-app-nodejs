const expect = require('expect');
const {Users}  = require('./users');

describe('Users', () => {

	var users;

	beforeEach( () => {

		users = new Users();

		users.users = [{
			id:'1',
			name:'userA',
			room:'room1'
		},{
			id:'2',
			name:'userB',
			room:'room2'
		},{
			id:'3',
			name:'userC',
			room:'room1'
		}];
	});

	it('should add new users', () => {

		var users = new Users();
		var user  = {
			id:'123',
			name:'userA',
			room:'room1'
		};

		var res = users.addUser(user.id,user.name,user.room);

		expect(users.users).toEqual([user]);

	});

	it('should return name for room1', () => {
		var userList = users.getUserList('room1');
		expect(userList).toEqual(['userA','userC']);
	});


	it('should return name for room2', () => {
		var userList = users.getUserList('room2');
		expect(userList).toEqual(['userB']);
	});


	it('should find userA', () =>{
		var user = users.getUser('1');
		expect(user.name).toBe('userA');
	});


	it('should NOT find userA', () =>{
		var user = users.getUser('4');
		expect(user).toNotExist();
	});

	it('should delete userA', () =>{
		var user = users.removeUser('1');
		expect(user.name).toBe('userA');
		expect(users.users.length).toBe(2);
	});

	it('should not delete user', () =>{
		var user = users.removeUser('5');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});
});