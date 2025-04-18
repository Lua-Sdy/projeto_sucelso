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
        const filtro = document.getElementById("nomePesquisa").value;

        if (!filtro) {
            return alert('Preencha o ID ou Nome!');
        }

        fetch(`http://localhost:3000/coordenadores/${filtro}`)
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
            .catch(error => {
                alert(error.message);
            });
    });
}


const btnPesquisarDocente = document.getElementById("pesquisarDocente");

if (btnPesquisarDocente) {
    btnPesquisarDocente.addEventListener("click", () => {
        const filtro = document.getElementById("nomePesquisaDocente").value;

        if (!filtro) {
            return alert('Preencha o nome ou ID!');
        }

        fetch(`http://localhost:3000/docentes/${filtro}`)
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
            .catch(error => {
                alert(error.message);
            })
    });
}

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
const btnPesquisarTurma = document.getElementById("pesquisarTurma");

if (btnPesquisarTurma) {
    btnPesquisarTurma.addEventListener("click", () => {
        const filtro = document.getElementById("pesquisaTurma").value;

        if (!filtro) {
            return alert('Preencha o nome ou ID da turma!');
        }

        fetch(`http://localhost:3000/turmas/${filtro}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Turma não encontrada");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("turma_nome").value = data.nome_turma;
                document.getElementById("inputId").value = data.turma_id;
                document.getElementById("curso").value = data.curso;
                document.getElementById("periodo").value = data.periodo;
            })
            .catch(error => {
                alert(error.message);
            });
    });
}
const btnExcluirTurma = document.getElementById("excluirTurma");

if (btnExcluirTurma) {
    btnExcluirTurma.addEventListener("click", () => {
        const id = document.getElementById("pesquisaTurma").value;

        if (!id) {
            return alert("Por favor, informe o ID da turma para excluir.");
        }

        if (confirm("Tem certeza que deseja excluir essa Turma?")) {
            fetch(`http://localhost:3000/turmas/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir a turma.");
                }
                return response.json();
            })
            .then(data => {
                alert(data.mensagem);
                document.getElementById("turma_nome").value = "";
                document.getElementById("inputId").value = "";
                document.getElementById("curso").value = "";
                document.getElementById("periodo").value = "";
                document.getElementById("pesquisaTurma").value = "";
            })
            .catch(error => {
                alert(error.message);
            });
        }
    });
}
const btnEditarTurma = document.querySelector('#editarTurma');

if (btnEditarTurma) {
    btnEditarTurma.addEventListener('click', () => {
        console.log('Botão "Editar Turma" clicado!');

        // Tornando os campos da turma editáveis
        document.querySelector('#turma_nome').readOnly = false;
        document.querySelector('#curso').readOnly = false;
        document.querySelector('#periodo').readOnly = false;
    });
}
const btnSalvarTurma = document.querySelector('#salvarTurma');

if (btnSalvarTurma) {
    btnSalvarTurma.addEventListener('click', async () => {
        const turma_id = document.getElementById("inputId").value;
        const nome_turma = document.getElementById("turma_nome").value;
        const curso = document.getElementById("curso").value;
        const periodo = document.getElementById("periodo").value;

        const dadosAtualizados = {
            turma_id,
            nome_turma,
            curso,
            periodo
        };

        console.log("Dados enviados para atualização da turma:", dadosAtualizados);

        try {
            const response = await fetch("http://localhost:3000/update-turmas", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAtualizados)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                console.log("Turma atualizada com sucesso.");
            } else {
                alert("Erro ao atualizar turma: " + data.message);
                console.warn("Erro na resposta HTTP:", response.status);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
}
    const buscarHorarios = document.querySelector('#pesquisar');

if (buscarHorarios) {
    buscarHorarios.addEventListener('click', async () => {
    const id = document.getElementById('inputBuscaHorarios').value;

    if (!id) {
        alert('Digite um ID para buscar!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/horarios_docentes/buscar/${id}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar horários');
        }

        const dados = await response.json();

        preencherTabela(dados);

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar horários');
    }
})}

function preencherTabela(dados) {
    const tbody = document.querySelector('#tabela-horarios tbody');

    tbody.innerHTML = ''; // Limpa a tabela

    if (dados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Nenhum horário encontrado.</td></tr>';
        return;
    }

    dados.forEach(horario => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${horario.hora_doc_id}</td>
            <td>${horario.dia_semana}</td>
            <td>${horario.hora_inicio}</td>
            <td>${horario.hora_fim}</td>
            <td>${horario.turma_id_fk}</td>
            <td>${horario.docente_id_fk}</td>
            <td class="acoes-cell">
                <button class="btn-acao btn-editar" onclick="habilitarEdicao(this)">Editar</button>
                <button class="btn-acao btn-excluir" onclick="excluirLinha(this)">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

async function excluirLinha(botao) {
    if (!confirm('Tem certeza que deseja excluir este horário?')) {
        return; // Usuário cancelou
    }

    const linha = botao.closest('tr'); // Pega a linha da tabela
    const horaDocId = linha.querySelector('td').textContent; // Pega o ID (está na primeira coluna)

    try {
        const response = await fetch(`http://localhost:3000/horarios_docentes/${horaDocId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir horário');
        }

        alert('Horário excluído com sucesso!');
        linha.remove(); // Remove a linha da tabela

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir horário');
    }
}

function habilitarEdicao(botao) {
    const linha = botao.closest('tr');
    const colunasEditaveis = [1, 2, 3]; // Dia da semana, Hora início, Hora fim

    colunasEditaveis.forEach(index => {
        linha.cells[index].setAttribute('contenteditable', 'true');
    });

    linha.classList.add('editando');
}

function salvarAlteracoesHorarios() {
    const linhas = document.querySelectorAll('#tabela-horarios tbody tr.editando');

    linhas.forEach(linha => {
        const hora_doc_id = linha.cells[0].innerText;
        const dia_semana = linha.cells[1].innerText;
        const hora_inicio = linha.cells[2].innerText;
        const hora_fim = linha.cells[3].innerText;

        fetch('http://localhost:3000/update-horarios_docentes', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hora_doc_id,
                dia_semana,
                hora_inicio,
                hora_fim
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            alert(data.message);
            linha.classList.remove('editando');
            linha.querySelectorAll('[contenteditable=true]').forEach(cell => {
                cell.setAttribute('contenteditable', 'false');
            });
        })
        .catch(error => {
            console.error('Erro ao salvar horário:', error);
        });
    });
}


document.getElementById("gerarPdf").addEventListener("click", () => {
    const lista = document.getElementById("visualizacao-lista");
    const semanal = document.getElementById("visualizacao-semanal");

    let elementoParaPDF;

    // Verifica qual tabela está visível
    if (lista.style.display !== "none") {
        elementoParaPDF = lista;
    } else if (semanal.style.display !== "none") {
        elementoParaPDF = semanal;
    } else {
        alert("Nenhuma tabela está visível para gerar o PDF.");
        return;
    }

    // Captura a tabela com html2canvas
    html2canvas(elementoParaPDF).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('horarios.pdf');
    });
});
