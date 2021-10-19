const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
require("dotenv")

// server config
const app = express()
app.set("views", path.join(__dirname, "views"))
app.set("password-secret", process.env.PASSWORDSECRET)
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public"))
app.use(express.json())
app.disable('x-powered-by');

// routes
const routesHome = require("../routes/home")
const routeslogout = require("../routes/logout")
const routesSignUp = require("../routes/sign-up")
const routesTodolist = require("../routes/todo-list")
const routesTodolistAPI = require("../routes/todo-list-api")
const routes404 = require("../routes/404")

app.use("/", routesHome)
app.use("/logout", routeslogout)

app.use("/sign-up", routesSignUp)
app.use("/todo-list", routesTodolist)
app.use("/todo-list/api", routesTodolistAPI)
app.use("/", routes404)

// export
module.exports = app
