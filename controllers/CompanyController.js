const CompanyModel = require("../models/Company");
const Yup = require("yup");
const captureYupError = require("../utils/captureYupError");
const jwt = require("jsonwebtoken");

module.exports = class CompanyController {
    static async registerCompany(req, res) {
        const { name, corporateEmail, companyName, openVacancies } = req.body;

        const companySchema = Yup.object().shape({
            name: Yup.string().required("Required field!").min(3, "Name is too short!"),
            corporateEmail: Yup.string().email("Invalid email!").required("Required field!"),
            companyName: Yup.string().required("Required field!").min(3, "Company name is too short!"),
            openVacancies: Yup.number().required("Required field!")
        });

        try {
            await companySchema.validate(req.body, { abortEarly: false });

            const newCompany = new CompanyModel({
                name,
                corporateEmail,
                companyName,
                openVacancies
            });

            await newCompany.save();

            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: newCompany._id,
                },
                secret
            );

            return res.status(201).send({
                message: "Success, you can now register new vacancies using the corporate email!",
                token: token,
                id: newCompany._id
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    message: captureYupError(error)
                });
            }

            return res.status(500).send({
                message: "Error while registering the information!"
            });
        }
    }
};
