// Botão Voltar
document.querySelector('#botao-voltar')?.addEventListener('click', () => {
    window.location.href = 'principal.html';
});

function cadastrarDocentes(event) {

    event.preventDefault(); // Impede o recarregamento da página

    fetch('http://localhost:3000/docentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_docente: document.querySelector('#usuario').value,
            email_docente: document.querySelector('#email').value,
            area: document.querySelector('#area').value,
            telefone_docente: document.querySelector('#telefone').value
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

function cadastrarUsuario() {

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario: document.querySelector('#login_docente').value,
            senha: document.querySelector('#senha').value,
            nivel_acesso: "professor",
            docente_id_fk: document.querySelector('#docente_id')?.value || null,
            coordenador_id_fk: document.querySelector('#coordenador_id')?.value || null
        })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
    })
    .catch(err => console.error('Erro no cadastro:', err));
}

