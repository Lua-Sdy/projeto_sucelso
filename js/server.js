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

    if (!docentes.nome_docente || !docentes.telefone_docente || !docentes.email_docente || !docentes.area) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    db.query('INSERT INTO docentes SET ?', docentes, (err, results) => {
        if (err) {
            console.error('Erro ao inserir docente:', err);
            return res.status(500).json({ error: 'Erro ao inserir docente' });
        }
        res.json({ id: results.insertId, ...docentes });
    });
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, '../html')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

