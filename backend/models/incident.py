from models.user import db
from datetime import datetime

class Incident(db.Model):

    __tablename__ = "incidents"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    api_id = db.Column(
        db.Integer,
        nullable=False
    )

    message = db.Column(
        db.String(255),
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="OPEN"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    resolved_at = db.Column(
        db.DateTime,
        nullable=True
    )