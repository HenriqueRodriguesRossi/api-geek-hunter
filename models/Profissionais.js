const mongoose = require("mongoose")

const ProfissionaisModel = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    nomeCompleto:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    repitaSenha:{
        type: String,
        require: true
    },
    momentoProfissional:{
        type: String,
        require: true,
        default: "Procuro oportunidades urgentes"
    },
    vagasDesejadas:{
        type: String,
        require: true,
        default: "vagas no Brasil"
    },
    urlLinkedin:{
        type: String,
        require: true
    },
    informacoesLinkedin:{
        type: String,
        require: true
    },
    afetadoDemissaoEmMassa:{
        type: Boolean,
        require: true
    }
}, {versionKey: false})

module.exports = mongoose.model("Profissionais", ProfissionaisModel)