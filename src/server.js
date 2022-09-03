const express = require("express")
const app = express()

app.all("/", (req, res)=>{
  res.send("Status [OK]")
})

module.exports = function keepAlive()
{
  app.listen(5000, ()=>console.log("server is keeping alive"))
}

