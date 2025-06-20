const sidebar = document.createElement("nav");
sidebar.id = "sidebar";

sidebar.innerHTML = `
<div class="logo-container">
    <button id="toggle-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
    </button>
    <a href="/pages/home.html" id="logo">Sistema de Chamados</a>
</div>
<menu id="main-menu">
    <li><a href="/pages/chamados/listagem.html">Chamados</a></li>
    <li>
        <button class="dropdown-btn">
            <span>Colaboradores</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
        </button>
        <menu class="submenu">
            <li><a href="/pages/colaboradores/cadastro.html">Cadastro</a></li>
            <li><a href="/pages/colaboradores/listagem.html">Listagem</a></li>
        </menu>
    </li>
    <li><a href="/pages/relatorios.html">Relatórios</a></li>
</menu>
`;

document.body.prepend(sidebar);
const toggleButton = document.getElementById("toggle-btn");
const mainMenu = document.getElementById("main-menu");

document.querySelectorAll('.dropdown-btn').forEach(button => {
button.addEventListener('click', () => {
        button.nextElementSibling.classList.toggle("show");
        button.classList.toggle("rotate");
    });
});

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle("close");
});

const links = document.querySelectorAll("#sidebar li:has(a)");

if (location.pathname.startsWith("/pages/chamados")) {
    links.item(0).classList.add("active");
}

if (location.pathname === "/pages/colaboradores/cadastro.html") {
    links.item(2).classList.add("active");
}

if (location.pathname === "/pages/colaboradores/listagem.html") {
    links.item(3).classList.add("active");
}

if (location.pathname === "/pages/relatorios.html") {
    links.item(4).classList.add("active");
}