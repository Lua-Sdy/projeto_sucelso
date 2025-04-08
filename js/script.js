// Botão Voltar
document.querySelector('#botao-voltar')?.addEventListener('click', () => {
    window.location.href = 'inicio.html';
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
        alert('SENHAS DIFERENTES!!');
    }
}

const botaoLogin = document.getElementById('botao-login');

if (botaoLogin) {
    botaoLogin.addEventListener('click', loginUsuario);
}

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

const btnPesquisar = document.getElementById("pesquisar");

if (btnPesquisar) {
    btnPesquisar.addEventListener("click", () => {
        const id = document.getElementById("nomePesquisa").value;

        if (!id) {
            return alert('Preencha id!');
        }

        fetch(`http://localhost:3000/coordenadores/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Coordenador não encontrado");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("coordernador-nome").value = data.nome_coordenador;
                document.getElementById("codigo-coordenador").value = data.codigo;
                document.getElementById("inputId").value = data.coordenador_id;
                document.getElementById("email-coordernador").value = data.email_coordenador;
                document.getElementById("Telefone-coordernador").value = data.telefone_coordenador;
            })
    });
}


const btnPesquisarDocente = document.getElementById("pesquisarDocente");

if (btnPesquisarDocente) {
    btnPesquisarDocente.addEventListener("click", () => {
    const id = document.getElementById("nomePesquisaDocente").value;

    if (!id) {
        return alert('Preencha id!');
    }

    fetch(`http://localhost:3000/docentes/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Docente não encontrado");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("docente-nome").value = data.nome_docente;
            document.getElementById("area-docente").value = data.area;
            document.getElementById("id-docente").value = data.docente_id;
            document.getElementById("email-docente").value = data.email_docente;
            document.getElementById("Telefone-docente").value = data.telefone_docente;
        })
})};

const bntExcluirCoordenador = document.getElementById("excluirCoordenador");

if (bntExcluirCoordenador) {
    bntExcluirCoordenador.addEventListener("click", () => {
        const id = document.getElementById("nomePesquisa").value;

        if (!id) {
            return alert("Por favor, informe o ID do coordenador para excluir.");
        }

        if (confirm("Tem certeza que deseja excluir esse Coordenador?")) {
            fetch(`http://localhost:3000/coordenadores/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir o coordenador.");
                }
                return response.json();
            })
            .then(data => {
                alert(data.mensagem);
                document.getElementById("coordernador-nome").value = "";
                document.getElementById("codigo-coordenador").value = "";
                document.getElementById("inputId").value = "";
                document.getElementById("email-coordernador").value = "";
                document.getElementById("Telefone-coordernador").value = "";
                document.getElementById("nomePesquisa").value = "";
            })
            .catch(error => {
                alert(error.message);
            });
    }})}

    const bntExcluirDocente = document.getElementById("excluirDocente");

if (bntExcluirDocente) {
    bntExcluirDocente.addEventListener("click", () => {
        const id = document.getElementById("nomePesquisaDocente").value;

        if (!id) {
            return alert("Por favor, informe o ID do docente para excluir.");
        }

        if (confirm("Tem certeza que deseja excluir esse docente?")) {
            fetch(`http://localhost:3000/docentes/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir o docente.");
                }
                return response.json();
            })
            .then(data => {
                alert(data.mensagem);
                document.getElementById("docente-nome").value = "";
                document.getElementById("area-docente").value = "";
                document.getElementById("id-docente").value = "";
                document.getElementById("email-docente").value = "";
                document.getElementById("Telefone-docente").value = "";
                document.getElementById("nomePesquisaDocente").value = "";
            })
            .catch(error => {
                alert(error.message);
            });
    }})}

    
    // Evento para o botão "Editar Docente"
    const btnEditar = document.querySelector('#editarDocente');
    if (btnEditar) {
        btnEditar.addEventListener('click', () => {
            console.log('Botão "Editar Docente" clicado!');
            
            // Tornando os campos editáveis ao clicar no botão "Editar"
            document.querySelector('#docente-nome').readOnly = false;
            document.querySelector('#email-docente').readOnly = false;
            document.querySelector('#Telefone-docente').readOnly = false;
            document.querySelector('#area-docente').readOnly = false;
            
        });
    };

    const btnEditarCordenador = document.querySelector('#editarCoordenador');
    if (btnEditarCordenador) {
        btnEditarCordenador.addEventListener('click', () => {
            console.log('Botão "Editar Coordenador" clicado!');
            
            // Tornando os campos editáveis ao clicar no botão "Editar"
            document.querySelector('#coordernador-nome').readOnly = false;
            document.querySelector('#email-coordernador').readOnly = false;
            document.querySelector('#Telefone-coordernador').readOnly = false;
            document.querySelector('#codigo-coordenador').readOnly = false;
        });
    }

    const btnSalvarDocente = document.querySelector('#salvarDocente');
    if (btnSalvarDocente) {
        btnSalvarDocente.addEventListener('click', async () => {
            const docente_id = document.getElementById("id-docente").value;
            const nome_docente = document.getElementById("docente-nome").value;
            const area = document.getElementById("area-docente").value;
            const email_docente = document.getElementById("email-docente").value;
            const telefone_docente = document.getElementById("Telefone-docente").value;
    
            const dadosAtualizados = {
                docente_id,
                nome_docente,
                area,
                email_docente,
                telefone_docente
            };
    
            console.log("Dados enviados para atualização:", dadosAtualizados);
    
            try {
                const response = await fetch("http://localhost:3000/update-docentes", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosAtualizados)
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message);
                    console.log(" Docente atualizado com sucesso.");
                } else {
                    alert("Erro ao atualizar docente: " + data.message);
                    console.warn(" Erro na resposta HTTP:", response.status);
                }
            } catch (erro) {
                console.error("Erro na requisição:", erro);
                alert("Erro ao conectar com o servidor.");
            }

        }
    )}

    const btnSalvarCordenador = document.querySelector('#salvarCordenador');
    if (btnSalvarCordenador) {
        btnSalvarCordenador.addEventListener('click', async () => {

            const nome_coordenador = document.getElementById("coordernador-nome").value;
            const telefone_coordenador = document.getElementById("Telefone-coordernador").value;
            const coordenador_id = document.getElementById("inputId").value;
            const email_coordenador = document.getElementById("email-coordernador").value;
            const codigo = document.getElementById("codigo-coordenador").value;
    
            const dadosAtualizados = {
                coordenador_id,
                nome_coordenador,
                codigo,
                email_coordenador,
                telefone_coordenador
            };
    
            console.log("Dados enviados para atualização:", dadosAtualizados);
    
            try {
                const response = await fetch("http://localhost:3000/update-coordenadores", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosAtualizados)
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message);
                    console.log(" coordenador atualizado com sucesso.");
                } else {
                    alert("Erro ao atualizar coordenador: " + data.message);
                    console.warn(" Erro na resposta HTTP:", response.status);
                }
            } catch (erro) {
                console.error("Erro na requisição:", erro);
                alert("Erro ao conectar com o servidor.");
            }

        }
    )}
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
