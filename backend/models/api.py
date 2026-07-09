from datetime import datetime
from models.user import db

class API(db.Model):

    __tablename__ = "apis"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    url = db.Column(
        db.String(255),
        nullable=False
    )

    method = db.Column(
        db.String(10),
        default="GET"
    )

    check_interval = db.Column(
        db.Integer,
        default=60,
        nullable=False
    )

    timeout = db.Column(
        db.Integer,
        default=10,
        nullable=False
    )

    is_active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        nullable=False
    )