require("dotenv")

const secretPassword = process.env.PASSWORDSECRET
const secretJWS = process.env.JWSSECRET

module.exports = {
    secretPassword: secretPassword,
    secretJWS: secretJWS
}