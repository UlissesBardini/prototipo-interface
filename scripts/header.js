const header = document.createElement("header");

header.innerHTML = `<div class="botao-header-container">
    <a class="btn main-button" href="/pages/chamados/abrirChamado.html">Abrir Chamado</a>
</div>
    <div class="username-container">
        <a id="username">${MEU_NOME}</a>
    </div>
<div class="foto-perfil-container">
    <img src="/assets/userprofile.png" class="foto-perfil">
</div>`;

document.body.prepend(header);