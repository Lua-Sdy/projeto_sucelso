const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

app.get('/coordenadores/:filtro', (req, res) => {
    const filtro = req.params.filtro;

    const query = isNaN(filtro) 
        ? 'SELECT * FROM coordenadores WHERE nome_coordenador LIKE ?' 
        : 'SELECT * FROM coordenadores WHERE coordenador_id = ?';

    const parametros = isNaN(filtro) ? [`%${filtro}%`] : [filtro];

    db.query(query, parametros, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).json({ mensagem: "Coordenador não encontrado" });
        }

        res.json(results[0]); 
    });
});

app.get('/docentes/:filtro', (req, res) => {
    const filtro = req.params.filtro;

    const query = isNaN(filtro) 
        ? 'SELECT * FROM docentes WHERE nome_docente LIKE ?' 
        : 'SELECT * FROM docentes WHERE docente_id = ?';

    const parametros = isNaN(filtro) ? [`%${filtro}%`] : [filtro];

    db.query(query, parametros, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).json({ mensagem: "Docente não encontrado" });
        }

        res.json(results[0]); // pega o primeiro que achar
    });
});


app.delete('/coordenadores/:coordenador_id', (req, res) => {
    const coordenador_id = req.params.coordenador_id;
    db.query('DELETE FROM coordenadores WHERE coordenador_id = ?', coordenador_id, (err) => {
        if (err) throw err;
        res.json({ mensagem: 'coordenador excluído com sucelso!' });
    });
});

app.delete('/docentes/:docente_id', (req, res) => {
    const docente_id = req.params.docente_id;
    db.query('DELETE FROM docentes WHERE docente_id = ?', docente_id, (err) => {
        if (err) throw err;
        res.json({ mensagem: 'docente excluído com sucelso!' });
    });
});

app.put('/update-coordenadores', (req, res) => {
    console.log(" Dados recebidos:", req.body);

    const { coordenador_id, nome_coordenador, codigo, email_coordenador, telefone_coordenador } = req.body;

    if (!coordenador_id) {
        console.error(" ID do coordenador não fornecido.");
        return res.status(400).json({ status: 400, message: 'ID do coordenador é necessário' });
    }

    const query = `
        UPDATE coordenadores 
        SET nome_coordenador = ?, telefone_coordenador = ?, email_coordenador = ?, codigo = ?
        WHERE coordenador_id = ?
    `;

    db.query(query, [nome_coordenador, telefone_coordenador, email_coordenador, codigo, coordenador_id], (err, result) => {
        if (err) {
            console.error(" Erro ao atualizar coordenador:", err);
            return res.status(500).json({ status: 500, message: 'Erro ao atualizar coordenador' });
        }

        if (result.affectedRows > 0) {
            console.log(" Coordenador atualizado com sucesso.");
            return res.status(200).json({ status: 200, message: 'Coordenador atualizado com sucesso' });
        } else {
            console.warn(" Coordenador não encontrado.");
            return res.status(404).json({ status: 404, message: 'Coordenador não encontrado' });
        }
    });
});

app.put("/update-docentes", (req, res) => {
    console.log(" Dados recebidos para atualização de docente:", req.body);

    const { docente_id, nome_docente, telefone_docente, email_docente, area_docente } = req.body;

    if (!docente_id) {
        console.error(" ID do docente não fornecido.");
        return res.status(400).json({ status: 400, message: 'ID do docente é necessário' });
    }

    const query = `
        UPDATE docentes 
        SET nome_docente = ?, telefone_docente = ?, email_docente = ?, area = ?
        WHERE docente_id = ?
    `;

    db.query(query, [nome_docente, telefone_docente, email_docente, area_docente, docente_id], (err, result) => {
        if (err) {
            console.error(" Erro ao atualizar docente:", err);
            return res.status(500).json({ status: 500, message: 'Erro ao atualizar docente' });
        }

        if (result.affectedRows > 0) {
            console.log(" Docente atualizado com sucesso.");
            return res.status(200).json({ status: 200, message: 'Docente atualizado com sucesso' });
        } else {
            console.warn(" Docente não encontrado.");
            return res.status(404).json({ status: 404, message: 'Docente não encontrado' });
        }
    });
});
app.get('/turmas/:filtro', (req, res) => {
    const filtro = req.params.filtro;

    const query = isNaN(filtro)
        ? 'SELECT * FROM turmas WHERE nome_turma LIKE ?'
        : 'SELECT * FROM turmas WHERE turma_id = ?';

    const parametros = isNaN(filtro) ? [`%${filtro}%`] : [filtro];

    db.query(query, parametros, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: "Erro ao buscar turma" });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensagem: "Turma não encontrada" });
        }

        res.json(results[0]); // retorna a primeira turma encontrada
    });
});
app.put("/update-turmas", (req, res) => {
    console.log("Dados recebidos para atualização de turma:", req.body);

    const { turma_id, nome_turma, curso, periodo } = req.body;

    if (!turma_id) {
        console.error("ID da turma não fornecido.");
        return res.status(400).json({ status: 400, message: 'ID da turma é necessário' });
    }

    const query = `
        UPDATE turmas 
        SET nome_turma = ?, curso = ?, periodo = ?
        WHERE turma_id = ?
    `;

    db.query(query, [nome_turma, curso, periodo, turma_id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar turma:", err);
            return res.status(500).json({ status: 500, message: 'Erro ao atualizar turma' });
        }

        if (result.affectedRows > 0) {
            console.log("Turma atualizada com sucesso.");
            return res.status(200).json({ status: 200, message: 'Turma atualizada com sucesso' });
        } else {
            console.warn("Turma não encontrada.");
            return res.status(404).json({ status: 404, message: 'Turma não encontrada' });
        }
    });
});
app.delete('/turmas/:turma_id', (req, res) => {
    const turma_id = req.params.turma_id;
    db.query('DELETE FROM turmas WHERE turma_id = ?', turma_id, (err) => {
        if (err) throw err;
        res.json({ mensagem: 'Turma excluída com sucelso!' });
    });
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, '../html')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

