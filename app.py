from flask import Flask
from routes.index import index_routes
from config.config import SECRECT_KEY

app = Flask(__file__)
app.config["SECRECT_KEY"] = SECRECT_KEY

app.register_blueprint(index_routes)

if __name__ == "__main__":
    app.run("localhost", port=5000, debug=False)