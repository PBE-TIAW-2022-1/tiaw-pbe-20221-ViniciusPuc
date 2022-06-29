function pesquisa(){
    const urlParams = new URLSearchParams(window.location.search);
    let query = urlParams.get('search');

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let posts = JSON.parse(this.responseText);
            let aux = "";
            for(let i = 0; i < posts.length; i++){
                for(let j = 0; j< posts[i].publications.length; j++){
                    if (usuarioCorrenteJSON != '{}') {
                        var userNumber = `proposta.html?telefone=55${db_usuarios[i].telefone}`;
                    }else{
                        var userNumber = 'cadastro.html';
                    }
                    
                    if (posts[i].publications[j].category.includes(query) || posts[i].publications[j].title.includes(query) || posts[i].publications[j].description.includes(query)){

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
                        
                        aux = aux + `
                            <div class="containers">
                                <div class="product-details">
                                    <h1>${posts[i].publications[j].title}</h1>
                                    <br>
                            
                                    <p style="margin-bottom: 15px;"><i>Publicado há: ${diff} &emsp; Interessados: ${posts[i].publications[j].num_inter}</i></p>
                            
                                    <p>${posts[i].publications[j].description}</p>
                            
                                    <div class="control">
                                        <a href="${userNumber}">
                                            <button class="btn1" id="btn_soli_${posts[i].publications[j].id_post}" style="left: 80px; top: 18px;">
                                                <span class="price">R$ ${posts[i].publications[j].price}</span>
                                                <span class="plus"><i class="fa fa-plus" style="color: #1a66ff;" aria-hidden="true"></i></span>
                                                <span class="buy">Fazer proposta</span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }
            }
            if (aux != ""){
                document.getElementById('about-us').innerHTML = aux;
            }
        }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
}

window.onload = pesquisa();