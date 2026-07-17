from flask import Flask
from config import Config
from models.user import db
from routes.auth import auth_bp
from routes.api_routes import api_bp
from flask_jwt_extended import JWTManager
from models.api import API
from models.api_check import APICheck 
from routes.monitor import monitor_bp
from models.incident import Incident
from routes.dashboard import dashboard_bp
from scheduler import start_scheduler
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.url_map.strict_slashes = False

CORS(
    app
)

app.config.from_object(Config)

jwt = JWTManager(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)
app.register_blueprint(
    api_bp,
    url_prefix="/api/apis"
)
app.register_blueprint(
    monitor_bp,
    url_prefix="/api/monitor"
)
app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
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

# start_scheduler(app)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
