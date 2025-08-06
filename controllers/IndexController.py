from flask import render_template, jsonify
from external_consults.grock import consult_grock_ai
from flask_wtf.csrf import validate_csrf, CSRFError

class Index:
    
    def __init__(self) -> None:
        """
        Initializes an instance of the Index class.
        """
        return
    
    def index(self, req):
        """
        Renderiza a página inicial do site, que contém um pdf em uma tag
        <embed> e um chatbot que utiliza a IA do Grock.
        
        Parameters
        ----------
        req : flask.Request
            O objeto request da requisi o.
        
        Returns
        -------
        flask.Response
            A resposta da requisi o, que  o template da p gina inicial.
        """
        return render_template("index.html")
    
    def bot(self, req):
        """
        Recebe uma mensagem do chat e retorna uma resposta da IA do Grock.

        Parameters
        ----------
        req : flask.Request
            O objeto request da requisi o.

        Returns
        -------
        flask.Response
            A resposta da requisi o, em formato JSON, com a chave "message" e
            valor a resposta da IA do Grock. Caso a requisi o seja inv lida,
            retorna um status 400 e uma mensagem de erro. Se o tipo de conte do
            da requisi o for diferente de JSON, retorna um status 415 e uma
            mensagem de erro.
        """
        if req.is_json:
            try:
                csrf_token = req.headers.get("X-CSRFToken")
            except:
                result = {"message" : "CSRF Token não fornecido!"}
                return jsonify(result), 401
            
            data = req.get_json()
            if "message" not in data or not data["message"]:
                return jsonify({"message" : 'Campo "message" ausente ou inválido.'}), 400
            
            try:
                validate_csrf(csrf_token)
            except CSRFError:
                result = {"message" : "Proteção contra cross site scripting, forneça o token correto para conseguir realiar esta operação"}
                return jsonify(result), 401
                
            grock_message = consult_grock_ai(data["message"])
            
            result = {"message" : f"{grock_message}"}
            
            return jsonify(result), 200

        else:
            result = {"message" : "Tipo de conteúdo da requisição não suportado."}
            return jsonify(result), 415
