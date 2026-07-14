from flask import Blueprint, jsonify
from models.api import API
from services.monitor_service import check_api

monitor_bp = Blueprint(
    "monitor",
    __name__
)

@monitor_bp.route("/check/<int:api_id>")
def check_api_route(api_id):

    api = API.query.get(api_id)

    if not api:
        return jsonify({
            "message": "API not found"
        }), 404

    result = check_api(api)

    if result["status"] == "UP":
        return jsonify(result)

    return jsonify(result), 500