# ForcaBot
Este é um bot de Discord para se jogar forca!

## Como utilizá-lo:
1. Primeiro atualize o ***config.json***:
    * Configure o prefixo dos comandos que o bot aceita;
    * Configure o token do bot, que se encontra no painel de desenvolvedor do Discord.
2. Adicione o bot no seu servidor preenchendo o seguinte link:
    * https://discord.com/oauth2/authorize?client_id= **preencha aqui o client_id do bot e retire os espaços** &scope=bot&permissions=8
3. Execute o arquivo ***bot.js*** em um terminal node.js.

## Comandos:
* Para se utilizar os comandos, é necessário acessar um chat no qual o bot possa ler as mensagens, digitar o prefixo definido anteriormente, em seguida espaço e um dos comandos listados abaixo. Caso o comando precise de parâmetros, digite-os após um espaço.
1. **ping**
    * Exibe qual o tempo de delay de resposta o bot está levando. _Não necessáriamente o ping de conexão do bot com o servidor_.
2. **jogar**
    * Cria um novo jogo, no qual somente é permitido um jogo por servidor.
    * Assim que um jogo é criado, o Bot te manda uma mensagem privada solicitando a palavra que deve ser jogada.
    * Ao respondê-lo com a palavra, ele solicita a dica (categoria) para indicar aos jogadores a palavra.
3. **chutar *palavra/letra***
    * **Precisa de um parâmetro**
    * Executa um chute de uma palavra ou letra no jogo.
    * **Cuidado!** Se você chutar uma palavra, o jogo encerra, mesmo que você tenha errado!
4. **ajuda**
    * Te envia para esta página, onde pode conferir tudo sobre o bot!
