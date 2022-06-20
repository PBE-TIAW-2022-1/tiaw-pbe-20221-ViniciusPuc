Neste documento contém informações sobre o plano de testes

Ao abrir a tela de login, ha apenas 3 cenários possíveis
1 - o usuário fornecer dados corretos para que o login seja efetuado (dados ja presentes no localstorage ou dados que 
tenham sido adicionados pelo registro de usuários) - Resultado: login efetuado com sucesso

2 - o usuário fornecer dados incorretos para que o login seja efetuado (dados não presentes no localstorage) - Resuntado: Login não é efetuado

3 - o usuário solicitar o registro, o qual após ser realizado ira adicionar as innformações de login e senha no localstorage
tornando aqueles dados validos para futuro login. - Resultado: O cadastro é realizado e as informações para login são armazenadas

