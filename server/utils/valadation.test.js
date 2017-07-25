const expect = require('expect');

const {isRealString} = require('./valadation');

describe('isRealString', ()=> {

	it("should reject non-string value", () => {

		var res = isRealString(90);

		expect(res).toBe(false);

	});
	
	it('should reject string with only space', () => {

		var res = isRealString('    ');

		expect(res).toBe(false);

	});

	it('should allow string with spaces', () => {

		var res = isRealString(' abc d   ');

		expect(res).toBe(true);

	});

});