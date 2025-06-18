let chamado;

const campoCriadoEm = document.getElementById("campoCriadoEm");
const campoAtualizadoEm = document.getElementById("campoAtualizadoEm");
const campoStatus = document.getElementById("campoStatus");
const campoSolicitante = document.getElementById("campoSolicitante");
const campoTipo = document.getElementById("campoTipo");
const campoSistema = document.getElementById("campoSistema");
const campoPrioridade = document.getElementById("campoPrioridade");
const campoAtendente = document.getElementById("campoAtendente");
const campoTitulo = document.getElementById("campoTitulo");
const campoDescricao = document.getElementById("campoDescricao");

const atendentes = getListaLocalStorage("colaboradores").filter(c => c.tipo === "Atendente");

function popularCampos() {
    popularCampo(campoTipo, tiposDeProblema);
    popularCampo(campoSistema, sistemas);
    popularCampo(campoPrioridade, prioridades);
    popularCampo(campoAtendente, atendentes.map(a => a.nome));
}

function preencherCampos() {
    campoCriadoEm.innerText = formatarData(chamado.criadoEm);
    campoAtualizadoEm.innerText = formatarData(chamado.atualizadoEm);
    campoStatus.innerText = chamado.status;
    campoSolicitante.innerText = chamado.solicitante;
    campoTipo.value = chamado.tipoDeProblema;
    campoSistema.value = chamado.sistema ?? "";
    campoPrioridade.value = chamado.prioridade ?? "";
    campoAtendente.value = chamado.atendente ?? "";
    campoTitulo.innerText = chamado.titulo;
    campoDescricao.innerText = chamado.descricao;
}

function init() {
    const id = parseInt(new URLSearchParams(location.search).get("id"));

    if (!id) {
        location.href = "/pages/chamados/listagem.html";
    }

    chamado = getListaLocalStorage("chamados").find(c => c.id === id);

    if (!chamado) {
        location.href = "/pages/chamados/listagem.html";
    }
}

function atualizarAtendente() {
    const atendenteSelecionado = campoAtendente.value;
    const chamados = getListaLocalStorage("chamados");
    chamados.at(chamado.id-1).atendente = atendenteSelecionado;
    setListaLocalStorage("chamados", chamados);
    alert("Atendente atualizado com sucesso!");
}

function atualizarPrioridade() {
    const prioridadeSelecionada = campoPrioridade.value;
    const chamados = getListaLocalStorage("chamados");
    chamados.at(chamado.id-1).prioridade = prioridadeSelecionada;
    setListaLocalStorage("chamados", chamados);
    alert("Prioridade atualizada com sucesso!");
}

function concluir() {
    const chamados = getListaLocalStorage("chamados");
    chamados.find(c => c.id === chamado.id).status = "Concluído";
    setListaLocalStorage("chamados", chamados);
    alert("Chamado concluido!");
    campoStatus.innerText = "Concluído"
}

function cancelar() {
    const chamados = getListaLocalStorage("chamados");
    chamados.find(c => c.id === chamado.id).status = "Cancelado";
    setListaLocalStorage("chamados", chamados);
    alert("Chamado cancelado!");
    campoStatus.innerText = "Cancelado"
}

init();
popularCampos();
preencherCampos();