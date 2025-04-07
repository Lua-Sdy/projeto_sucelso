const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Importando path

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mario0705',
    database: 'projeto1'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

// Inserir Docentes
app.post('/docentes', (req, res) => {
    console.log("Dados recebidos no servidor:", req.body);

    const docentes = {
        nome_docente: req.body.nome_docente,
        telefone_docente: req.body.telefone_docente, 
        email_docente: req.body.email_docente,
        area: req.body.area
    };

    db.query('INSERT INTO docentes SET ?', docentes, (err, results) => {
        if (err) {
            console.error('Erro ao inserir docente:', err);
            return res.status(500).json({ error: 'Erro ao inserir docente' });
        }
        res.json({ id: results.insertId, ...docentes });
    });
});


app.post('/horarios_docentes', (req, res) => {
    console.log("Dados recebidos no servidor:", req.body);

    const horario = {
        dia_semana: req.body.dia_semana,
        hora_inicio: req.body.hora_inicio,
        hora_fim: req.body.hora_fim,
        docente_id_fk: req.body.docente_id_fk,
        turma_id_fk: req.body.turma_id_fk
    };

    db.query('INSERT INTO horarios_docentes SET ?', horario, (err, results) => {
        if (err) {
            console.error('Erro ao inserir horario:', err);
            return res.status(500).json({ error: 'Erro ao inserir horario' });
        }
        res.json({ id: results.insertId, ...horario });
    });
});

app.post('/coordenadores', (req, res) => {
    console.log("Dados recebidos no servidor (coordenador):", req.body);

    const coordenador = {
        nome_coordenador: req.body.nome_coordenador,
        telefone_coordenador: req.body.telefone_coordenador, 
        email_coordenador: req.body.email_coordenador,
        codigo: req.body.codigo // Campo presente na tabela
    };

    // Inserção no banco de dados
    db.query('INSERT INTO coordenadores SET ?', coordenador, (err, results) => {
        if (err) {
            console.error('Erro ao inserir coordenador:', err); // 🔍 Vai mostrar o erro exato do banco
            return res.status(500).json({ error: 'Erro ao inserir coordenador' });
        }
        res.json({ id: results.insertId, ...coordenador });
    });
} );

// Inserir Turmas
app.post('/turmas', (req, res) => {
    console.log("Dados recebidos no servidor (turma):", req.body);

    const turma = {
        nome_turma: req.body.nome_turma,
        curso: req.body.curso,
        periodo: req.body.periodo
    };

    
    // Inserção no banco de dados
    db.query('INSERT INTO turmas SET ?', turma, (err, results) => {
        if (err) {
            console.error('Erro ao inserir turma:', err);
            return res.status(500).json({ error: 'Erro ao inserir turma' });
        }
        res.json({ id: results.insertId, ...turma });
    });
});

app.post('/usuarios', (req, res) => {
    console.log("Dados recebidos no servidor:", req.body);

    const usuarios = {
        usuario: req.body.usuario,
        senha: req.body.senha,
        nivel_acesso: req.body.nivel_acesso,
        docente_id_fk: req.body.docente_id_fk,
        coordenador_id_fk: req.body.coordenador_id_fk
    };

    db.query('INSERT INTO usuarios SET ?', usuarios, (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuarios:', err);
            return res.status(500).json({ error: 'Erro ao inserir usuarios' });
        }
        res.json({ id: results.insertId, ...usuarios });
    });
});

app.get('/login', (req, res) => {
    const { usuario, senha } = req.query;

    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND senha = ?';
    db.query(sql, [usuario, senha], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ status: 'erro' });
        }

        if (resultados.length > 0) {
            res.json({ status: 'ok' });
        } else {
            res.json({ status: 'erro' });
        }
    });
});


// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, '../html')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

