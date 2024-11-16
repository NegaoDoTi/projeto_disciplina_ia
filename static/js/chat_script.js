document.getElementById('send-message').addEventListener('click', enviarMensagem)
document.getElementById('user-message').addEventListener('keypress', function(e) {
    if (e.key == 'Enter') enviarMensagem()
})

function enviarMensagem() {
    const userMessage = document.getElementById('user-message').value.trim()

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
    
    // Substitui ~~texto~~ por <b>texto</b>
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