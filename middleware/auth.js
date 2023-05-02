const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'sp4e4');
            if (decoded) {
                req.body.userName = decoded.userName;
                req.body.userId = decoded.userId;
                next()
            }
            else {
                res.status(400).send({ msg: "Wrong credentials" })
            }
        }
        catch (error) {
            res.status(400).send(error.message)
        }

    }
    else {
        res.status(200).send({ msg: "Please login" })
    }
}

module.exports = {
    auth
}