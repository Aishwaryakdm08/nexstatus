from flask import Blueprint, request, jsonify
from models.user import User, db
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "message": "Email already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    new_user = User(
        username=username,
        email=email,
        password=hashed_password.decode("utf-8")
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return jsonify({
            "message": "Invalid password"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    current_user = int(get_jwt_identity())

    user = User.query.get(current_user)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({

        "username": user.username,

        "email": user.email

    }), 200

@auth_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    current_user = int(get_jwt_identity())

    data = request.get_json()

    current_password = data.get("current_password")
    new_password = data.get("new_password")

    user = User.query.get(current_user)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    if not bcrypt.checkpw(
        current_password.encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return jsonify({
            "message": "Current password is incorrect"
        }), 401

    hashed_password = bcrypt.hashpw(
        new_password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user.password = hashed_password.decode("utf-8")

    db.session.commit()

    return jsonify({
        "message": "Password updated successfully"
    }), 200