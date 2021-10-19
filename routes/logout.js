const express = require("express")
const router = express.Router()

const jws = require("jws")
const secret = require("../config/keys").secretJWS

router.post("/", (req, res, next) => {

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
        exp: new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        sub: "TodoList",
        userId: null,
    }

    const signature = jws.sign({
        header: header,
        payload: payload,
        secret: secret
    })

    res.setHeader("Set-Cookie", `Authorization=Bearer ${signature};`)
    res.redirect("./")
})

module.exports = router