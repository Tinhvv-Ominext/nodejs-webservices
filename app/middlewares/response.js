const jwt = require("jsonwebtoken");

module.exports = {
    format: function(status, message, data) {
        return {
            status: status,
            message : message,
            data : data
         }
    },

    idFromHeaders: function(req, res, next){
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1],
                decoded;
            try {
                decoded = jwt.verify(authorization, secret.secretToken);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            var userId = decoded.id;
            // Fetch the user by id 
            User.findOne({_id: userId}).then(function(user){
                // Do something with the user
                return res.send(200);
            });
        }
        return res.send(500);
    }
}