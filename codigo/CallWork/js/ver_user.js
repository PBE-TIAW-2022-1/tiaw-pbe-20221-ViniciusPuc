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
                        <li><input type="text" placeholder="Buscar serviços" name="search" id="search" style="width: 320px; height: 40px;"></li>
                        <button type="submit" id="btn_search" style="width: 50px; height: 40px;"><i class="fa fa-search"></i></button></input>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="servicos.html">Serviços</a></li>
                        <li><a href="${user_url}"><button class="button button5"><img src="assets/img/request.png" width="30px" height="30px"></button></a></li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
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
                        <li><input type="text" placeholder="Buscar serviços" name="search" id="search" style="width: 320px; height: 40px;"></li>
                        <button type="submit" id="btn_search" style="width: 50px; height: 40px;"><i class="fa fa-search"></i></button></input>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="cadastro.html">Cadastrar</a></li>
                        <li><a href="sobre.html">Sobre</a></li>
                        <li><a href="servicos.html">Serviços</a></li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                <!-- Navbar -->
        </div>
        `;
    }
    document.getElementById('header').innerHTML = new_header;
}