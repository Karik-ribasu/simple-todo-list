const client = require("../config/dbClient")
const bcrypt = require("bcrypt")

async function findUser(req, res, next) {

    const username = req.body.username;
    const password = req.body.password;

    await client.query("SELECT id, user_name, user_password FROM users WHERE user_name = $1", [username])
        .then(result => new Promise((resolve, reject) => {

            if (result.rows.length) {
                req.userId = result.rows[0].id
                resolve(...result.rows)
            }
            else reject()
        }))
        .then(rows => {
            return bcrypt.compare(password, rows.user_password)
        })
        .then(comparison => {
            if (comparison) {
                next()
            }
            else {
                res.statusCode = 400
                res.json({
                    errors: [
                        {
                            status: 400,
                            title: "User Authentication",
                            detail: "Invalid username/password"
                        }
                    ]
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
            } else {
                res.statusCode = 400
                res.json({
                    errors: [
                        {
                            status: 400,
                            title: "User Authentication",
                            detail: "Invalid username/password"
                        }
                    ]
                })
            }
        })

}

module.exports = findUser