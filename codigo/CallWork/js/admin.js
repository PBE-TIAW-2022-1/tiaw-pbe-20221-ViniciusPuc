
function profileUsersPageadmin(){
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    let usuarioCorrente = '';
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    if(usuarioCorrente.login != 'admin'){
        window.location.href = 'index.html';
    }

    let aux = `
        <tr>
            <th>Usuário</th>
            <th>Postagens</th>
            <th>Atividade</th>
            <th>Exclusão</th>
        </tr>`;
    
    for(let i = 0; i < profiles.length; i++){
        for(let j = 0; j < posts.length; j++){
            if(posts[j].id == profiles[i].id){
                aux = aux + `
                    <tr>
                        <td>${profiles[i].nome}</td>
                        <td>${posts[j].publications.length}</td>
                        <td><button type="button" onclick="account_access('${profiles[i].id}')" class="btn btn-primary">Acessar posts</button></td>
                        <td><button type="button" onclick="account_del('${profiles[i].id}')" class="btn btn-danger">Excluir conta</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById('Profiles_users').innerHTML = aux;
};

window.onload = ()=>{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            posts = JSON.parse(this.responseText);

            var xhrr = new XMLHttpRequest();
            xhrr.withCredentials = false;

            xhrr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    profiles = (JSON.parse(this.responseText));
                    profileUsersPageadmin();
                }
            });

            xhrr.open("GET", "https://callworkdatabase.herokuapp.com/accounts/");
            xhrr.setRequestHeader("content-type", "application/json");
            xhrr.setRequestHeader("cache-control", "no-cache");

            xhrr.send();
        }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

document.getElementById('quit_admin').addEventListener('click', ()=>{
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = 'index.html';
})

function account_access(id_profile){
    localStorage.setItem('user_id', JSON.stringify (id_profile));
    console.log('Mudando para perfil:', id_profile);
    window.location.href = 'profile.html';
}