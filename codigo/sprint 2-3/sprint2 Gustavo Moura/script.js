let alterar_senha = document.getElementById("alterar_senha");
let container_senha = document.getElementById("container_senha");
let add_user = document.getElementById("add_user");
let container_profile = document.getElementById("user_profile");
let add_btn = document.getElementById("add_btn");
let add_users = document.getElementById("add_users");

//LocalStorage
//carrega localstorage e cria as divs correspondentes
window.onload = ()=>{
    let strDados = localStorage.getItem("data_base");

    if (strDados) {
        data = JSON.parse(strDados);
    }
    else {
        arquivo = {"profile 1":"vinicius", 
                "profile 2":"leonardo", 
                "profile 3":"michele", 
                "profile 4":"mariana"};

        localStorage.setItem("data_base", JSON.stringify(arquivo));
        data = JSON.parse(localStorage.getItem("data_base"));
    }
        

    //console.log(data)
    let aux = "<h1>Usuários cadastrados:</h1>";
    for(let i = 1; i <= Object.keys(data).length; i++){
        aux = aux + (`
            <div class="container_user">
                <input type="text" readonly="true" value="${data["profile "+i]}" class="user_input" name="nome" id="${"nome_"+i}">
                <button onclick="btn_renomear('${"Alterar_nome_"+i}', '${"btn_alterar_nome_"+i}', '${"nome_"+i}', '${Object.keys(data)[i-1]}')" class="btn_subm" type="submit" id="${"btn_alterar_nome_"+i}">Confirmar</button>
                <p onclick="alterar_nome('${"Alterar_nome_"+i}', '${"btn_alterar_nome_"+i}', '${"nome_"+i}')" id="${"Alterar_nome_"+i}">Alterar Nome</p>
                <p onclick="excluir('${Object.keys(data)[i-1]}')" id="${"Exluir_user_"+i}">Excluir Usuario</p>
            </div>
        `);
    }
    //console.log(aux);
    container_profile.innerHTML = aux;
}


//altera o display de alguns elementos para escondelos e mostrar outros
alterar_senha.addEventListener("click", ()=>{
    if (container_senha.style.display == "none"){
        container_senha.style.display = "block";
        alterar_senha.style.backgroundColor = "#fff";
        alterar_senha.style.color = "#720606";
        container_profile.style.display = "none";
        add_user.style.backgroundColor = "#f19191c5";
        add_user.style.color = "#fff";
        add_users.style.display = "none";
        add_btn.style.display = "none";
    }else{
        container_senha.style.display = "none";
        alterar_senha.style.backgroundColor = "#f19191c5";
        alterar_senha.style.color = "#fff";
    }
})

//altera o display de alguns elementos para escondelos e mostrar outros
add_user.addEventListener("click", ()=>{
    if (container_profile.style.display == "none"){
        container_profile.style.display = "block";
        add_user.style.backgroundColor = "#fff";
        add_user.style.color = "#720606";
        container_senha.style.display = "none";
        alterar_senha.style.backgroundColor = "#f19191c5";
        alterar_senha.style.color = "#fff";
        add_users.style.display = "block";
        add_btn.style.display = "block";
        
    }else{
        container_profile.style.display = "none";
        add_user.style.backgroundColor = "#f19191c5";
        add_user.style.color = "#fff";
    }
})

//chamada quando aperta o botão alterar nome
function alterar_nome(id_p, id_btn, id_input){
    let Alterar_nome_1 = document.getElementById(id_p);
    let btn_alterar_nome = document.getElementById(id_btn);
    let nome = document.getElementById(id_input);
    
    if (btn_alterar_nome.style.display == "none"){
        btn_alterar_nome.style.display = "block";
        Alterar_nome_1.style.display = "none";
        nome.readOnly = false;
        nome.style.border = "1px solid #000";
        nome.value = nome.value;

    }else{
        btn_alterar_nome.style.display = "none";
    }
}

//chamada quando aperta o botao confirmar no add/excluir user
function btn_renomear(id_p, id_btn, id_input, profile){
    let Alterar_nome_1 = document.getElementById(id_p);
    let btn_alterar_nome = document.getElementById(id_btn);
    let nome = document.getElementById(id_input);

    if (btn_alterar_nome.style.display == "block"){
        btn_alterar_nome.style.display = "none";
        Alterar_nome_1.style.display = "block";
        nome.readOnly = true;
        nome.style.border = "none";
        nome.value = nome.value;
    }

    data[profile] = nome.value;
    localStorage.setItem("data_base", JSON.stringify(data));
}

//exclui e atualiza o localstorage
function excluir(profile){
    alert("Usuário deletado!")
    delete data[profile];
    localStorage.setItem("data_base", JSON.stringify(data));
    location.reload();
}

//adiciona e atualiza o localstorage
add_btn.addEventListener("click", ()=>{
    alert("Usuário adicionado!");
    data["profile " + (Object.keys(data).length + 1)] = add_users.value;
    localStorage.setItem("data_base", JSON.stringify(data));
    location.reload();
})

let nova_senha = document.getElementById('nova_senha');
let confirmar_senha = document.getElementById('senha_repet');
let salvar_senha = document.getElementById('salvar_senha');

//função para adicionar senha
salvar_senha.addEventListener("click", ()=>{
    if (nova_senha.value == confirmar_senha.value){
        localStorage.setItem("pass", JSON.stringify(nova_senha.value));
        alert("Senha salva!")
    }else{
        alert("Os campos de senhas não conferem!")
    }
})
