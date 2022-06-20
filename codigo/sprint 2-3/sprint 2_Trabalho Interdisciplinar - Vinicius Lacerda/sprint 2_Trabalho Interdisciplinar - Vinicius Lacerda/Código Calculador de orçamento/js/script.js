// Preparando os elementos DOM para ser manipulados pelo JavaScript
let hour = document.getElementById("hora_trabalho");
let hour_price = document.getElementById("valor_hora");
let total_price = document.getElementById("valor_total");
let service_price = document.getElementById("custo_servico");
let payment = document.getElementById("receber");
let hide = document.getElementById("hidden");

// A função faz com que quando a página seja carregada impeça que 
// o usuário insira algum valor no campos custo de arrecadação e no campo que informa o valor a receber
window.onload = function() {
    service_price.readOnly = true;
    payment.readOnly = true;
}


// Essa função fica "escutando" os eventos que acontece no input: Horas trabalhadas
// calcula e atualiza os campos de acordo com o valor inserido e manipula o 
// backgroundcolor e color do input e o display da mensagem em caso de erro
hour.addEventListener("keyup", ()=>{
    if (isNaN(hour.value)){
        hide.style.display = "block";
        hour.style.color = "#cf0404";
        hour.style.backgroundColor = "#f17171a2";
    }else{
        hide.style.display = "none";
        hour.style.color = "#5ca153";
        hour.style.backgroundColor = "#add8a77c";

        total_price.value = hour.value * hour_price.value;
        service_price.value = total_price.value * 0.3;
        payment.value = total_price.value - service_price.value;
    }
});

// Essa função fica "escutando" os eventos que acontece no input: Valor da Hora
// calcula e atualiza os campos de acordo com o valor inserido e manipula o 
// backgroundcolor e color do input e o display da mensagem em caso de erro
hour_price.addEventListener("keyup", ()=>{
    if (isNaN(hour_price.value)){
        hide.style.display = "block";
        hour_price.style.color = "#cf0404";
        hour_price.style.backgroundColor = "#f17171a2";
    }else{
        hide.style.display = "none";
        hour_price.style.color = "#5ca153";
        hour_price.style.backgroundColor = "#add8a77c";

        total_price.value = hour.value * hour_price.value;
        service_price.value = total_price.value * 0.3;
        payment.value = total_price.value - service_price.value;
    }
});

// Essa função fica "escutando" os eventos que acontece no input: Preço total
// calcula e atualiza os campos de acordo com o valor inserido e manipula o 
// backgroundcolor e color do input e o display da mensagem em caso de erro
total_price.addEventListener("keyup", ()=>{
    if(isNaN(total_price.value)){
        hide.style.display = "block";
        total_price.style.color = "#cf0404";
        total_price.style.backgroundColor = "#f17171a2";
    }else{
        hide.style.display = "none";
        total_price.style.color = "#5ca153";
        total_price.style.backgroundColor = "#add8a77c";
        hour.value = total_price.value / hour_price.value;
        service_price.value = total_price.value * 0.3;
        payment.value = total_price.value - service_price.value;
    }
});