// Imports
var jwt = require('jsonwebtoken');
const {JWT_SIGN_SECRET} = require("../../secrets");

// Generate a token when an user logs in
const generateTokenForUser = function(userData) {
    return jwt.sign({
            userId: userData.id,    // We keep track of his ID and admin status
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: "1h"     // Every hour, an user should reconnect
        }
    )
}

// Generate an admin token for the app to access private routes
const generateTokenForApp = function() {
    return jwt.sign({isAdmin:1}, JWT_SIGN_SECRET)
}

// Parse the authorization
const parseAuthorization = function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

// Check if token is an admin token
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