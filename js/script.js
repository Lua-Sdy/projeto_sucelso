//botão voltar da pagina de cadastro
const botaoVoltar = document.querySelector('.botao-voltar');
botaoVoltar.addEventListener('click', () => {
    window.location.href = 'principal.html';
});
//botãa de castros docente da pagina principal
const botaoCadastroDocente = document.querySelector('cdtdocente');
botaoCadastroDocente.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});