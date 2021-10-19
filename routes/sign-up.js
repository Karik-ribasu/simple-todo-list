const express = require("express")
const router = express.Router()
const path = require("path")
const client = require("../config/dbClient")
const bcrypt = require("bcrypt")
const passwordSecret = require("../config/keys")

router.get("/", (req, res, next) => {
    res.sendFile(path.join(require.main.path, "views", "register.html"))
})

router.post("/", async (req, res, next) => {

    const { username, password } = req.body

    await client.query("select user_name from users where user_name = $1", [username])
        .then(result => {
            if (result.rows.length) {
                res.statusCode = 409
                res.json({
                    errors: [
                        {
                            status: 409,
                            title: "Invalid Username",
                            detail: "Username is already taken"
                        }
                    ]
                })
            } else {
                bcrypt.genSalt(10)
                    .then(salt => bcrypt.hash(password, salt))
                    .then(hash => client.query("insert into users(user_name, user_password) values($1, $2)", [username, hash]))
                    .then(result => res.redirect("/"))
                    .catch(err => {
                        console.error(err.message);
                        res.status(501)
                    })
            }
        })
        .catch(err => {
            if (err) {
                console.error("message: ", err.message, "\ndetail: ", err)
                res.statusCode = 500
                res.json({
                    errors: [
                        {
                            status: 500,
                            title: "Internal Error",
                            detail: "Something went wrong, try again in few minutes"
                        }
                    ]
                })
            }
        })


})

module.exports = router