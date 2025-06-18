const listaColaboradores = document.getElementById("lista-colaboradores");

const filtroNome = document.getElementById("filtroTitulo");
const filtroTipo = document.getElementById("filtroTipo");

const campoNome = document.getElementById("campoNome");
const campoSobrenome = document.getElementById("campoSobrenome");
const campoTipo = document.getElementById("campoTipo");
const campoCpf = document.getElementById("campoCPF");
const campoDataDeNascimento = document.getElementById("campoDataDeNascimento");

let colaboradoresFiltrados = [];

function popularCampos() {
    popularCampo(filtroTipo ?? campoTipo, tiposDeColaborador);
}

function getColaboradores() {
    return getListaLocalStorage("colaboradores")
        .sort((c1,c2) => c2.id - c1.id);
}

function filtrar() {
    const nome = filtroTitulo.value;
    const tipo = filtroTipo.value ?? undefined;

    colaboradoresFiltrados = getColaboradores();
    if (nome.length) colaboradoresFiltrados = colaboradoresFiltrados.filter(c => c.nome.includes(nome));
    if (tipo) colaboradoresFiltrados = colaboradoresFiltrados.filter(c => c.tipo === tipo);

    renderColaboradores();
}

function salvar() {
    const nome = campoNome.value;
    const sobrenome = campoSobrenome.value;
    const tipo = campoTipo.value;
    const cpf = campoCpf.value;
    const dataDeNascimento = campoDataDeNascimento.value;

    if (!(nome && sobrenome && tipo && cpf && dataDeNascimento)) {
        alert("Existem campos obrigatórios não preenchidos!");
    }

    const colaborador = {
        nome,
        sobrenome,
        tipo,
        cpf,
        dataDeNascimento,
    }
    
    const colaboradores = getListaLocalStorage("colaboradores");
    colaborador.id = colaboradores.length + 1;
    colaboradores.push(colaborador);
    setListaLocalStorage("colaboradores", colaboradores);
    alert("Colaborador Salvo com sucesso!");
    limparCampos();
}

function limparCampos() {
    campoNome.value = "";
    campoSobrenome.value = "";
    campoTipo.value = "";
    campoCpf.value = "";
    campoDataDeNascimento.value = "";
}

function renderColaboradores() {
    listaColaboradores.innerHTML = "";
    if (!colaboradoresFiltrados.length) {
        listaColaboradores.innerHTML = `<tr><td class="text-center" colspan="5">Nenhum registro encontrado</td></tr>`    
    }

    for (const colaborador of colaboradoresFiltrados) {
        listaColaboradores.innerHTML += `<tr>
            <td class="text-center">${colaborador.id}</a></td>
            <td>${colaborador.nome} ${colaborador.sobrenome}</td>
            <td class="text-center">${colaborador.tipo}</td>
            <td class="text-center">${colaborador.cpf}</td>
            <td class="text-center">${colaborador.dataDeNascimento}</td>
        </tr>`;
    }
}

popularCampos();