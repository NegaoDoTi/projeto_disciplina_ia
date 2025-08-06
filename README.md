# projeto_disciplina_ia

Um Web Site sobre doação de sangue, com uma IA integrada para auxiliar nas duvidas

# Requisitos

Deve ter instalado Python 3.10 no sistema operacional seja Linux ou Windows.

# Como instalar as dependencias do projeto

Windows

    1. Abra o CMD dentro da pasta do projeto.
    2. Já com o Python instaldo execute o comando: "pip install pipenv"
    3. Ainda no CMD para ativação do ambiente virtual você deve digitar o comando: "pipenv shell" ou
    "python -m pipenv shell".
    4. Dentro do ambiente virtual que irá aparecer como (projeto_disciplina_ia) para instalar todas as
    dependencias do projeto você deve executar o seguinte comando: "pipenv install".
    OBS: caso a lib pipenv não seja encontrada dentro ambiente virtual você deve executar o comando 2
    novamente so que desta vez dentro do ambiente virutal e só após isto executar novamente o comando:
    "pipenv install".

Linux

    1. Abra o Terminal dentro da pasta do projeto.
    2. já com o Python instaldo execute o comando: "pip3 install pipenv".
    3. Ainda no terminal para ativação do ambiente virtual você deve digitar o comando: "pipenv shell".
    4. Dentro do ambiente virtual que irá aparecer como (projeto_disciplina_ia) para instalar todas as
    dependencias do projeto você deve executar o seguinte comando: "pipenv install".

# Como instalar docker

    Requisitos:
        Deve ter instalado Docker no sistema.

    1. Abra o terminal dentro da pasta do projeto.
    2. Já com docker instalado execute o comando: "docker build -t projeto_ia"

# Como executar o projeto

1. Dentro da pasta do projeto já com todas dependencias instaladas.
2. Abra terminal dentro da pasta do projeto.
3. Você deve ativar o ambiente virtual utilizando o comando: "pipenv shell".
4. Agora para iniciar você utilizar o seguinte comando: "pipenv run python app.py".

# Como executar o projeto no docker

1. Dentro da pasta do projeto já com todas dependencias instaladas.
2. Abra terminal dentro da pasta do projeto.
3. Execute os seguintes comandos: "docker run -d -p 5000:5000 projeto_ia
