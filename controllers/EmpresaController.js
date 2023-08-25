const EmpresaModel = require("../models/Empresa")

module.exports = class EmpresaController{
    static async cadastrarEmpresa(req, res){
        const {nome, emailCorporativo, nomeDaEmpresa, vagasEmAberto} = req.body

        const empresSchema = Yup.object().shape({
            nome: Yup.string().required("Campo obrigatório!").min(3, "Nome muito curto!"),
            emailCorporativo: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
            nomeDaEmpresa: Yup.string().required("Campo obrigatório!").min(3, "Nome da empresa muito curto!"),
            vagasEmAberto: Yup.number().required("Campo obrigatório!")
        })

        try{
            await empresSchema.validate(req.body, { abortEarly: false })

            const novaEmpresa = new EmpresaModel({
                nome,
                emailCorporativo,
                nomeDaEmpresa,
                vagasEmAberto
            })

            await novaEmpresa.save()

            return res.status(201).send({
                mensagem: "Sucesso, agora você pode cadastrar novas vagas utilizando o emailcorporativo!"
            })
        }catch(error){
            if (error instanceof Yup.ValidationError) {
                return res.status(422).send({
                    mensagem: captureErroYup(error)
                });
            }

            return res.status(500).send({
                mensagem: "Erro ao cadastrar as informações!"
            });
        }
    }
}