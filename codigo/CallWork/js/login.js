// Página inicial de Login
const LOGIN_URL = "login.html";

//script login page
// Declara uma função para processar o formulário de login
function processaFormLogin(event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault();

    // Obtem os dados de login e senha a partir do formulário de login
    var username = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;

    // Valida login e se estiver ok, redireciona para tela inicial da aplicação
    resultadoLogin = loginUser(username, password);
    if (resultadoLogin) {
        usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
        }
        if (usuarioCorrente.login == 'admin'){
            window.location.href = 'admin.html';
            
        }else{
            window.location.href = 'profile.html';
        }
    }
    else { // Se login falhou, avisa ao usuário
        alert('Email ou senha incorretos');
    }
}

// Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
document.getElementById('login-form').addEventListener('submit', processaFormLogin);


// username.oninput = validaForm;
// password.oninput = validaForm;

//fim login page



// Objeto para o banco de dados de usuários baseado em JSON
let db_usuarios;
loginUserdb();

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
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


// Dados de usuários para serem utilizados como carga inicial
// const dadosIniciais = {
//     usuarios: [
//         { "id": generateUUID (), "permission": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com"},
//         { "id": generateUUID (), "permission": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com"},
//     ]
// };


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    // var usuariosJSON = localStorage.getItem('db_usuarios');
    
    // Verifica se existem dados já armazenados no localStorage
    // if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
    //     // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
    //     alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

    //     // Copia os dados iniciais para o banco de dados 
    //     db_usuarios = dadosIniciais;

    //     // Salva os dados iniciais no local Storage convertendo-os para string antes
    //     localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    // }
    // else  {  // Se há dados no localStorage
        
    //     // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
    //     db_usuarios = JSON.parse(usuariosJSON);    
    // }
};


// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(login, senha) {
    
    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.length; i++) {
        var usuario = db_usuarios[i];
        
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.email && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.permission;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            
            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

function setUserPass () {

}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();