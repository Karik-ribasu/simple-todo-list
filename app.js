const app = require("./config/server")
const client = require("./config/dbClient")

// server run
app.listen(5000, () => console.log("running on 5000"))
client.connect()