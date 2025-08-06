let sendMessageBtn = document.getElementById('send-message')
let mensagemUsuario = document.getElementById('user-message')
let crsfToken = document.getElementById('csrf-token')


document.querySelectorAll('ul.help-topics li').forEach(topic => {
    topic.addEventListener('click', fazerPerguntaSugerida)
})
sendMessageBtn.addEventListener('click', enviarMensagem)
mensagemUsuario.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') enviarMensagem()
})

/**
 * Envia a mensagem digitada pelo usu rio para o servidor
 * e atualiza o chat com a resposta.
 * @fires fetch
 * @listens mensagemUsuario#keypress
 * @listens sendMessageBtn#click
 */
function enviarMensagem() {
    const userMessage = mensagemUsuario.value.trim()
    console.log('enviando mensagem', userMessage)

    const csrfTokenValue = crsfToken.value.trim()

    if (userMessage !== "") {
        const chatBox = document.getElementById('chat-box')
        chatBox.innerHTML += gerarTexto('user', userMessage)
        
        document.getElementById('user-message').value = ''

        var carregando = document.createElement('div')
        carregando.classList.add('carregando', 'message', 'bot-message')
        carregando.innerHTML = `<span class="ponto">.</span>
                                <span class="ponto">.</span>
                                <span class="ponto">.</span>`

        chatBox.appendChild(carregando)

        chatBox.scrollTop = chatBox.scrollHeight

        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken" : `${csrfTokenValue}`
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            carregando.remove()
            chatBox.innerHTML += gerarTexto('bot', formatarTexto(data.message))
            
            chatBox.scrollTop = chatBox.scrollHeight
        })
        .catch(error => {
            chatBox.innerHTML += gerarTexto('bot', 'erro')
            chatBox.scrollTop = chatBox.scrollHeight
            console.error('Erro ao enviar a mensagem:', error)
        });
    }
}


/**
 * Formata um texto Markdown para HTML.
 * 
 * Substitui:
 *  - Quebras de linha (\n) por <br>
 *  - ***texto*** por <b><i>texto</i></b>
 *  - **texto** por <b>texto</b>
 *  - *texto* por <i>texto</i>
 *  - ~~texto~~ por 
**/
function formatarTexto(input) {
    // Substitui quebras de linha por <br>
    let resultado = input.replace(/\n/g, '<br>');

    // Substitui ***texto*** por <b><i>texto</i></b>
    resultado = resultado.replace(/\*\*\*(.*?)\*\*\*/g, '<i><b>$1</b></i>');
    
    // Substitui **texto** por <b>texto</b>
    resultado = resultado.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Substitui *texto* por <i>texto</i>
    resultado = resultado.replace(/\*(.*?)\*/g, '<i>$1</i>');
    
    // Substitui ~~texto~~ por <s>texto</s>
    resultado = resultado.replace(/\~\~(.*?)\~\~/g, '<s>$1</s>');
    
    return resultado;
}

/**
 * Gera o HTML para uma mensagem do chat.
 * 
 * @param {string} classe - A classe CSS para a mensagem (user ou bot).
 * @param {string} mensagem - O texto da mensagem.
 * @returns {string} O HTML da mensagem.
 */
function gerarTexto(classe, mensagem) {
    mensagem = mensagem

    if (classe == 'user') {
        origem = 'Você'
    } else {
        origem = 'Fire Force IA'
    }

    if (mensagem == 'erro') {
        mensagem = 'Erro ao enviar a mensagem. Tente novamente.'
    }

    return `<div class="message ${classe}-message"><h6>${origem}</h6><p>${mensagem}</p></div>`
}

/**
 * Fun o chamada ao clicar em uma pergunta sugerida na lista.
 * 
 * Verifica se o usu rio j  digitou alguma mensagem e se sim, pergunta se ele
 * deseja continuar e perder a mensagem digitada. Se sim, a mensagem digitada
 *   substitu da pela pergunta sugerida e a mensagem   enviada.
 * 
 * @param {Event} e - O evento de clique na pergunta sugerida.
 */
function fazerPerguntaSugerida(e) {
    let perguntaSugerida = e.target
    let pergunta = perguntaSugerida.innerText
    if (mensagemUsuario.value !== '') {
        var r = confirm('Você vai perder a mensagem digitada. Continuar?')
        if (r == true) enviarPergunta()
    } else {
        enviarPergunta()
    }

    /**
     * Fun o chamada quando se clica em uma pergunta sugerida.
     * Envia a pergunta para o servidor e remove a pergunta da lista.
     * 
     * @private
     */
    function enviarPergunta() {
        console.log('enviando pergunta')
        mensagemUsuario.value = pergunta
        console.log(mensagemUsuario.value, pergunta)
        perguntaSugerida.remove()
        enviarMensagem()
    }
}