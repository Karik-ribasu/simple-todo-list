const jws = require("jws")
const secret = require("../config/keys").secretJWS

function verifyUser(req, res, next) {

    const token = req.jwtToken
    let payload, isValid
    if (jws.verify(token, "HS256", secret)) {
        payload = JSON.parse(jws.decode(token).payload)
        isValid = new Date(payload.exp) > new Date(Date.now()) ? true : false;
        isValid = payload.id ? true : false;
    }

    if (isValid) {
        req.userId = payload.userId
        next()
    } else {
        res.statusCode = 400
        res.setHeader("Location", "./")
        res.json({
            errors: [
                {
                    status: 400,
                    title: "User Authentication",
                    detail: "User is no longer logged"
                }
            ]
        })
    }
}

module.exports = verifyUser