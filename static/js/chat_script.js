document.getElementById('send-message').addEventListener('click', function() {
    const userMessage = document.getElementById('user-message').value.trim()

    if (userMessage !== "") {
        const chatBox = document.getElementById('chat-box')
        chatBox.innerHTML += `<div class="message user-message bg-info"><h6 class="m-3">Você</h6> <p class="m-3">${userMessage}</p></div>`
        
        document.getElementById('user-message').value = ''

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
            chatBox.innerHTML += `<div class="message bot-message bg-light"><h6 class="m-3">Fire Force IA</h6> <p class="m-3">${data.message}</p></div>`
            
            chatBox.scrollTop = chatBox.scrollHeight
        })
        .catch(error => {
            chatBox.innerHTML += `<div class="message bot-message bg-light"><h6 class="m-3">Fire Force IA</h6> <p class="m-3">Erro ao enviar a mensagem. Tente novamente.</p></div>`
            chatBox.scrollTop = chatBox.scrollHeight
            console.error('Erro ao enviar a mensagem:', error)
        });
    }
})
