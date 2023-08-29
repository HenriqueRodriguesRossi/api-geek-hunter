const mongoose = require("mongoose")

const ProfessionalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    professionalMoment: {
        type: String,
        required: true,
        default: "Urgently Seeking Opportunities"
    },
    desiredPositions: {
        type: String,
        required: true,
        default: "positions in Brazil"
    },
    linkedinUrl: {
        type: String,
        required: true
    },
    linkedinInfo: {
        type: String,
        required: true
    },
    affectedByMassLayoff: {
        type: Boolean,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model("Professionals", ProfessionalSchema)
