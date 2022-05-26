window.onload=()=>{
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    let usuarioCorrente = '';
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    if(usuarioCorrente.login != 'admin'){
        window.location.href = 'index.html';
    }

    let aux = `<tr>
        <th>Usuário</th>
        <th>Postagens</th>
        <th>Atividade</th>
        <th>Exclusão</th>
    </tr>`;
    
    for(let i = 0; i < users.length; i++){
        aux = aux + `<tr>
        <td>${users[i].account.nome}</td>
        <td>${users[i].posts.length}</td>
        <td><button type="button" onclick="account_access('${users[i].account.id}')" class="btn btn-primary">Acessar posts</button></td>
        <td><button type="button" onclick="account_del('${users[i].account.id}')" class="btn btn-danger">Excluir conta</button></td>
      </tr>`;
    }
    document.getElementById('Profiles_users').innerHTML = aux;
}

document.getElementById('quit_admin').addEventListener('click', ()=>{
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = 'index.html';
})

function account_access(id_profile){
    console.log('Mudando para perfil:', id_profile);
}
function account_del(id_profile){
    console.log('Apagando perfil:', id_profile);
}