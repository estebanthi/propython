// Imports
var jwt = require('jsonwebtoken');


// Constants
const JWT_SIGN_SECRET = "0shzdzjzbhf74282hdjznfjdk9ndnzindn99jdnzndajne5";

const generateTokenForUser = function(userData) {
    return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: "1h"
        }
    )
}

const generateTokenForApp = function() {
    return jwt.sign({isAdmin:1}, JWT_SIGN_SECRET)
}

const parseAuthorization = function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}


const checkAdminAccess = function(authorization) {
    var isAdmin = 0
    var token = parseAuthorization(authorization);
    if (token != null) {
        try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null)
                isAdmin = jwtToken.isAdmin;
        } catch(err) {}
    }
    return isAdmin;
}



module.exports = {
    generateTokenForApp:generateTokenForApp,
    checkAdminAccess:checkAdminAccess,
    generateTokenForUser:generateTokenForUser
}