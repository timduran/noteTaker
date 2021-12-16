const express = require('express')
const apiroutes = require('./Routes/apiRoutes/index')
const htmlroutes = require('./Routes/htmlRoutes/htmlroutes')
const app = express('')
const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use("/api", apiroutes)
app.use("/", htmlroutes)

app.listen(port, () => {
  console.log("server now on" + port)
})
