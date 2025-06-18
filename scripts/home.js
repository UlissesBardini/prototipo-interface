const DIA = 24 * 60 * 60 * 1000;

const chamados = getChamados();
let chamadosFiltrados = [];

const filas = [
    { nome: "Abertos", quantidade: 0 },
    { nome: "Para mim", quantidade: 0 },
    { nome: "Para outros", quantidade: 0 },
    { nome: "Sem Atendente", quantidade: 0 },
    { nome: "Em Breve", quantidade: 0 },
    { nome: "Atrasados", quantidade: 0 }
];

let filaSelecionada = "";

const filtroFila = {
    "Abertos": (chamado) => true,
    "Para mim": (chamado) => chamado.atendente === MEU_NOME,
    "Para outros": (chamado) => chamado.atendente !== MEU_NOME,
    "Sem Atendente": (chamado) => !chamado.atendente,
    "Em Breve": (chamado) => !isChamadoAtrasado(chamado),
    "Atrasados": (chamado) => isChamadoAtrasado(chamado)
};

function isChamadoAtrasado(chamado) {
    return Math.ceil(Math.abs((new Date() - new Date(chamado.criadoEm)) / DIA)) > 10;
}

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

function getChamados() {
    return getListaLocalStorage("chamados")
        .filter(chamado => !["Concluído", "Cancelado"].includes(chamado.status))
        .sort((c1,c2) => -(c1.atualizadoEm.localeCompare(c2.atualizadoEm)));
}

function renderFilas() {
    filasContainer.innerHTML = "";
    for (const fila of filas) {
        const filaButton = document.createElement("button");
        filaButton.className = "fila";
        filaButton.id = `fila-${fila.nome}`
        filaButton.textContent = `${fila.nome} (${fila.quantidade})`;
        filaButton.addEventListener("click", () => selecionarFila(fila.nome));
        filasContainer.append(filaButton);
    }
}

function renderChamados() {
    listaChamados.innerHTML = "";
    if (!chamadosFiltrados.length) {
        listaChamados.innerHTML = `<tr><td class="text-center" colspan="6">Nenhum chamado</td></tr>`    
    }

    for (const chamado of chamadosFiltrados) {
        listaChamados.innerHTML += `<tr>
            <td class="text-center"><a href="/pages/chamados/visualizar.html?id=${chamado.id}">${chamado.id}</a></td>
            <td class="text-center">${formatarData(chamado.atualizadoEm)}</td>
            <td>${chamado.atendente ?? "--"}</td>
            <td>${chamado.titulo}</td>
            <td>${chamado.status}</td>
            <td>${chamado.prioridade
                    ? `<div class="prioridade ${prioridadeClass[chamado.prioridade]}"></div> ${chamado.prioridade}`
                    : "--"
                }
            </td>
        </tr>`;
    }
}

function selecionarFila(fila) {
    if (fila !== filaSelecionada) {
        document.getElementById(`fila-${filaSelecionada}`)?.classList.remove("selecionada");
        document.getElementById(`fila-${fila}`).classList.add("selecionada");
        filaSelecionada = fila;
        chamadosFiltrados = chamados.filter(filtroFila[fila]);
        renderChamados();
    }
}

computarFilas();
renderFilas();
selecionarFila("Abertos");