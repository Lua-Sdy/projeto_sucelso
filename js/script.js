/*botão voltar da pagina de cadastro
const botaoVoltar = document.querySelector('.botao-voltar');
botaoVoltar.addEventListener('click', () => {
    window.location.href = 'principal.html';
});
botãa de castros docente da pagina principal
//const botaoCadastroDocente = document.querySelector('cdtdocente');
botaoCadastroDocente.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});*/

// Cadastro docentes
function cadastrarDocentes() {
    event.preventDefault();
    fetch('http://localhost:3000/docentes', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nome_coordenador: usuario.value,
            telefone_coordenador: telefone.value,
            celular_coordenador: contato.value,
            email_docente: email.value,
            area: area.value
        })
    }).then(resp => resp.json()).then(() => alert('Cliente cadastrado!'));
}

// Cadastro Cordenador
function cadastrarCordenador() {
    fetch('http://localhost:3000/cordenador', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nome: nome.value,
            contato: contato.value
        })
    }).then(resp => resp.json()).then(() => alert('Cordenador cadastrado!'));
}

// Cadastro Turmas
function cadastrarTurmas() {
    fetch('http://localhost:3000/turmas', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nome: nome.value,
            curso: curso.value,
            periodo: periodo.value
        })
    }).then(resp => resp.json()).then(() => alert('Turmas cadastrado!'));
}