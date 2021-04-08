const addTwoNumbers = require( './addTwoNumbers');
const { expect } = require( 'chai' );


    it( 'Should return a 30 when sending a 10 and a 20', () => {
        let result = addTwoNumbers( 10, 20 );
        expect( result ).to.equal(30);
    })
