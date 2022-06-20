usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
if (!usuarioCorrenteJSON) {
    sessionStorage.setItem('usuarioCorrente', JSON.stringify({}));
}