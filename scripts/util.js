const MEU_NOME = localStorage.getItem("login");
const MEU_NOME_COMPLETO = localStorage.getItem("nomeCompleto");

const statuses = ["Novo", "Esperando resposta", "Respondido", "Concluído", "Cancelado"];
const tiposDeProblema = ["Conexão", "Hardware", "Software", "Acesso", "Outro"];
const tiposDeColaborador = ["Atendente", "Solicitante"];
const sistemas = ["Sistema de Vendas", "Sistema Escolar", "Sistema Financeiro"];
const prioridades = ["Crítica", "Alta", "Média", "Baixa"];

function formatarData(dataStr) {
    return new Date(dataStr).toLocaleString('fr-FR');
}

function popularCampo(campo, valores) {
    for (const valor of valores) {
        const option = document.createElement("option");
        option.value = valor;
        option.innerText = valor
        campo.append(option);
    }
}

function getListaLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
}

function setListaLocalStorage(key, lista) {
    localStorage.setItem(key, JSON.stringify(lista));
}