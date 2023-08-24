const mongoose = require("mongoose")

const EmpresaModel = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    emailCorporativo:{
        type: String,
        require: true
    },
    nomeDaEmpresa:{
        type: String,
        require: true
    },
    vagasEmAberto:{
        type: Number,
        require: true
    }
}, {versionKey: false})

module.exports = mongoose.model("Empresa", EmpresaModel)