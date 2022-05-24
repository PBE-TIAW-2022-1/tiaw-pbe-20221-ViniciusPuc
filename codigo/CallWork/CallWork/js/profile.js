// Verifica se o usuário já esta logado e se negativo, redireciona para tela de login     
window.onload = ()=>{
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    if (!usuarioCorrente.login) {
        window.location.href = LOGIN_URL;
    }else{
        let div_user = `<img src="assets/img/request.png" class="card__image">
        <p class="card__name" style="color: #000;">${usuarioCorrente.nome}</p>
        <div class="product-details">
            <p style="text-align: center;">Economista
            <span class="hint-star star">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
            </p>
            </span>
            <h4 style="text-align: center; color: #000;">Solicitações</h4>
            <div class="grid-container">
    
            <div class="grid-child-posts">
                <p style="text-align: center;"><b>5</b><br> Em aberto</br></p>
            </div>
    
            <div class="grid-child-followers">
                <p style="text-align: center; "><b>15</b> Concluídas
            </div>
    
            </div>
    
            <button class="bttn draw-border">Publicar</button>
            <button class="bttn draw-border">Buscar</button>
        </div>`
        // Substitui as linhas do corpo da tabela
        document.getElementById("table-user").innerHTML = div_user
    }
}

// Apaga os dados do usuário corrente no sessionStorage
document.getElementById('quit_btn').addEventListener('click', ()=>{
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = 'index.html';
})