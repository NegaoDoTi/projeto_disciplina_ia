from flask import Blueprint, request, jsonify, Response
from controllers.IndexController import Index

index_routes = Blueprint("index_routes", __name__, template_folder="templates", url_prefix="/")

@index_routes.route("", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return Index().index(request)
    if request.method == "POST":
        return Index().bot(request)