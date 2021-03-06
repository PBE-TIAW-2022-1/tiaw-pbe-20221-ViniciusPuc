window.onload = ()=>{
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    usuarioCorrente = JSON.parse (usuarioCorrenteJSON);

    if (usuarioCorrenteJSON != '{}') {
        if (usuarioCorrente.login == 'admin'){
            user_url = 'admin.html';
        }else{
            user_url = 'profile.html';
        }

        new_header = `
            <div class="container d-flex justify-content-between">
                <div class="logo">
                    <a href="index.html"><img src="assets/img/logo-header.png" width="52px" height="270px"></a>
                </div>
                <!-- Navbar -->
                <nav id="navbar" class="navbar">
                    <ul>
                        <li>
                            <form action="search.html">
                                <input type="text" id="search" placeholder="Buscar serviços" name="search" style="width: 320px; height: 40px;"></input>
                                <button type="submit" onsubmit="searchData()" id="btn_search" style="width: 50px; height: 40px;"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="servicos.html">Serviços</a></li>
                        <li><a href="${user_url}"><button class="button button5"><img src="assets/img/request.png" width="30px" height="30px"></button></a></li>
                    </ul>
                    <i onclick="mobile()" class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                <!-- Navbar -->
            </div>
        `;

    }else{
        new_header = `
            <div class="container d-flex justify-content-between">
                <div class="logo">
                    <a href="index.html"><img src="assets/img/logo-header.png" width="52px" height="270px"></a>
                </div>
                <!-- Navbar -->
                <nav id="navbar" class="navbar">
                    <ul>
                        <li>
                            <form action="search.html">
                                <input type="text" id="search" placeholder="Buscar serviços" name="search" style="width: 320px; height: 40px;"></input>
                                <button type="submit" onsubmit="searchData()" id="btn_search" style="width: 50px; height: 40px;"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="cadastro.html">Cadastrar</a></li>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="servicos.html">Serviços</a></li>
                    </ul>
                    <i onclick="mobile()" class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                <!-- Navbar -->
            </div>
        `;
    }
    document.querySelector('.header').innerHTML = new_header;
}

function mobile(){
    let btn = document.querySelector('.mobile-nav-toggle');
    
    document.querySelector('#navbar').classList.toggle('navbar-mobile');
    btn.classList.toggle('bi-list');
    btn.classList.toggle('bi-x');
}