const cookie = require("cookie")

function parseCookieToken(req, res, next) {
    if (req.headers.cookie) {
        let jwtToken = cookie.parse(req.headers.cookie).Authorization
        jwtToken = jwtToken.split(" ")[1]
        req.jwtToken = jwtToken
        next()
    } else {
        res.json({
            errors: [
                {
                    status: 400,
                    title: "User Authentication",
                    detail: "No User Token received"
                }
            ]
        })
    }
}


module.exports = parseCookieToken