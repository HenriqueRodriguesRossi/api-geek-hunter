const mongoose = require("express")

const VagaModel = new mongoose.Schema({
    tituloDaVaga:{
        type: String,
        require: true
    },
    tecnologiasDesejadas:{
        type: String,
        require: true
    },
    salario:{
        type: Number,
        require: true
    },
    regimeDeTrabalho:{
        type: String,
        require: true
    },
    modalidadeDeTrabalho:{
        type: String,
        require: true
    },
    enderecoDaEmpresa:{
        type: String,
        require: false
    }
}, {versionKey: false})

module.exports = mongoose.model("Vagas", VagaModel)