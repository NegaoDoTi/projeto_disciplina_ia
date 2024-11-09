from flask import render_template, jsonify
from external_consults.grock import consult_grock_ai

class Index:
    
    def __init__(self) -> None:
        return
    
    def index(self, req):
        return render_template("index.html")
    
    def bot(self, req):
        if req.is_json:
            data = req.get_json()
            if "message" not in data or not data["message"]:
                return jsonify({"message" : "Campo \"message\" ausente ou inválido."})
            
            grock_message = consult_grock_ai(data["message"])
            
            result = {"message" : f"{grock_message}"}
            
            return jsonify(result), 200

        else:
            result = {"message" : "Tipo de conteúdo da requisição não suportado."}
            return jsonify(result), 415
