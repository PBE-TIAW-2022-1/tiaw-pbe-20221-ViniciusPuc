function leDados () {
    //Resgata itens do LocalStorage
   let strDados = localStorage.getItem('conteúdop');
   let objDados = {};

   if (strDados) {
        //Conversão em JSON
       objDados = JSON.parse (strDados);
   }
   //Exemplos pré-prontos fictícios caso não tenham dados
   else {
         //Formato de Array
       objDados = { profissionais: [ 
           {profissão: "Eletricista", nome: "Vitor Gonçalves", telefone: "31-94839-2119", descrição: "Trabalho focado em contrução de circuitos e pequenos consertos"}, 
           {profissão: "Diarista", nome: "Larissa Paula", telefone: "31-94829-8417", descrição: "Profissão semelhante ao de empregada doméstiva, porém o serviço é apenas diário."},
           {profissão: "Pintor", nome: "Gabriel Matheus", telefone: "31-94829-8451", descrição: "Trabalho com pinturas no ambiente doméstico."}
       ]}
   }
    //retorna o objeto
   return objDados;
}

function salvaDados (dados) {
   //Adiciona dados(chave e valor) no LocalStorage/ conversão para string
   localStorage.setItem ('conteúdop', JSON.stringify (dados));
}

function incluirProfissional (){
   // Ler os dados do localStorage
   let objDados = leDados();

   // Incluir um novo profissional
   let strProfissao = document.getElementById ('campoProfissao').value;
   let strNome = document.getElementById ('campoNome').value;
   let strTelefone = document.getElementById ('campoTelefone').value;
   let strDescricao = document.getElementById ('campoDescricao').value;
   let novoProfissional = {
       profissão: strProfissao,
       nome: strNome,
       telefone: strTelefone,
       descrição: strDescricao
   };
   //coloca mais um profissional no Array
   objDados.profissionais.push (novoProfissional);

   // Salvar os dados no localStorage novamente
   salvaDados (objDados);

   // Atualiza os dados da tela
   imprimeDados ();
}
function excluirProfissional (){
   // Ler os dados do localStorage
   let objDados = leDados();

   // Exclui o último profissional
   let strProfissao = document.getElementById ('campoProfissao').value;
   let strNome = document.getElementById ('campoNome').value;
   let strTelefone = document.getElementById ('campoTelefone').value;
   let strDescricao = document.getElementById ('campoDescricao').value;
   let menosUmProfissional = {
       profissão: strProfissao,
       nome: strNome,
       telefone: strTelefone,
       descrição: strDescricao
   };
   //Apaga o último profissional no Array
   objDados.profissionais.pop (menosUmProfissional);

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
   for (i=0; i< objDados.profissionais.length; i++) {
       strHtml += `<p> - ${objDados.profissionais[i].profissão}<br> - ${objDados.profissionais[i].nome}<br> - ${objDados.profissionais[i].telefone}<br> - ${objDados.profissionais[i].descrição}<br></p>`
   }

   tela.innerHTML = strHtml;
}

// Configuração dos botões vinculado as funções
document.getElementById ('btnCarregaDados').addEventListener ('click', imprimeDados);
document.getElementById ('btnIncluirProfissional').addEventListener ('click', incluirProfissional);
document.getElementById ('btnExcluirProfissional').addEventListener ('click', excluirProfissional);


//Definição dos dados de teste
{
    "profissionais"[
      {
        "profissão": "Tarefa que o empregado exerce",
        "nome": "Nome do profissional",
        "telefone": "Número do profissional",
        "descrição": "Como é o tipo de serviço realizado pelo contratado"
      }
    ]
  }