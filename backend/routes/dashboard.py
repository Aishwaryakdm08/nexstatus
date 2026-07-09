from flask import Blueprint, jsonify
from models.api import API
from models.incident import Incident
from models.api_check import APICheck
from sqlalchemy import func
from models.user import db
from flask_jwt_extended import jwt_required, get_jwt_identity

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)
@dashboard_bp.route("/summary")
@jwt_required()
def dashboard_summary():

    current_user = int(get_jwt_identity())

    total_apis = API.query.filter_by(
    user_id=current_user
    ).count()

    up = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(
        API.user_id == current_user,
        APICheck.status == "UP"
    )
    .count()
)

    down = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(
        API.user_id == current_user,
        APICheck.status == "DOWN"
    )
    .count()
)

    open_incidents = (
    Incident.query
    .join(API, Incident.api_id == API.id)
    .filter(
        API.user_id == current_user,
        Incident.status == "OPEN"
    )
    .count()
)

    return jsonify({
        "total_apis": total_apis,
        "up_checks": up,
        "down_checks": down,
        "open_incidents": open_incidents
    })

@dashboard_bp.route("/recent-checks")
@jwt_required()
def recent_checks():

    current_user = int(get_jwt_identity())

    checks = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(API.user_id == current_user)
    .order_by(APICheck.checked_at.desc())
    .limit(10)
    .all()
)

    data = []

    for check in checks:

        api = API.query.get(check.api_id)

        data.append({

            "api_name": api.name,

            "status": check.status,

            "status_code": check.status_code,

            "response_time_ms": round(
                check.response_time,
                2
            ),

            "checked_at": check.checked_at

        })

    return jsonify(data)

@dashboard_bp.route("/incidents")
@jwt_required()
def incident_history():

    current_user = int(get_jwt_identity())
    
    incidents = (
    Incident.query
    .join(API, Incident.api_id == API.id)
    .filter(API.user_id == current_user)
    .order_by(Incident.created_at.desc())
    .all()
)
    data = []

    for incident in incidents:

        api = API.query.get(incident.api_id)

        data.append({

            "api_name": api.name,

            "message": incident.message,

            "status": incident.status,

            "created_at": incident.created_at,

            "resolved_at": incident.resolved_at

        })

    return jsonify(data)

@dashboard_bp.route("/statistics")
@jwt_required()
def dashboard_statistics():

    current_user = int(get_jwt_identity())

    total_checks = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(API.user_id == current_user)
    .count()
)

    successful_checks = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(
        API.user_id == current_user,
        APICheck.status == "UP"
    )
    .count()
)

    failed_checks = (
    APICheck.query
    .join(API, APICheck.api_id == API.id)
    .filter(
        API.user_id == current_user,
        APICheck.status == "DOWN"
    )
    .count()
)

    average_response_time = (
    db.session.query(func.avg(APICheck.response_time))
    .join(API, APICheck.api_id == API.id)
    .filter(API.user_id == current_user)
    .scalar()
)

    uptime = 0

    if total_checks > 0:
        uptime = (
            successful_checks / total_checks
        ) * 100

    return jsonify({

        "total_checks": total_checks,

        "successful_checks": successful_checks,

        "failed_checks": failed_checks,

        "average_response_time": round(
            average_response_time or 0,
            2
        ),

        "uptime_percentage": round(
            uptime,
            2
        )

    })

@dashboard_bp.route("/chart/response-time")
@jwt_required()
def response_time_chart():

    current_user = int(get_jwt_identity())

    checks = (
        APICheck.query
        .join(API, APICheck.api_id == API.id)
        .filter(API.user_id == current_user)
        .order_by(APICheck.checked_at.asc())
        .limit(30)
        .all()
    )

    data = []

    for check in checks:

        data.append({

            "time": check.checked_at.strftime("%H:%M"),

            "response_time": round(
                check.response_time,
                2
            )

        })

    return jsonify(data)

@dashboard_bp.route("/chart/status")
@jwt_required()
def status_distribution():

    current_user = int(get_jwt_identity())

    up = (
        APICheck.query
        .join(API, APICheck.api_id == API.id)
        .filter(
            API.user_id == current_user,
            APICheck.status == "UP"
        )
        .count()
    )

    down = (
        APICheck.query
        .join(API, APICheck.api_id == API.id)
        .filter(
            API.user_id == current_user,
            APICheck.status == "DOWN"
        )
        .count()
    )

    return jsonify({

        "up": up,

        "down": down

    })

@dashboard_bp.route("/chart/incidents")
@jwt_required()
def incident_chart():

    current_user = int(get_jwt_identity())

    incidents = (

        db.session.query(

            func.date(Incident.created_at),

            func.count(Incident.id)

        )

        .join(API, Incident.api_id == API.id)

        .filter(API.user_id == current_user)

        .group_by(func.date(Incident.created_at))

        .order_by(func.date(Incident.created_at))

        .all()

    )

    data = []

    for date, count in incidents:

        data.append({

            "date": str(date),

            "count": count

        })

    return jsonify(data)