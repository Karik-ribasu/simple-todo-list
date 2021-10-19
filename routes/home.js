const express = require("express")
const router = express.Router()
const path = require("path")

// middlewares
const findUser = require("../middlewares/auth-find-user")
const signUser = require("../middlewares/auth-sign-user-jwt")
const verifyUser = require("../middlewares/auth-verify-user-jwt")
const parseCookieToken = require("../middlewares/parse-cookie-token")

router.get("/", (req, res, next) => {
    if (req.userId) { res.redirect("/todo-list") }
    else { res.sendFile(path.join(require.main.path, "views", "login.html")) }
})

router.post("/", findUser, signUser, (req, res, next) => {
    res.statusCode = 200
    res.redirect("/todo-list")
})

module.exports = router