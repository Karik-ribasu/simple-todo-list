const express = require("express")
const router = express.Router()
const path = require("path")

const verifyUser = require("../middlewares/auth-verify-user-jwt")
const parseCookieToken = require("../middlewares/parse-cookie-token")

router.get("/", parseCookieToken, verifyUser, (req, res, next) => {
    res.sendFile(path.join(require.main.path, "views", "todo-list.html"))
    // res.json({ message: "todo-list.html" })
})

module.exports = router