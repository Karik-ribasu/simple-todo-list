const jws = require("jws")
const secret = require("../config/keys").secretJWS

function signUser(req, res, next) {
    const { userId } = req
    const time = {
        second: 1000,
        minute: 60000,
        hour: 3600000
    }

    const header = {
        alg: "HS256",
        type: "JWT"
    }

    const payload = {
        iss: "http://localhost:5000",
        iat: Date.now(),
        nbf: new Date(Date.now() + time.second / 2),
        exp: new Date(Date.now() + time.hour),
        sub: "TodoList",
        userId: userId.toString(),
    }

    const signature = jws.sign({
        header: header,
        payload: payload,
        secret: secret
    })

    res.setHeader("Set-Cookie", `Authorization=Bearer ${signature}; httpOnly=true;`)
    next()

}

module.exports = signUser