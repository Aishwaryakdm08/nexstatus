from flask import Flask
from config import Config
from models.user import db
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager

import os
from dotenv import load_dotenv

load_dotenv()

print("USER =", os.getenv("DB_USER"))
print("HOST =", os.getenv("DB_HOST"))
print("PORT =", os.getenv("DB_PORT"))
print("DB =", os.getenv("DB_NAME"))
print("PASSWORD =", os.getenv("DB_PASSWORD"))

app = Flask(__name__)

app.config.from_object(Config)

jwt = JWTManager(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

db.init_app(app)

@app.route("/")
def home():
    return {
        "project": "NexStatus",
        "status": "Running"
    }

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)