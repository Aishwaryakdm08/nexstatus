from models.user import db
from datetime import datetime


class APICheck(db.Model):

    __tablename__ = "api_checks"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    api_id = db.Column(
        db.Integer,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False
    )

    status_code = db.Column(
        db.Integer
    )

    response_time = db.Column(
        db.Float
    )

    error_message = db.Column(
        db.String(255)
    )

    checked_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )