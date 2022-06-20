// Verifica se o usuário já esta logado e se negativo, redireciona para tela de login

function loadControlPanel(users){
    for(let i = 0; i < users.length; i++){
        if(users[i].id == user_id){
            let div_user = `
                <img src="assets/img/request.png" class="card__image">
                <p class="card__name" style="color: #000;">${users[i].nome}</p>
                <div class="product-details">
                    <p style="text-align: center;">${users[i].profissao}</p>
                    <span id="starRate" class="hint-star star">

                    </span>
                    <br>
                    <h4 style="text-align: center; color: #000;">Trabalhados</h4>
                    <div class="grid-container">
            
                        <div id="postQtd" class="grid-child-posts">
                            
                        </div>
                
                        <div id="workedProfiles" class="grid-child-followers">
                            
                        </div>
            
                    </div>
            
                    <button onclick="new_post()" class="bttn draw-border">Publicar novo trabalho</button>
                    <button class="bttn draw-border">Buscar</button>
                </div>
            `;
            
            // Substitui as linhas do corpo da tabela
            document.getElementById("table-user").innerHTML = div_user;
        }
    }
}

function loadControlPanelPostsQtd(posts){
    for(let i = 0; i < posts.length; i++){
        if(posts[i].id == user_id){
            document.getElementById("postQtd").innerHTML = `<p style="text-align: center;"><b>${posts[i].publications.length}</b><br> Postados</br></p>`;
        }
    }
}

function loadControlPanelWorkedJobs(profiles){
    for(let i = 0; i < profiles.length; i++){
        if(profiles[i].id == user_id){
            stars = '';
            for(let f = 0; f < profiles[i].stars; f++){
                stars =  stars + `
                    <i class="fa fa-star" aria-hidden="true"></i>
                `;
            };
            for(let g = 0; g < (5 - profiles[i].stars); g++){
                stars = stars + `
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                `;
            };
            document.getElementById("starRate").innerHTML = stars;
            document.getElementById("workedProfiles").innerHTML = `<p style="text-align: center; "><b>${profiles[i].worked}</b> Concluídos</p>`;
        }
    }
}

