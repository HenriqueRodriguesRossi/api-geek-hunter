const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        ref: "Company",
        required: true
    },
    desiredTechnologies: {
        type: String,
        ref: "Company",
        required: true
    },
    salary: {
        type: Number,
        ref: "Company",
        required: true
    },
    workSchedule: {
        type: String,
        ref: "Company",
        required: true
    },
    workMode: {
        type: String,
        ref: "Company",
        required: true
    },
    companyAddress: {
        type: String,
        ref: "Company",
        required: false
    },
    contactEmail: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, { versionKey: false })

module.exports = mongoose.model("Jobs", JobSchema)
