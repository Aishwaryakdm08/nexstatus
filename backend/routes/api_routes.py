from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.api import API
from models.user import db

api_bp = Blueprint("api", __name__)


@api_bp.route("/", methods=["POST"])
@jwt_required()
def add_api():

    data = request.get_json()

    current_user = get_jwt_identity()

    name = data.get("name")
    url = data.get("url")
    method = data.get("method", "GET")
    interval = data.get("check_interval", 60)

    new_api = API(
        name=name,
        url=url,
        method=method,
        check_interval=interval,
        user_id=current_user
        )

    db.session.add(new_api)
    db.session.commit()

    return jsonify({
        "message": "API added successfully"
    }), 201

@api_bp.route("/", methods=["GET"])
@jwt_required()
def get_apis():

    current_user = get_jwt_identity()

    apis = API.query.filter_by(
        user_id=current_user
    ).all()

    result = []

    for api in apis:
     result.append({
        "id": api.id,
        "name": api.name,
        "url": api.url,
        "method": api.method,
        "check_interval": api.check_interval
    })
    return jsonify(result), 200

@api_bp.route("/<int:api_id>", methods=["PUT"])
@jwt_required()
def update_api(api_id):

    current_user = get_jwt_identity()

    api = API.query.filter_by(
        id=api_id,
        user_id=current_user
    ).first()

    if not api:
        return jsonify({
            "message": "API not found"
        }), 404

    data = request.get_json()

    api.name = data.get("name", api.name)
    api.url = data.get("url", api.url)
    api.method = data.get("method", api.method)
    api.check_interval = data.get(
         "check_interval",
         api.check_interval
         )

    db.session.commit()

    return jsonify({
        "message": "API updated successfully"
    }), 200

@api_bp.route("/<int:api_id>", methods=["DELETE"])
@jwt_required()
def delete_api(api_id):

    current_user = get_jwt_identity()

    api = API.query.filter_by(
        id=api_id,
        user_id=current_user
    ).first()

    if not api:
        return jsonify({
            "message": "API not found"
        }), 404

    db.session.delete(api)
    db.session.commit()

    return jsonify({
        "message": "API deleted successfully"
    }), 200