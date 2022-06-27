// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');

    // Verifica se existem dados já armazenados no localStorage
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_usuarios = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function addUser (nome, login, senha, email) {
    
    // Cria um objeto de usuario para o novo usuario 
    let newId = generateUUID ();
    let usuario = { "id": newId, "login": login, "senha": senha, "nome": nome, "email": email };
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    db_usuarios.usuarios.push(usuario);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify (db_usuarios));
}

function salvaLogin(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();
    
    // Obtem os dados do formulário
    let login = 'user';
    let nome = document.getElementById('validationServer01').value;
    let email = document.getElementById('validationServer03').value;
    let senha = document.getElementById('validationServer04').value;
    let senha2 = document.getElementById('validationServer05').value;
    let telefone = document.getElementById('validationServer02').value;
    let profissao = document.getElementById('validationServer06').value;

    if (senha != senha2) {
        alert('As senhas informadas não conferem.');
        return
    }else{
        // Adiciona o usuário no banco de dados]
        let bodyNewUser = {
            "permission": login,
            "email": email,
            "telefone": telefone,
            "profile_img": "",
            "nome": nome,
            "senha": senha,
            "idade": 999,
            "profissao": profissao,
        }

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
    
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                users = (JSON.parse(this.responseText));
                let ver;
                for(let i = 0; i < users.length; i++){
                    if (users[i].email == email){
                        ver = false;
                        break;
                    }else{
                        ver = true;
                    }
                }
                if(ver){
                    newUser(bodyNewUser);
                    newPosts();
                    newProfiles();
                    // addUser(nome, login, senha, email);
                    alert('Usuário salvo com sucesso. Proceda com o login');
                    window.location.href = 'login.html';
                }else{
                    alert("Email já existente! Por favor, informe outro.")
                }
            }
        });
    
        xhr.open("GET", "https://callworkdatabase.herokuapp.com/accounts/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
    
        xhr.send();
    }
}


// Associar salvamento ao botao
document.getElementById('btn_salvar').addEventListener('click', salvaLogin);
