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