let posts, profiles;
loadPosts();
loadProfiles();

(function loadCategorys(){
    let categoryArea = document.getElementById('myUL');
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let post = JSON.parse(this.responseText);
            let aux = [];
            for(let i = 0; i < post.length; i++){
                for(let l = 0; l < post[i].publications.length; l++){
                    if(!(aux.includes(post[i].publications[l].category))){
                        aux.push(post[i].publications[l].category);
                    }
                }
            }
            let template = `<li><b style="text-align: center;color: #fff; background-color: #313d72;">Filtro</b></li>`;
            for(let i = 0; i < aux.length; i ++){
                template += `
                    <li><a onclick="filter_posts('${aux[i].toLowerCase()}');">${aux[i].toUpperCase()}</a></li>
                `;
            }
            template += `<li><a onclick="filter_posts('all');">Todas as categorias</a></li>`;
            categoryArea.innerHTML = template;
        }
    });

    xhr.open("GET", "https://callworkdatabase.herokuapp.com/posts");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();

})();

function filter_posts(category = 'all'){  
    
    aux = '';
    for(let i = 0; i < posts.length; i++){
        for(let j = 0; j < posts[i].publications.length; j++){
            
            if (posts[i].publications[j].category == category || category == 'all'){

                // calcular qtd de estrelas
                for(let k = 0; k < profiles.length; k++){
                    if(profiles[k].id == posts[i].id){
                        stars = '';
                        for(let f = 0; f < profiles[k].stars; f++){
                            stars =  stars + `
                                <i class="fa fa-star" aria-hidden="true"></i>
                            `;
                        };
                        for(let g = 0; g < (5 - profiles[k].stars); g++){
                            stars = stars + `
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            `;
                        };
                    }
                }
    
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
                                <span class="hint-star star">
                                    ${stars}
                                </span>
                            </br>
                    
                            <p style="margin-bottom: 15px;"><i>Publicado há: ${diff} &emsp; Interessados: ${posts[i].publications[j].num_inter}</i></p>
                    
                            <p>${posts[i].publications[j].description}</p>
                    
                            <div class="control">
                                <button class="btn1" id="btn_soli_${posts[i].publications[j].id_post}" style="left: 80px; top: 18px;">
                                    <span class="price">R$ ${posts[i].publications[j].price}</span>
                                    <span class="plus"><i class="fa fa-plus" style="color: #1a66ff;" aria-hidden="true"></i></span>
                                    <span class="buy">Fazer proposta</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    if(aux == ''){
        aux = `
            <div class="containers">
                <div class="product-details">
                    <h1>Nenhum trabalho nesta categoria</h1>
                </div>
            </div>`;
    }
    
    document.getElementById('about-us').innerHTML = aux;
};

let filters = document.querySelectorAll('#myUL > li > a');
(()=>{
    for(let i=0; i < filters.length; i++) {
		filters[i].addEventListener("click", () => {
            for(let j=0; j < filters.length; j++){
                filters[j].style.backgroundColor = "#f6f6f6";
            };

			filters[i].style.backgroundColor = "#9edaf1";
		});
	}
})();