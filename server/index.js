import Express from "express";
import { criarTabelas, User} from "./db.js";
import bcryptjs from "bcrypt"
const app = Express()
app.use(Express.json())
// criarTabelas()
app.post('/registro', async (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body
    if(!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('vc deve preencher todos os campos')
        return
    }
    const userExiste = await User.findOne({where:{email:email}})
    if (userExiste){
        res.send('usuario ja existe')
        return
    }   
    const senhacriptografada = bcryptjs.hashSync(senha, 10)
    const teste = await User.create({nome,sobrenome, email, senha, dataNascimento})
    res.send('uuario ja criado')
    

    res.send('ok usuario criado')
    console.log(email);
    res.send('ta funcionando aq tambem')
})

app.post('/login', (req,res)=>{
    const{email, senha} = req.body
    if(!email || !senha){
        res.send('voce deve preencher')
    }
    console.log(email,'//', senha)
    res.send('Usuario logado')
})
app.listen(8000)