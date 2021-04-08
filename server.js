require( 'dotenv' ).config();
const express = require( 'express' );
const bcrypt = require( 'bcrypt' );
const knex = require( 'knex' );
const app = express();
const jsonParser = express.json();

const db = knex({
    client : 'pg',
    connection : 'postgresql://alfredosalazar@localhost/login'
});

app.post( '/api/login', jsonParser, (req, res, next) => {
    const {username, password} = req.body;
    debugger;
    db.select( '*' )
        .first()
        .from( 'users' )
        .where( {username: username} )
        .then( data => {
            console.log( data );


            bcrypt.compare(password, data.password)
                .then((result) => {
                    if( result ){
                        return res.status( 200 ).json({ message: `Welcome back ${data.firstname} ${data.lastname}.`})
                    }
                    else{
                        return res.status( 401 ).send( "Wrong credentials" );
                    }
                });
        })

});

app.post( '/api/hash', jsonParser, ( req, res, next ) => {
    const { username, password, firstname, lastname } = req.body;

    bcrypt.hash(password, 10)
        .then((err, hash)  => {
            if( err ){
                return res.status(400).end();
            }

            const newUser = {
                username,
                firstname,
                lastname,
                password : hash
            };

            db.insert( newUser )
                .into( 'users' )
                .returning( '*' )
                .then( result => {
                    return res.status( 201 ).json(result[0]);
                })
    });

});

app.listen( 8080, () => {
    console.log( "This server is running in port 8080." );
});

