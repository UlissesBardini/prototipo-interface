const listaChamados = document.getElementById("lista-chamados");

const filtroTitulo = document.getElementById("filtroTitulo");
const filtroStatus = document.getElementById("filtroStatus");
const filtroTipo = document.getElementById("filtroTipo");

const campoTitulo = document.getElementById("campoTitulo");
const campoSistema = document.getElementById("campoSistema");
const campoTipo = document.getElementById("campoTipo");
const campoDescricao = document.getElementById("campoDescricao");

let chamadosFiltrados = [];

function popularCampos() {
    if (filtroStatus) popularCampo(filtroStatus, statuses);
    if (campoSistema) popularCampo(campoSistema, sistemas);
    popularCampo(filtroTipo ?? campoTipo, tiposDeProblema);
}

function getChamados() {
    return getListaLocalStorage("chamados")
        .sort((c1,c2) => c2.id - c1.id);
}

function filtrar() {
    const descricao = filtroTitulo.value;
    const status = filtroStatus.value ?? undefined;
    const tipo = filtroTipo.value ?? undefined;

    chamadosFiltrados = getChamados();
    if (descricao.length) chamadosFiltrados = chamadosFiltrados.filter(c => c.titulo.includes(descricao));
    if (status) chamadosFiltrados = chamadosFiltrados.filter(c => c.status === status);
    if (tipo) chamadosFiltrados = chamadosFiltrados.filter(c => c.tipoDeProblema === tipo);

    renderChamados();
}

function salvar() {
    const titulo = campoTitulo.value;
    const sistema = campoSistema.value ? campoSistema.value : undefined;
    const tipoDeProblema = campoTipo.value;
    const descricao = campoDescricao.value;

    if (!(titulo && tipoDeProblema && descricao)) {
        alert("Existem campos obrigatórios não preenchidos!");
    }

    const chamado = {
        titulo,
        sistema,
        tipoDeProblema,
        descricao,
        status: "Novo",
        solicitante: MEU_NOME,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
    }
    
    const chamados = getListaLocalStorage("chamados");
    chamado.id = chamados.length + 1;
    chamados.push(chamado);
    setListaLocalStorage("chamados", chamados);
    alert("Chamado Salvo com sucesso!");
    limparCampos();
}

function limparCampos() {
    campoTitulo.value = "";
    campoSistema.value = "";
    campoTipo.value = "";
    campoDescricao.value = "";
}

function renderChamados() {
    listaChamados.innerHTML = "";
    if (!chamadosFiltrados.length) {
        listaChamados.innerHTML = `<tr><td class="text-center" colspan="6">Nenhum registro encontrado</td></tr>`    
    }

    for (const chamado of chamadosFiltrados) {
        listaChamados.innerHTML += `<tr>
            <td class="text-center"><a href="/pages/chamados/visualizar.html?id=${chamado.id}">${chamado.id}</a></td>
            <td class="text-center">${formatarData(chamado.atualizadoEm)}</td>
            <td>${chamado.atendente ?? "--"}</td>
            <td>${chamado.titulo}</td>
            <td>${chamado.tipoDeProblema}</td>
            <td>${chamado.status}</td>
        </tr>`;
    }
}

popularCampos();