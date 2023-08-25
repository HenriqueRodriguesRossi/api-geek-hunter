const VagasModel = require("../models/Vagas");
const EmpresaModel = require("../models/Empresa")
const Yup = require("yup");
const captureErroYup = require("../utils/captureErroYup");

module.exports = class VagasController {
    static async cadastraVagas(req, res) {
        const { tituloDaVaga, tecnologiasDesejadas, salario, regimeDeTrabalho, modalidadeDeTrabalho, enderecoDaEmpresa, emailParaContato } = req.body;

        try {
            const vagasSchema = Yup.object().shape({
                tituloDaVaga: Yup.string().required("Campo obrigatório!").min(3, "Mínimo de 3 caracteres!"),
                tecnologiasDesejadas: Yup.string().required("Campo obrigatório!"),
                salario: Yup.number().moreThan(0, "O número deve ser maior que 0").required("Campo obrigatório"),
                regimeDeTrabalho: Yup.string().required("Campo obrigatório!"),
                modalidadeDeTrabalho: Yup.string().required("Campo obrigatório!"),
                enderecoDaEmpresa: Yup.string().when("modalidadeDeTrabalho", {
                    is: "Presencial",
                    then: Yup.string().required("Campo obrigatório para modalidade presencial")
                }),
                emailParaContato: Yup.email("Email inválido!").required("Campo obrigatório!")
            });

            await vagasSchema.validate(req.body, { abortEarly: false });

            const emailExiste = await EmpresaModel.findOne({emailCorporativo: emailParaContato})

            if(!emailExiste){
                return res.status(404).send({
                    mensagem: "Este email ainda não foi cadastrado em nosso sistema!"
                })
            }

            const novaVaga = new VagasModel({
                tituloDaVaga,
                tecnologiasDesejadas,
                salario,
                regimeDeTrabalho,
                modalidadeDeTrabalho,
                enderecoDaEmpresa,
                emailParaContato
            })

            await novaVaga.save()

            return res.status(201).send({
                mensagem: "Nova vaga cadastrada com sucesso!"
            })
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    mensagem: captureErroYup(error)
                });
            }

            return res.status(500).send({
                mensagem: "Erro ao cadastrar vaga!"
            });
        }
    }
};
