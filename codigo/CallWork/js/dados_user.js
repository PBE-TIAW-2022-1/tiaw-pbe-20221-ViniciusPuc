function loginUserdb(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            db_usuarios = (JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/accounts/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function newPosts(){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    body = {"publications": []};
    
    xhr.open("POST", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(JSON.stringify(body));
}

function newProfiles(){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    body = {
        "worked": 0,
        "money_received": 0,
        "stars": 0
    };
    
    xhr.open("POST", "https://callworkdatabase.herokuapp.com/profiles");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(JSON.stringify(body));
}

function newUser(body){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        }
    });
    
    xhr.open("POST", "https://callworkdatabase.herokuapp.com/accounts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(JSON.stringify(body));
}

function loadPosts(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            posts = JSON.parse(this.responseText);
        }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function loadProfiles(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        profiles = JSON.parse(this.responseText);
    }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/profiles");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

async function modUser(body, id){
    let request = {
        'method': 'PUT',
        'headers': {'Content-Type':'application/json'},
        'body': JSON.stringify(body)
    }
    await fetch('https://callworkdatabase.herokuapp.com/accounts/'+String(id), request)
}

async function deleteDB(type, id){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('user ID:' + String(id)+ ' - ' + type + ' deleted');
        }
    });

    xhr.open("DELETE", 'https://callworkdatabase.herokuapp.com/' + type + '/' + String(id));
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

function account_del(id_profile){
    var usuarioCorrente = {};
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    console.log('Apagando perfil:', id_profile);
    deleteDB('accounts', id_profile);
    deleteDB('profiles', id_profile);
    deleteDB('posts', id_profile);
    alert('Conta apagada');
    if (usuarioCorrente.login == 'admin'){
        window.location.reload();
    }else{
        window.location.href = 'index.html';
    }
}

function searchData(){
    let dados = document.getElementById('search').value;
    window.location.href = 'search.html?search=' + String(dados);
}