const ProfessionalModel = require("../models/Professionals");
const Yup = require("yup");
const axios = require("axios");
const captureYupErrors = require("../utils/captureYupErrors");
const bcrypt = require("bcryptjs");

module.exports = class ProfessionalsController {
    static async registerDev(req, res) {
        const {
            email,
            fullName,
            password,
            repeatPassword,
            careerMoment,
            desiredJobs,
            linkedinURL,
            affectedByMassLayoff
        } = req.body;

        try {
            const userSchema = Yup.object().shape({
                email: Yup.string().email("Invalid email!").required("Field is required!"),
                fullName: Yup.string().required("Field is required!").min(8, "Name is too short!"),
                password: Yup.string().required("Field is required!").min(8, "Password must be at least 8 characters!"),
                repeatPassword: Yup.string().required("Field is required!").oneOf([Yup.ref('password'), null], 'Passwords do not match'),
                careerMoment: Yup.string().required("Field is required!"),
                desiredJobs: Yup.string().required("Field is required!"),
                linkedinURL: Yup.string().required("Field is required!"),
                affectedByMassLayoff: Yup.boolean().required("Field is required!")
            });

            await userSchema.validate(req.body, { abortEarly: false });

            const url = `${linkedinURL}`;
            const response = await axios.get(url);

            if (!response) {
                return res.status(404).send({
                    message: "Linkedin profile not found!"
                });
            }

            const user = await ProfessionalModel.findOne({ email });

            if (user) {
                return res.status(400).send({
                    message: "Email already registered!"
                });
            }

            const validCareerMoments = [
                "Not open to opportunities",
                "Urgently seeking opportunities",
                "Employed but open to new opportunities",
                "Not actively looking, but open to opportunities"
            ];
            
            if (!validCareerMoments.includes(careerMoment)) {
                return res.status(422).send({
                    message: "Please choose a valid career moment!"
                });
            }

            const validJobCategories = ["jobs in Brazil", "jobs abroad"];
            
            if (!validJobCategories.includes(desiredJobs)) {
                return res.status(422).send({
                    message: "Please enter a valid job category!"
                });
            }

            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new ProfessionalModel({
                email,
                fullName,
                password: hashedPassword,
                careerMoment,
                desiredJobs,
                linkedinURL,
                linkedinInfo: response.data,
                affectedByMassLayoff
            });

            await newUser.save();

            return res.status(201).send({
                message: "Account created successfully!"
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    message: captureYupErrors(error)
                });
            }

            return res.status(500).send({
                message: "Error creating account!"
            });
        }
    }
};
