const express = require("express")
const router = express.Router()
const client = require("../config/dbClient")

// middlewares
const verifyUser = require("../middlewares/auth-verify-user-jwt")
const parseCookieToken = require("../middlewares/parse-cookie-token")

router.use(parseCookieToken, verifyUser)

router.get("/", (req, res, next) => {
    const userId = parseInt(req.userId)
    client.query("select list.id, list.task from list join users on list.user_id = users.id where users.id = $1", [userId])
        .then(result => { res.json({ data: result.rows }) })
        .catch(err => {
            console.error(err.message)
            res.status(501)
        })
})

router.post("/", (req, res, next) => {
    const userId = parseInt(req.userId)
    if (req.body.task) {
        let task = req.body.task
        client.query("INSERT INTO list ( task, user_id) VALUES ( $1, (SELECT id from users WHERE id = $2) ) RETURNING id, task;", [task, userId])
            .then(result => { if (result) res.json({ data: result.rows }); else res.json({ message: "task não encontrada" }).status(400) })
            .catch(err => {
                console.error("erro: ", err.message)
                res.json({ message: "...algo deu errado aqui atrás!" }).status(501)
            })
    } else {
        res.json({
            errors: [
                {
                    status: 400,
                    title: "Request Body",
                    detail: "No task received on request body"
                }
            ]
        })
    }
})

router.delete("/", (req, res, next) => {
    const userId = parseInt(req.userId)
    const id = req.body.id
    if (typeof (id) == "number") {
        client.query("DELETE FROM list WHERE id = $1", [id])
            .then(result => res.send())
            .catch(err => {
                console.error(err.message)
                res.json({ message: "...algo deu errado aqui atrás!" }).status(501)
            })
    }
})

module.exports = router