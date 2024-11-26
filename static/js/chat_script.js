let sendMessageBtn = document.getElementById('send-message')
let mensagemUsuario = document.getElementById('user-message')


document.querySelectorAll('ul.help-topics li').forEach(topic => {
    topic.addEventListener('click', fazerPerguntaSugerida)
})
sendMessageBtn.addEventListener('click', enviarMensagem)
mensagemUsuario.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') enviarMensagem()
})

function enviarMensagem() {
    const userMessage = mensagemUsuario.value.trim()
    console.log('enviando mensagem', userMessage)

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
                'Content-Type': 'application/json'
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

function fazerPerguntaSugerida(e) {
    let perguntaSugerida = e.target
    let pergunta = perguntaSugerida.innerText
    if (mensagemUsuario.value !== '') {
        var r = confirm('Você vai perder a mensagem digitada. Continuar?')
        if (r == true) enviarPergunta()
    } else {
        enviarPergunta()
    }

    function enviarPergunta() {
        console.log('enviando pergunta')
        mensagemUsuario.value = pergunta
        console.log(mensagemUsuario.value, pergunta)
        perguntaSugerida.remove()
        enviarMensagem()
    }
}