from flask import Flask
from dotenv import load_dotenv
from os import getenv
from routes.index import index_routes

load_dotenv()

app = Flask(__file__)
app.config["ENV"] = getenv("FLASK_ENV")
app.config["SECRECT_KEY"] = getenv("SECRECT_KEY")

app.register_blueprint(index_routes)

if __name__ == "__main__":
    app.run("localhost", port=5000, debug=False)