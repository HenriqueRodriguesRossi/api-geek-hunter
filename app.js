const express = require("express")
const app = express()
require("dotenv").config()
require("./db/connection")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const ProfissionaisRouter = require("./router/ProfissionaisRouter")
app.use(ProfissionaisRouter)

app.listen(8080, ()=>{
    console.log("O servidor está rodando na porta 8080")
})