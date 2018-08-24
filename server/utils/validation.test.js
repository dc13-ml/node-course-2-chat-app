var expect = require('expect');
var {isRealString} = require('./validation');

describe ('isRealString', ()=>{
    it('should reject non-string values', ()=>{
        var str = 123;
        var bool = isRealString(str);
        expect(bool).toBeFalsy(); 
    });

    it('should allow string with non-space characters', ()=>{
        var str = ' this is a valid string';
        var bool = isRealString(str);
        expect(bool).toBeTruthy();
    });

    it('should reject string with only spaces', ()=>{
        var str = '    ';
        var bool = isRealString(str);
        expect(bool).toBeFalsy();
    });
});

