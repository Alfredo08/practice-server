
const API_TOKEN = dot('env');

function greeting( req, res, next ){
    const sessionToken = req.headers.session_token

    if( sessionToken !== API_TOKEN  ){
        res.statusMessage = "Invalid token";
        return res.status( 401 ).end();
    }
    next();
    
}


module.exports = greeting;