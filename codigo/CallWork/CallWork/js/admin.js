window.onload=()=>{
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    let usuarioCorrente = '';
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    if(usuarioCorrente.login != 'admin'){
        window.location.href = 'index.html';
    }
}