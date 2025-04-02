const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mario0705',
    database: 'projeto1'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

//Inserir Cordenador
app.post('/coordenadores',(req,res)=>{
   const cordenadores = req.body;
   db.query('INSERT INTO coordenadores SET ?',coordenadores,(err,result)=> {
    if (err) {
        console.error('Erro ao inserir cordonador:', err);
            return res.status(500).json({ error: 'Erro ao inserir coordenador' });
        }
    res.json({id:results.insertId,...coordenadores})
   });
});

app.post("/docentes", async (req, res) => {
    const docentes = { nome, telefone, celular, email, area, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios!" });
    }

    try {
        const conn = await db.getConnection();
        await conn.beginTransaction(); // Inicia transação

        // 🔹 1. Inserir o docente
        const [docenteResult] = await conn.execute(
            "INSERT INTO docentes (nome_docente, telefone_docente, celular_docente, email_docente, area) VALUES (?, ?, ?, ?, ?)",
            [nome, telefone, celular, email, area]
        );

        const docente_id = docenteResult.insertId; // Pegar ID do docente inserido

        // 🔹 2. Criar usuário associado
        const senhaHash = await bcrypt.hash(senha, 10); // Hash na senha
        await conn.execute(
            "INSERT INTO usuarios (usuario, senha, nivel_acesso, docente_id_fk) VALUES (?, ?, ?, ?)",
            [email, senhaHash, "professor", docente_id]
        );

        await conn.commit(); // Confirma transação
        conn.release(); // Libera conexão

        res.status(201).json({ message: "Docente e usuário cadastrados com sucesso!", docente_id });

    } catch (error) {
        console.error("Erro ao cadastrar docente:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
//Inserir turmas
app.post ('/turmas', (req,res)=>{
    const turma=req.body;
    db.query('INSERT INTO turmas SET ?', turma,(err,results)=>{
        if (err) {
            console.error('Erro ao inserir turma:', err);
                return res.status(500).json({ error: 'Erro ao inserir turma' });
            }
        res.json({id: results.insertId,...turma});
    });
    });