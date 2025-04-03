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
    const docentes = {
        nome_docente: req.body.usuario,
        telefone_docente: req.body.telefone,
        celular_docente: req.body.celular,  
        email_docente: req.body.email,
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

app.post('/usuarios', (req, res) => {
    const usuario = {
        usuario: req.body.usuario,
        senha: req.body.senha,
        nivel_acesso: req.body.nivel_acesso,
        docente_id_fk: req.body.docente_id_fk || null,
        coordenador_id_fk: req.body.coordenador_id_fk || null
    };

    db.query('INSERT INTO usuarios SET ?', usuario, (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ error: 'Erro ao inserir usuário' });
        }
        res.json({ id: results.insertId, ...usuario });
    });
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, '../html')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
