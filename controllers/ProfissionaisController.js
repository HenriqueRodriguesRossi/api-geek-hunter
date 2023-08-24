const ProfissionaisModel = require("../models/Profissionais");
const Yup = require("yup");
const axios = require("axios");
const captureErroYup = require("../utils/captureErroYup");
const bcrypt = require("bcryptjs");

module.exports = class ProfissionaisController {
    static async cadastraDev(req, res) {
        const {
            email,
            nomeCompleto,
            senha,
            repitaSenha,
            momentoProfissional,
            vagasDesejadas,
            urlLinkedin,
            afetadoDemissaoEmMassa
        } = req.body;

        try {
            const usuarioSchema = Yup.object().shape({
                email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
                nomeCompleto: Yup.string().required("Campo obrigatório!").min(8, "Nome muito curto!"),
                senha: Yup.string().required("Campo obrigatório!").min(8, "Senha deve ter no mínimo 8 caracteres!"),
                repitaSenha: Yup.string().required("Campo obrigatório!").oneOf([Yup.ref('senha'), null], 'As senhas não coincidem'),
                momentoProfissional: Yup.string().required("Campo obrigatório!"),
                vagasDesejadas: Yup.string().required("Campo obrigatório!"),
                urlLinkedin: Yup.string().required("Campo obrigatório!"),
                afetadoDemissaoEmMassa: Yup.boolean().required("Campo obrigatório!")
            });

            await usuarioSchema.validate(req.body, { abortEarly: false });

            const url = `${urlLinkedin}`;
            const response = await axios.get(url);

            if (!response) {
                return res.status(404).send({
                    mensagem: "Perfil do Linkedin não encontrado!"
                });
            }

            const usuario = await ProfissionaisModel.findOne({ email });

            if (usuario) {
                return res.status(400).send({
                    mensagem: "Email já cadastrado!"
                });
            }

            const momentosProfissionaisValidos = [
                "Não estou aberto a oportunidades",
                "Procuro oportunidades urgentes",
                "Empregado, mas busco novas oportunidades",
                "Não procuro vagas ativamente, mas estou aberto a oportunidades"
            ];
            
            if (!momentosProfissionaisValidos.includes(momentoProfissional)) {
                return res.status(422).send({
                    mensagem: "Por favor, escolha um momento profissional válido!"
                });
            }

            const categoriasVagasValidas = ["vagas no Brasil", "vagas no exterior"];
            
            if (!categoriasVagasValidas.includes(vagasDesejadas)) {
                return res.status(422).send({
                    mensagem: "Por favor, digite uma categoria de vagas válida!"
                });
            }

            const salt = await bcrypt.genSalt(12);
            const hashSenha = await bcrypt.hash(senha, salt);

            const novoUsuario = new ProfissionaisModel({
                email,
                nomeCompleto,
                senha: hashSenha,
                momentoProfissional,
                vagasDesejadas,
                urlLinkedin,
                informacoesLinkedin: response.data,
                afetadoDemissaoEmMassa
            });

            await novoUsuario.save();

            return res.status(201).send({
                mensagem: "Conta criada com sucesso!"
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    mensagem: captureErroYup(error)
                });
            }

            return res.status(500).send({
                mensagem: "Erro ao cadastrar conta!"
            });
        }
    }
};