function loadUserPosts(posts){
    let pubs = `
        <br>
        <h4>Trabalhos postados:</h4>
    `;

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id == user_id){
            //mostrar posts do user
            for(let j = 0; j < posts[i].publications.length; j++){
                //calculando hora da publicação
                var dtPartida = posts[i].publications[j].date_pub;
                const hoje = new Date();
                var dtChegada = hoje.toLocaleString();

                var date1 = new Date(parseInt(dtPartida.slice(6,10)), parseInt(dtPartida.slice(3,5)), parseInt(dtPartida.slice(0,3)), parseInt(dtPartida.slice(11,13)), parseInt(dtPartida.slice(14,16))),
                    date2 = new Date(parseInt(dtChegada.slice(6,10)), parseInt(dtChegada.slice(3,5)), parseInt(dtChegada.slice(0,3)), parseInt(dtChegada.slice(11,13)), parseInt(dtChegada.slice(14,16)));

                var diffMs = (date2 - date1);
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                var diff = diffHrs + 'h ' + diffMins + 'm';

                pubs += `
                    <div class="containers">
                        <div class="product-details">
                            <h1>${posts[i].publications[j].title}</h1>
                    
                            <p style="margin-bottom: 15px;"><i>Publicado há: ${diff} &emsp; Interessados: ${posts[i].publications[j].num_inter}</i></p>
                    
                            <p style="color: #4F4F4F"><b>Descrição: </b>${posts[i].publications[j].description}</p>
                            <div class="container_price">
                                <label for="post_price_${posts[i].publications[j].id_post}"><b>Valor: </b></label>
                                <p name="post_price_${posts[i].publications[j].id_post}" id="post_price_${posts[i].publications[j].id_post}">R$ ${posts[i].publications[j].price}</p>
                            </div>
                                                    
                            <div class="container_btns">
                                <button type="button" onclick="del_post(${posts[i].publications[j].id_post})" id="btn_del_${posts[i].publications[j].id_post}" class="btn1 btn_post_del">Deletar publicação</button>
                                <button type="button" onclick="requestEditPost(${posts[i].publications[j].id_post})" id="btn_edit_${posts[i].publications[j].id_post}" class="btn1 btn_post_edit">Editar publicação</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }
    // console.log(posts);
    document.getElementById('posts_user_profile').innerHTML = pubs;
}

function requestLoadControlPanel(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let users = JSON.parse(this.responseText);
        loadControlPanel(users);
        requestLoadPosts();
        requestLoadWorked();
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/accounts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function requestLoadPosts(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let posts = JSON.parse(this.responseText);
        loadControlPanelPostsQtd(posts);
        loadUserPosts(posts);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function requestLoadWorked(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let profiles = JSON.parse(this.responseText);
        loadControlPanelWorkedJobs(profiles)
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/profiles");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

window.onload = ()=>{
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }

    if (!usuarioCorrente.login) {
        window.location.href = 'login.html';
    }else{
        if(usuarioCorrente.login == 'user'){
            user_id = usuarioCorrente.id;
            var perfil = 'profile.html';
        }else{
            user_id = JSON.parse(localStorage.getItem('user_id'));
            var perfil = 'admin.html';
        }

        let new_header = `
            <div class="container d-flex justify-content-between">
                <div class="logo">
                    <a href="index.html"><img src="assets/img/logo-header.png" width="52px" height="270px"></a>
                </div>
                <!-- Navbar -->
                <nav id="navbar" class="navbar">
                    <ul>
                        <li><input type="text" id="search" placeholder="Buscar serviços" name="search" style="width: 320px; height: 40px;"></li>
                        <button type="submit" id="btn_search" style="width: 50px; height: 40px;"><i class="fa fa-search"></i></button></input>
                        <li><a href="servicos.html">Serviços</a></li>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="${perfil}"><button class="button button5"><img src="assets/img/request.png" width="30px" height="30px"></button></a></li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                <!-- Navbar -->
            </div>
        `;

        document.getElementById('header').innerHTML = new_header;
        requestLoadControlPanel();
    }
}

// Apaga os dados do usuário corrente no sessionStorage
document.getElementById('quit_btn').addEventListener('click', ()=>{
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = 'index.html';
})

function edit_post(posts, id){
    let body = `
        <br>
        <h4>Editar Publicação:</h4>
    `;

    for(let i = 0; i < posts.length; i++){
        for(let j = 0; j< posts[i].publications.length; j++){
            if(posts[i].id == user_id && posts[i].publications[j].id_post == id){
                body += ` 
                <div class="containers">
                    <div class="product-details" id="container_post_${posts[i].publications[j].id_post}">
                        <label for="title_${posts[i].publications[j].id_post}">Título: </label>
                        <input type="text" value="${posts[i].publications[j].title}" class="user_input" name="title_${posts[i].publications[j].id_post}" id="title_post_${posts[i].publications[j].id_post}">
                        <br>
                        <label for="post_description_${posts[i].publications[j].id_post}">Descrição: </label>
                        <textarea type="text" value="" class="user_description" name="post_description_${posts[i].publications[j].id_post}" id="post_description_${posts[i].publications[j].id_post}">${posts[i].publications[j].description}</textarea>
                        <br>
                        <label for="post_price_${posts[i].publications[j].id_post}"><b>Valor: R$</b></label>
                        <input type="text" value="${posts[i].publications[j].price}" class="price post_price" name="post_price_${posts[i].publications[j].id_post}" id="post_price_${posts[i].publications[j].id_post}">
                        <br>
                        <label for="post_category_${posts[i].publications[j].id_post}">Categoria:</label>
                        <input type="text" value="${posts[i].publications[j].category}" class="price post_category" name="post_category_${posts[i].publications[j].id_post}" id="post_category_${posts[i].publications[j].id_post}">
                        <br>
                        <div class="container_btns">
                            <button type="button" onclick="sendPutEditPost(${i})" id="btn_salvar_${posts[i].publications[j].id_post}" class="btn1 btn_post_del">Salvar publicação</button>
                            <button type="button" onclick="sair()" id="btn_voltar" class="btn1 voltar btn_post_edit">Cancelar</button>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }
    document.getElementById('posts_user_profile').innerHTML = body;
}
function requestEditPost(id){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let posts = JSON.parse(this.responseText);
        edit_post(posts, id);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function new_post(){
    let body = `
        <br>
        <h4>Nova publicação:</h4>
        <div class="containers">
            <div class="product-details" id="new_post_container">
                <label for="title_post">Título: </label>
                <h1><input type="text" placeholder="Insira um título" class="user_input" name="title_post" id="title_post"></h1>
                <label for="post_description">Descrição: </label>
                <textarea type="text" placeholder="Insira uma descrição" class="user_description" name="post_description" id="post_description"></textarea>
                <br>
                <label for="post_price}">Valor: R$</label>
                <input type="text" placeholder="Insira um valor" class="price post_price" name="post_price" id="post_price">
                <br>
                <label for="post_category">Categoria:</label>
                <input type="text" placeholder="Insira a categoria" class="price post_category" name="post_category" id="post_category">
                <br>
                <div class="container_btns">
                    <button type="button" onclick="sendPutSavePost()" id="btn_salvar" class="btn1 btn_post_del">Salvar publicação</button>
                    <button type="button" onclick="sair()" id="btn_voltar" class="btn1 voltar btn_post_edit">Cancelar</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('posts_user_profile').innerHTML = body;
}

function sendPutSavePost(){
    let title = document.getElementById('title_post').value;
    let description = document.getElementById('post_description').value;
    let price = document.getElementById('post_price').value;
    let category = (document.getElementById('post_category').value).normalize("NFD");

    const hoje = new Date();
    let  dataPub = hoje.toLocaleString();

    function sendput(posts){
        let newPost;
        for(let i = 0; i < posts.length; i++){
            if(posts[i].id == user_id){
                if (posts[i].publications.length == 0){
                    idp = 1;
                }else{
                    idp = posts[i].publications[posts[i].publications.length - 1].id_post + 1;
                }
                let body = {
                    "id_post": idp,
                    "title": title,
                    "category": category,
                    "date_pub": dataPub,
                    "num_inter": 0,
                    "description": description,
                    "price": price
                };
                newPost = posts[i];
                newPost.publications.push(body);
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert('Salvo com sucesso');
                location.reload();
            }
            });

        xhr.open("PUT", "https://callworkdatabase.herokuapp.com/posts/" + String(user_id));
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(JSON.stringify(newPost));
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let posts = JSON.parse(this.responseText);
        sendput(posts);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function del_post(postID){
    function sendput(posts){
        let newPost;
        for(let i = 0; i < posts.length; i++){
            for(let j = 0; j< posts[i].publications.length; j++){
                if(posts[i].id == user_id && posts[i].publications[j].id_post == postID){
                    newPost = posts[i];
                    newPost.publications.splice(j, j+1);
                }
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert('Apagado com sucesso');
                location.reload();
            }
            });

        xhr.open("PUT", "https://callworkdatabase.herokuapp.com/posts/" + String(user_id));
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(JSON.stringify(newPost));
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let posts = JSON.parse(this.responseText);
        sendput(posts);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function sendPutEditPost(postID){
    let title = document.getElementById('title_post_' + String(postID)).value;
    let description = document.getElementById('post_description_' + String(postID)).value;
    let price = document.getElementById('post_price_' + String(postID)).value;
    let category = document.getElementById('post_category_' + String(postID)).value;
    
    function sendput(posts){
        let newPost;
        for(let i = 0; i < posts.length; i++){
            for(let j = 0; j< posts[i].publications.length; j++){
                if(posts[i].id == user_id && posts[i].publications[j].id_post == postID){
                    newPost = posts[i];
                    newPost.publications[j].title = title;
                    newPost.publications[j].description = description;
                    newPost.publications[j].price = price;
                    newPost.publications[j].category = category;
                }
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert('Editado com sucesso');
                location.reload();
            }
            });

        xhr.open("PUT", "https://callworkdatabase.herokuapp.com/posts/" + String(user_id));
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(JSON.stringify(newPost));
    }

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let posts = JSON.parse(this.responseText);
        sendput(posts);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();

}

function salvar_post(user_post_id){
    console.log('salvando');
    let new_post_id = users[user].posts[users[user].posts.length].id_post + 1;
}

function sair(){
    location.reload();
}
