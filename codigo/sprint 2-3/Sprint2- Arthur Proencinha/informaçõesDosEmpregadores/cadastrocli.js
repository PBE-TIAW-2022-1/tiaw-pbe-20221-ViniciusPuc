function leDados () {
    //Resgata itens do LocalStorage
    let strDados = localStorage.getItem('conteúdoc');
    let objDados = {};

    if (strDados) {
        //Conversão dos dados em JSON
        objDados = JSON.parse (strDados);
    }
    //Exemplos pré-prontos fictícios caso não tenham dados
    else {
        //Formato de Array
        objDados = { clientes: [ 
            {nome: "Fernando Luis", telefone: "31-97391-8997", descrição: "Procura-se encanador para tarefas simples."}, 
            {nome: "Paulo da Silva", telefone: "31-93892-1998", descrição: "Necessito de um especialista em pinturas para realizar um serviço na minha residência"},
            {nome: "Gabriel Lucas", telefone: "31-90997-6413", descrição: "Estou a procura de uma diarista para a realização de tarefas semanais."}
        ]}
    }
    //retorna o objeto
    return objDados;
}

function salvaDados (dados) {
    //Adiciona dados(chave e valor) no LocalStorage/conversão para string
    localStorage.setItem ('conteúdoc', JSON.stringify (dados));
}

function incluirCliente (){
    // Ler os dados do localStorage
    let objDados = leDados();

    // Inclui um novo Cliente
    let strNome = document.getElementById ('campoNome').value;
    let strTelefone = document.getElementById ('campoTelefone').value;
    let strDescricao = document.getElementById ('campoDescricao').value;
    let novoCliente = {
        nome: strNome,
        telefone: strTelefone,
        descrição: strDescricao
    };
    //coloca mais um cliente no Array
    objDados.clientes.push (novoCliente);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);

    // Atualiza os dados da tela
    imprimeDados ();
}
function excluirCliente (){
    // Ler os dados do localStorage
    let objDados = leDados();

    // Exclui o último Cliente
    let strNome = document.getElementById ('campoNome').value;
    let strTelefone = document.getElementById ('campoTelefone').value;
    let strDescricao = document.getElementById ('campoDescricao').value;
    let menosUmCliente = {
        nome: strNome,
        telefone: strTelefone,
        descrição: strDescricao
    };
    //Apaga o último cliente no Array
    objDados.clientes.pop (menosUmCliente);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);

    // Atualiza os dados da tela
    imprimeDados ();
}
function imprimeDados () {
    //Imprime os dados na tela
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();

    //'for' onde passa por cada elemento do Array para imprimir os dados
    for (i=0; i< objDados.clientes.length; i++) {
        strHtml += `<p> - ${objDados.clientes[i].nome}<br> - ${objDados.clientes[i].telefone}<br> - ${objDados.clientes[i].descrição}<br></p>`
    }
    tela.innerHTML = strHtml;
}

// Configuração dos botões
document.getElementById ('btnCarregaDados').addEventListener ('click', imprimeDados);
document.getElementById ('btnIncluirCliente').addEventListener ('click', incluirCliente);
document.getElementById ('btnExcluirCliente').addEventListener ('click', excluirCliente);


//Definição dos dados de teste
{
    "clentes"[
      {
        "nome": "Nome do profissional",
        "telefone": "Número do profissional",
        "descrição": "Como é o tipo de serviço realizado pelo contratado"
      }
    ]
  }