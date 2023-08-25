const mongoose = require("mongoose")

const VagaModel = new mongoose.Schema({
    tituloDaVaga:{
        type: String,
        ref: "Empresa",
        require: true
    },
    tecnologiasDesejadas:{
        type: String,
        ref: "Empresa",
        require: true
    },
    salario:{
        type: Number,
        ref: "Empresa",
        require: true
    },
    regimeDeTrabalho:{
        type: String,
        ref: "Empresa",
        require: true
    },
    modalidadeDeTrabalho:{
        type: String,
        ref: "Empresa",
        require: true
    },
    enderecoDaEmpresa:{
        type: String,
        ref: "Empresa",
        require: false
    },
    emailParaContato:{
        type: String,
        require: true
    }
}, {versionKey: false})

module.exports = mongoose.model("Vagas", VagaModel)