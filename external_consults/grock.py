from requests import post
from os import getenv
from json import dumps

def consult_grock_ai(message:str) -> str:
    """
    Fun o que realiza uma consulta a intelig ncia artificial do GROCK,
    para que a mesma possa responder a duvida passada por par metro.

    Args:
        message (str): a duvida que deve ser respondida.

    Returns:
        str: a resposta  duvida.
    """
    try:
        body = {
            "messages" : [
                {
                    "role" : "system",
                    "content" : "Você é um assistente que tira duvidas sobre doação de sangue no Brasil, apenas deve responder duvidas sobre esse assunto nada mais! Caso perguntarem seu nome você deve responder Fire Force AI"
                },
                {
                    "role" : "user",
                    "content" : f"{message}"
                }
            ],
            "model" : "grok-beta",
            "stream" : False,
            "temperature" : 0
        }
        header = {
            "Content-Type" : "application/json",
            "Authorization" : f'Bearer {getenv("GROCK_API_KEY")}'
        }
        
        result = post("https://api.x.ai/v1/chat/completions", data=dumps(body), headers=header)
        
        if result.status_code != 200:
            return "Erro! Bot indisponível, tente novamente mais tarde!"
        
        data = result.json()
        
        return data["choices"][0]["message"]["content"]

    except Exception:

        return "Erro inesperado! Bot indisponível, tente novamente mais tarde!"
