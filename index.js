const MEU_NOME = "Ulisses"

const chamados = [
    {
        id: 1,
        atualizadoEm: '2025-04-30T00:00:00',
        atendente: 'Henrique',
        topico: 'Notebook superaquecendo',
        status: 'Novo',
        prioridade: 'Crítica'
    },
    {
        id: 2,
        atualizadoEm: '2025-04-30T00:00:00',
        atendente: 'Ulisses',
        topico: 'Monitor não dá vídeo',
        status: 'Esperando resposta',
        prioridade: 'Alta'
    },
    {
        id: 3,
        atualizadoEm: '2025-04-30T00:00:00',
        atendente: 'Mateus',
        topico: 'Impressora sem tinta',
        status: 'Respondido',
        prioridade: 'Média'
    },
    {
        id: 4,
        atualizadoEm: '2025-04-30T00:00:00',
        atendente: 'Augusto',
        topico: 'Celular não conecta no Wi-fi',
        status: 'Esperando resposta',
        prioridade: 'Baixa'
    }
];

let chamadosFiltrados = [...chamados];

const filas = [
    { nome: "Abertos", quantidade: 0, selecionada: true },
    { nome: "Para mim", quantidade: 0, selecionada: false },
    { nome: "Para outros", quantidade: 0, selecionada: false },
    { nome: "Sem Atendente", quantidade: 0, selecionada: false },
    { nome: "Em Breve", quantidade: 0, selecionada: false },
    { nome: "Atrasados", quantidade: 0, selecionada: false }
];

const filtroFila = {
    "Abertos": (chamado) => true,
    "Para mim": (chamado) => chamado.atendente === MEU_NOME,
    "Para outros": (chamado) => chamado.atendente !== MEU_NOME,
    "Sem Atendente": (chamado) => !chamado.atendente,
    "Em Breve": (chamado) => true,
    "Atrasados": (chamado) => false,
};

function computarFilas() {
    for (const fila of filas) {
        fila.quantidade = chamados.filter(filtroFila[fila.nome]).length;
    }
}

const prioridadeClass = {
    "Crítica": "critica",
    "Alta": "alta",
    "Média": "media",
    "Baixa": "baixa"
};

const listaChamados = document.getElementById("lista-chamados");
const filasContainer = document.getElementById("filas-container");
const checkTodos = document.getElementById("check-todos");

function renderFilas() {
    computarFilas();
    filasContainer.innerHTML = "";
    for (const fila of filas) {
        filasContainer.innerHTML += `<button class="fila${fila.selecionada ? " selecionada" : ""}" onClick="selecionarFila('${fila.nome}')">${fila.nome} (${fila.quantidade})</button>`
    }
}

function renderChamados() {
    listaChamados.innerHTML = "";
    if (!chamadosFiltrados.length) {
        listaChamados.innerHTML = `<tr><td class="text-center" colspan="6">Nenhum chamado</td></tr>`    
    }

    for (const chamado of chamadosFiltrados) {
        listaChamados.innerHTML += `<tr>
            <td><input type="checkbox" id="check-${chamado.id}"> ${chamado.id}</td>
            <td class="text-center">${formatarData(chamado.atualizadoEm)}</td>
            <td>${chamado.atendente}</td>
            <td>${chamado.topico}</td>
            <td>${chamado.status}</td>
            <td><div class="prioridade ${prioridadeClass[chamado.prioridade]}"></div> ${chamado.prioridade}</td>
        </tr>`;
    }
}

function formatarData(dataStr) {
    return new Date(dataStr).toLocaleString('fr-FR');
}

function selecionarFila(nomeFila) {
    filas.forEach(f => f.selecionada = false);
    const filaSelecionada = filas.find(fila => fila.nome === nomeFila);
    filaSelecionada.selecionada = true;
    renderFilas();
    chamadosFiltrados = chamados.filter(filtroFila[filaSelecionada.nome]);
    renderChamados();
}

function selecionarTodos() {
    document.querySelectorAll("[id^=check-]").forEach(el => el.checked = checkTodos.checked);
}

renderFilas();
renderChamados();