
function adicionarLinha(tabelaId) {
    const tabela = document.querySelector(`#${tabelaId} tbody`);
    const novaLinha = document.createElement('tr');
    const novoId = tabela.rows.length + 1;
    
    if (tabelaId === 'tabela-registros') {
        novaLinha.innerHTML = `
            <td>${novoId}</td>
            <td contenteditable="true" class="editando">Novo Nome</td>
            <td contenteditable="true" class="editando">Nova Turma</td>
            <td contenteditable="true" class="editando">${new Date().toISOString().split('T')[0]}</td>
            <td class="acoes-cell">
                <button class="btn-acao btn-salvar" onclick="desabilitarEdicao(this)">Salvar</button>
                <button class="btn-acao btn-excluir" onclick="excluirLinha(this)">Excluir</button>
            </td>
        `;
    } else if (tabelaId === 'tabela-horarios') {
        novaLinha.innerHTML = `
            <td>${novoId}</td>
            <td contenteditable="true" class="editando">Segunda-feira</td>
            <td contenteditable="true" class="editando">08:00 - 10:00</td>
            <td contenteditable="true" class="editando">Turma A</td>
            <td contenteditable="true" class="editando">Nova Atividade</td>
            <td contenteditable="true" class="editando">Novo Professor</td>
            <td class="acoes-cell">
                <button class="btn-acao btn-salvar" onclick="desabilitarEdicao(this)">Salvar</button>
                <button class="btn-acao btn-excluir" onclick="excluirLinha(this)">Excluir</button>
            </td>
        `;
    }
    
    tabela.appendChild(novaLinha);
    
    // Configurar os botões corretamente
    const btnSalvar = novaLinha.querySelector('.btn-salvar');
    btnSalvar.onclick = function() { 
        desabilitarEdicao(this); 
        // Transformar em botão Editar após salvar
        this.textContent = 'Editar';
        this.className = 'btn-acao btn-editar';
        this.onclick = function() { habilitarEdicao(this); };
        
        // Se estivermos na visualização semanal, atualizamos
        if (visualizacaoAtual === 'semanal') {
            filtrarHorarios('semanal');
        }
    };
    
    const btnExcluir = novaLinha.querySelector('.btn-excluir');
    btnExcluir.onclick = function() { excluirLinha(this); };
}

function salvarAlteracoes() {
    alert('Alterações nos registros salvas com sucesso!');
    // Código para enviar as alterações para o servidor
}

// Funções para a tabela de horários
function filtrarHorarios(tipo) {
    // Atualiza a visualização atual
    visualizacaoAtual = tipo;
    
    // Atualiza os botões de filtro
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
    
    if (tipo === 'diario') {
        // Mostra a visualização em lista
        document.getElementById('visualizacao-lista').style.display = 'block';
        document.getElementById('visualizacao-semanal').style.display = 'none';
    } else if (tipo === 'semanal') {
        // Mostra a visualização semanal
        document.getElementById('visualizacao-lista').style.display = 'none';
        document.getElementById('visualizacao-semanal').style.display = 'block';
        
        // Gera a tabela semanal
        gerarVisualizacaoSemanal();
    }
}

function gerarVisualizacaoSemanal() {
    const corpoSemanal = document.getElementById('corpo-semanal');
    corpoSemanal.innerHTML = '';
    
    // Obter todos os horários distintos
    const horarios = [];
    const linhas = document.querySelectorAll('#tabela-horarios tbody tr');
    
    linhas.forEach(linha => {
        const horario = linha.cells[2].textContent;
        if (!horarios.includes(horario)) {
            horarios.push(horario);
        }
    });
    
    // Ordenar horários
    horarios.sort((a, b) => {
        const horaA = parseInt(a.split(':')[0]);
        const horaB = parseInt(b.split(':')[0]);
        return horaA - horaB;
    });
    
    // Criar uma linha para cada horário
    horarios.forEach(horario => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `<td class="horario-semanal">${horario}</td>
                              <td></td><td></td><td></td><td></td><td></td>`;
        
        // Preencher com os dados de cada dia
        const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
        
        dias.forEach((dia, index) => {
            // Encontrar atividades para este dia e horário
            const atividades = [];
            
            linhas.forEach(linha => {
                if (linha.cells[1].textContent === dia && linha.cells[2].textContent === horario) {
                    atividades.push({
                        turma: linha.cells[3].textContent,
                        atividade: linha.cells[4].textContent,
                        professor: linha.cells[5].textContent,
                        id: linha.cells[0].textContent
                    });
                }
            });
            
            // Preencher a célula
            const celula = novaLinha.cells[index + 1];
            
            if (atividades.length > 0) {
                let conteudo = '';
                atividades.forEach(atv => {
                    conteudo += `
                        <div class="atividade-semanal">
                            <strong>${atv.atividade}</strong><br>
                            ${atv.professor}<br>
                            <span class="info-turma">Turma: ${atv.turma}</span><br>
                            <small>ID: ${atv.id}</small>
                        </div>
                    `;
                });
                celula.innerHTML = conteudo;
            }
        });
        
        corpoSemanal.appendChild(novaLinha);
    });
}
function aplicarFiltroData() {
    const dataSelecionada = document.getElementById('data-filtro').value;
    alert(`Filtrando pela data: ${dataSelecionada}`);
    // Implementar lógica de filtro por data
}

function salvarAlteracoesHorarios() {
    alert('Alterações nos horários salvas com sucesso!');
    // Código para enviar as alterações para o servidor
}

// Inicializa com a visualização em lista
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-filtro').classList.add('ativo');
});