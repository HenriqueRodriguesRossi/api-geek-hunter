const VagasModel = require("../models/Vagas");
const EmpresaModel = require("../models/Empresa")
const Yup = require("yup");
const captureErroYup = require("../utils/captureErroYup");

module.exports = class VagasController {
    static async cadastraVagas(req, res) {
        const id = req.params._id

        const empresa = await EmpresaModel.findById(id, "-password");

        if (!empresa) {
            return res.status(403).json({ msg: "Crie uma conta para a sua empresa!" });
        }

        const { tituloDaVaga, tecnologiasDesejada, salario, regimeDeTrabalho, modalidadeDeTrabalho, enderecoDaEmpresa, emailParaContato } = req.body;

        try {
            const vagasSchema = Yup.object().shape({
                tituloDaVaga: Yup.string().required("Campo obrigatório!").min(3, "Mínimo de 3 caracteres!"),
                tecnologiasDesejada: Yup.string().required("Campo obrigatório!"),
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

            const emailExiste = await EmpresaModel.findOne({ emailCorporativo: emailParaContato })

            if (!emailExiste) {
                return res.status(404).send({
                    mensagem: "Este email ainda não foi cadastrado em nosso sistema!"
                })
            }

            const novaVaga = new VagasModel({
                tituloDaVaga,
                tecnologiasDesejada,
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

    // ...

    static async listaVagasPorTecnologia(req, res) {
        const tecnologiasDesejada = req.body.tecnologiasDesejada; // Ajuste para pegar a propriedade correta

        if (!tecnologiasDesejada) {
            return res.status(400).send({
                mensagem: "Para listar as vagas, digite alguma coisa!"
            });
        }

        try {
            const retornaVagas = await VagasModel.find({ tecnologiasDesejada: tecnologiasDesejada });

            if (!retornaVagas || retornaVagas.length === 0) { // Verifique se há vaga encontrada
                return res.status(404).send({
                    mensagem: "Nenhuma vaga encontrada para a tecnologia fornecida."
                });
            }

            return res.status(200).send({ sucesso: retornaVagas });
        } catch (error) {
            console.error("Erro ao listar vagas:", error);
            return res.status(500).send({
                mensagem: "Erro ao listar as vagas."
            });
        }
    }
};
