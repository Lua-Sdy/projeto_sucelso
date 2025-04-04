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


