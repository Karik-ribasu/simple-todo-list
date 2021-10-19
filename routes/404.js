const express = require("express")
const router = express.Router()

router.use("/", (req, res, next) => {
    res.statusCode = 404
    res.send("<h1>Url não encontrada</h1>")
})

module.exports = router