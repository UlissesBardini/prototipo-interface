const listaChamados = document.getElementById("lista-chamados");

const filtroTitulo = document.getElementById("filtroTitulo");
const filtroColaborador = document.getElementById("filtroColaborador");

const colaboradores = getListaLocalStorage("colaboradores")

let chamadosFiltrados = [];

function popularCampos() {
    popularCampo(filtroColaborador, colaboradores.map(a => `${a.nome} ${a.sobrenome}`));
}

function getChamados() {
    return getListaLocalStorage("chamados")
        .sort((c1,c2) => c2.id - c1.id);
}

function filtrar() {
    const titulo = filtroTitulo.value;
    const colaborador = filtroColaborador.value ?? undefined;

    chamadosFiltrados = getChamados();
    if (titulo.length) chamadosFiltrados = chamadosFiltrados.filter(c => c.titulo.includes(titulo));
    if (colaborador) chamadosFiltrados = chamadosFiltrados.filter(c => c.solicitante === colaborador)

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