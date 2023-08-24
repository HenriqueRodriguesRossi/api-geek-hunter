const mongoose = require("mongoose")
const dbUser = process.env.dbuser
const dbPass = process.env.dbpass

function connection(){
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.fsiei4f.mongodb.net/?retryWrites=true&w=majority`)

    const connection = mongoose.connection

    connection.on("open", ()=>{
        console.log("Conectado ao banco com sucesso!")
    })

    connection.on("error", (error)=>{
        console.log("Erro ao conectar ao banco!")
    })
}

connection()
module.exports = mongoose