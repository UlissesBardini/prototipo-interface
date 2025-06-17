const statuses = [ "Novo", "Esperando resposta", "Respondido", "Concluído", "Cancelado" ];

const filtroDescricao = document.getElementById("filtroDescricao");
const filtroStatus = document.getElementById("filtroStatus");
const filtroTipo = document.getElementById("filtroTipo");
const listaChamados = document.getElementById("lista-chamados");

let chamadosFiltrados = [];

function popularStatus() {
    for (const status of statuses) {
        const option = document.createElement("option");
        option.value = status;
        option.innerText = status
        filtroStatus.append(option);
    }
}

function getChamados() {
    const chamados = localStorage.getItem("chamados") ?? [];
    return JSON.parse(chamados)
        .sort((c1,c2) => -(c1.id.localeCompare(c2.id)));
}

function filtrar() {
    const descricao = filtroDescricao.value;
    const status = filtroStatus.value ?? undefined;
    const tipo = filtroTipo.value ?? undefined;

    chamadosFiltrados = getChamados();
    if (descricao.length) chamadosFiltrados = chamadosFiltrados.filter(c => c.topico.includes(descricao));
    if (status) chamadosFiltrados = chamadosFiltrados.filter(c => c.status === status);
    if (tipo) chamadosFiltrados = chamadosFiltrados.filter(c => c.tipo === tipo);

    renderChamados();
}

function renderChamados() {
    listaChamados.innerHTML = "";
    if (!chamadosFiltrados.length) {
        listaChamados.innerHTML = `<tr><td class="text-center" colspan="6">Nenhum chamado</td></tr>`    
    }

    for (const chamado of chamadosFiltrados) {
        listaChamados.innerHTML += `<tr>
            <td class="text-center"><a href="/chamados/visualizar.html?id=${chamado.id}">${chamado.id}</a></td>
            <td class="text-center">${formatarData(chamado.atualizadoEm)}</td>
            <td>${chamado.atendente}</td>
            <td>${chamado.topico}</td>
            <td>${chamado.tipoDeProblema}</td>
            <td>${chamado.status}</td>
        </tr>`;
    }
}

function formatarData(dataStr) {
    return new Date(dataStr).toLocaleString('fr-FR');
}

popularStatus();