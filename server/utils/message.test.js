const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should geneate the correct message', () => {
        var from = 'Dennis';
        var text = 'A test message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});