// Botão Voltar
document.querySelector('#botao-voltar')?.addEventListener('click', () => {
    window.location.href = 'principal.html';
});

// Captura do formulário para evitar recarregamento da página
document.querySelector('#formCadastro')?.addEventListener('submit', cadastrarDocentes);

function cadastrarDocentes(event) {
    event.preventDefault();

    const nome = document.querySelector('#usuario').value.trim();
    const email = document.querySelector('#email').value.trim();
    const area = document.querySelector('#area').value.trim();
    const telefone = document.querySelector('#telefone').value.trim();


    fetch('http://localhost:3000/docentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_docente: nome,
            email_docente: email,
            area: area,
            telefone_docente: telefone
        })
    })
        .then(resp => resp.json())
        .then(data => {
            alert('Docente cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            document.querySelector('#formCadastro').reset();
        })
        .catch(err => console.error('Erro no cadastro:', err));
}

document.querySelector('#formCadastroHorario')?.addEventListener('submit', cadastrarHorario);

function cadastrarHorario(event) {
    event.preventDefault();

    const Dsemana = document.querySelector('#dia_semana').value.trim();
    const Hinicio = document.querySelector('#hora_inicio').value.trim();
    const Hfinal = document.querySelector('#hora_final').value.trim();
    const doscenteId = document.querySelector('#docente_id').value.trim();
    const turmaId = document.querySelector('#turma_id').value.trim();

    fetch('http://localhost:3000/horarios_docentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dia_semana: Dsemana,
            hora_inicio: Hinicio,
            hora_fim: Hfinal,
            docente_id_fk: doscenteId,
            turma_id_fk: turmaId

        })
    })
        .then(resp => resp.json())
        .then(data => {
            alert('Horario cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            document.querySelector('#formCadastroHorario').reset();
        })
        .catch(err => console.error('Erro no cadastro:', err));
}

// Captura do formulário para evitar recarregamento da página
document.querySelector('#formCadastroCoordenador')?.addEventListener('submit', cadastrarCoordenador);

function cadastrarCoordenador(event) {
    event.preventDefault();

    const nome = document.querySelector('#nome_coordenador').value.trim();
    const email = document.querySelector('#email_coordenador').value.trim();
    const telefone = document.querySelector('#telefone_coordenador').value.trim();
    const codigo = document.querySelector('#codigo').value.trim(); // Código presente na tabela

    fetch('http://localhost:3000/coordenadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_coordenador: nome,
            email_coordenador: email,
            telefone_coordenador: telefone,
            codigo: codigo
        })
    })
        .then(resp => resp.json())
        .then(data => {
            alert('Coordenador cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
            document.querySelector('#formCadastroCoordenador').reset();
        })
        .catch(err => console.error('Erro no cadastro:', err));
}

// Captura do formulário de turma
document.querySelector('#formCadastroTurma')?.addEventListener('submit', cadastrarTurma);

function cadastrarTurma(event) {
    event.preventDefault();

    const nome_turma = document.querySelector('#nome_turma').value.trim();
    const curso = document.querySelector('#curso').value.trim();
    const periodo = document.querySelector('#periodo').value.trim();

    fetch('http://localhost:3000/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_turma: nome_turma,
            curso: curso,
            periodo: periodo
        })
    })
        .then(resp => resp.json())
        .then(data => {
            alert('Turma cadastrada com sucesso!');
            console.log('Resposta do servidor (turma):', data);
            document.querySelector('#formCadastroTurma').reset();
        })
        .catch(err => {
            console.error('Erro no cadastro da turma:', err);
            alert('Erro ao cadastrar a turma. Verifique o console.');
        });
}

document.querySelector('#formCadastroUsuario')?.addEventListener('submit', cadastrarUsuario);

function cadastrarUsuario(event) {
    event.preventDefault();

    const nomeUsuario = document.querySelector('#usuario').value.trim();
    const senha = document.querySelector('#senha').value.trim();
    const comfirmarSenha = document.querySelector('#confirmar_senha').value.trim();
    const nivelAcesso = document.querySelector('#nivel_acesso').value.trim();
    const doscenteId = document.querySelector('#docente_id').value.trim();
    const cordenadorId = document.querySelector('#coordenador_id').value.trim();

    if (senha === comfirmarSenha) {
        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: nomeUsuario,
                senha: senha,
                nivel_acesso: nivelAcesso,
                docente_id_fk: doscenteId,
                coordenador_id_fk: cordenadorId

            })
        })
            .then(resp => resp.json())
            .then(data => {
                alert('usuarios cadastrado com sucesso!');
                console.log('Resposta do servidor:', data);
                document.querySelector('#formCadastroUsuario').reset();
            })
            .catch(err => console.error('Erro no cadastro:', err));
    } else {
        alert('SSENHAS DIFERENTES!!');
    }
}

document.getElementById('botao-login').addEventListener('click', loginUsuario);

async function loginUsuario(event) {
    event.preventDefault();

    const usuario = document.getElementById('login-user').value.trim();
    const senha = document.getElementById('password-user').value.trim();

    if (!usuario || !senha) {
        return alert('Preencha todos os campos!');
    }

    try {
        const resposta = await fetch(`http://localhost:3000/login?usuario=${usuario}&senha=${senha}`);

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        const { status } = await resposta.json();

        if (status === 'ok') {
            window.location.href = "./incio.html";
        } else {
            alert('Usuário ou senha incorretos!');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login');
    }
}

//Mostra campos de docente ou coordenador
function mostrarCampos() {
    // Pega o VALOR selecionado
    var selecao = document.getElementById('nivel_acesso').value;

    // Esconder os campos
    document.getElementById('campo-docente').style.display = 'none';
    document.getElementById('campo-coordenador').style.display = 'none';

    // Mostrar o campo correto
    if(selecao === "docente"){
        document.getElementById('campo-docente').style.display = 'block';
    } else if(selecao === "coordenador"){
        document.getElementById('campo-coordenador').style.display = 'block';
    }
}