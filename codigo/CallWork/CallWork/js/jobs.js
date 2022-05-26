window.onload = ()=>{
    filter_posts();
}

function filter_posts(category = 'all'){
    aux = '';
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].posts.length; j++){
            
            if (users[i].posts[j].category == category || category == 'all'){

                //calcular qtd de estrelas
                stars = '';
                for(let f = 0; f < users[i].posts[j].stars; f++){
                    stars =  stars + `
                        <i class="fa fa-star" aria-hidden="true"></i>
                    `;
                };
                for(let g = 0; g < (5 - users[i].posts[j].stars); g++){
                    stars = stars + `
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                    `;
                };
    
                //calculando hora da publicação
                var dtPartida = users[i].posts[j].date_pub;
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
                            <h1>${users[i].posts[j].title}</h1>
                            <br>
                                <span class="hint-star star">
                                    ${stars}
                                </span>
                            </br>
                    
                            <p style="margin-bottom: 15px;"><i>Publicado há: ${diff} &emsp; Interessados: ${users[i].posts[j].num_inter}</i></p>
                    
                            <p>${users[i].posts[j].description}</p>
                    
                            <div class="control">
                                <button class="btn1" id="btn_soli_${users[i].posts[j].id_post}" style="left: 80px; top: 18px;">
                                    <span class="price">R$ ${users[i].posts[j].price}</span>
                                    <span class="plus"><i class="fa fa-plus" style="color: #1a66ff;" aria-hidden="true"></i></span>
                                    <span class="buy">Solicitar</span>
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
}