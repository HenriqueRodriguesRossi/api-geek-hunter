const JobModel = require("../models/Jobs");
const CompanyModel = require("../models/Company");
const Yup = require("yup");
const captureYupErrors = require("../utils/captureYupErrors");

module.exports = class JobsController {
    static async createJob(req, res) {
        const { jobTitle, desiredTechnologies, salary, workRegime, workModality, companyAddress, contactEmail, jobDescription } = req.body;

        try {
            const jobSchema = Yup.object().shape({
                jobTitle: Yup.string().required("Field is required!").min(3, "Minimum of 3 characters!"),
                desiredTechnologies: Yup.string().required("Field is required!"),
                salary: Yup.number().moreThan(0, "Number must be greater than 0").required("Field is required"),
                workRegime: Yup.string().required("Field is required!"),
                workModality: Yup.string().required("Field is required!"),
                companyAddress: Yup.string().when("workModality", {
                    is: "In-Person",
                    then: Yup.string().required("Field is required for in-person modality")
                }),
                contactEmail: Yup.string().email("Invalid email!").required("Field is required!"),
                jobDescription: Yup.string().required("This field is required!").min(5, "Job description must have at least 5 characters!")
            });

            await jobSchema.validate(req.body, { abortEarly: false });

            const emailExists = await CompanyModel.findOne({ emailCorporativo: contactEmail })

            if (!emailExists) {
                return res.status(404).send({
                    message: "This email has not been registered in our system yet!"
                });
            }

            const newJob = new JobModel({
                jobTitle,
                desiredTechnologies,
                salary,
                workRegime,
                workModality,
                companyAddress,
                contactEmail,
                jobDescription
            });

            await newJob.save();

            return res.status(201).send({
                message: "New job posted successfully!"
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    message: captureYupErrors(error)
                });
            }

            return res.status(500).send({
                message: "Error posting job!"
            },
            console.log(error)
            );
        }
    }

    static async listJobsByTechnology(req, res) {
        const desiredTechnologies = req.body.desiredTechnologies; // Adjust to get the correct property

        if (!desiredTechnologies) {
            return res.status(400).send({
                message: "To list jobs, enter something!"
            });
        }

        try {
            const returnedJobs = await JobModel.find({ desiredTechnologies: desiredTechnologies });

            if (!returnedJobs || returnedJobs.length === 0) { // Check if there's any job found
                return res.status(404).send({
                    message: "No job found for the provided technology."
                });
            }

            return res.status(200).send({ success: returnedJobs });
        } catch (error) {
            console.error("Error listing jobs:", error);
            return res.status(500).send({
                message: "Error listing jobs."
            });
        }
    }

    static async getAllJobs(req, res) {
        try {
            const jobs = await JobModel.find();

            if (jobs.length === 0) {
                return res.status(404).send({
                    message: "No jobs registered."
                });
            }

            return res.status(200).send({ jobs: jobs });
        } catch (error) {
            console.error("Error retrieving all jobs:", error);
            return res.status(500).send({
                message: "Error retrieving all jobs."
            });
        }
    }

    static async deleteJob(req, res) {
        const { jobTitle } = req.body;

        if (!jobTitle) {
            return res.status(400).send({
                message: "First enter something!"
            });
        }

        try {
            const foundJob = await JobModel.findOneAndDelete({ jobTitle });

            return res.status(200).send({
                message: "Job deleted successfully!"
            });
        } catch (error) {
            return res.status(500).send({
                message: "Error deleting the job!"
            });
        }
    }
};
