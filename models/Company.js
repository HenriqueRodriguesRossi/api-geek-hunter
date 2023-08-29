const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    corporateEmail: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    openVacancies: {
        type: Number,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model("Company", CompanySchema)
