import requests
import time
from datetime import datetime

from models.api_check import APICheck
from models.incident import Incident
from models.api import API
from models.user import db

def check_api(api):

    start_time = time.time()

    try:
        response = requests.get(
            api.url,
            timeout=10,
            allow_redirects=True,
            headers={
                "User-Agent": "NexStatus-Monitor/1.0"
            }
        )

        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        status_code = response.status_code

        # STATUS DECISION LOGIC # 

        if 200 <= status_code < 400:

            status = "UP"
            error_message = None


        elif 400 <= status_code < 500:

            # API reachable but request rejected

            status = "DEGRADED"
            error_message = (
                f"Client Error: HTTP {status_code}"
            )


        elif 500 <= status_code <= 599:

            # Server failure

            status = "DOWN"
            error_message = (
                f"Server Error: HTTP {status_code}"
            )


        else:

            status = "UNKNOWN"
            error_message = (
                f"Unexpected HTTP {status_code}"
            )

        # Save API Check Result

        api_check = APICheck(

            api_id=api.id,
            status=status,
            status_code=status_code,
            response_time=response_time,
            checked_at=datetime.utcnow(),
            error_message=error_message

        )

        db.session.add(api_check)

        # Create Incident if API is DOWN

        if status == "DOWN":

            incident = Incident(

                api_id=api.id,
                title="API Downtime Detected",

                description=(
                    f"{api.name} is DOWN. "
                    f"Reason: {error_message}"
                ),

                severity="HIGH",
                created_at=datetime.utcnow()

            )

            db.session.add(incident)

        db.session.commit()

        return {

            "api": api.name,

            "status": status,

            "code": status_code,

            "response_time": response_time,

            "error": error_message

        }

    except requests.exceptions.Timeout:

        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        save_failure(
            api,
            "Request Timeout",
            response_time
        )

        return {

            "api": api.name,

            "status": "DOWN",

            "code": None,

            "response_time": response_time,

            "error": "Timeout"

        }

    except requests.exceptions.ConnectionError:


        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        save_failure(
            api,
            "Connection Failed",
            response_time
        )

        return {

            "api": api.name,

            "status": "DOWN",

            "code": None,

            "response_time": response_time,

            "error": "Connection Error"

        }

    except Exception as e:

        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        save_failure(
            api,
            str(e),
            response_time
        )

        return {

            "api": api.name,

            "status": "DOWN",

            "code": None,

            "response_time": response_time,

            "error": str(e)

        }

def save_failure(api, error, response_time):

    api_check = APICheck(

        api_id=api.id,

        status="DOWN",

        status_code=None,

        response_time=response_time,

        checked_at=datetime.utcnow(),

        error_message=error

    )

    db.session.add(api_check)

    incident = Incident(

        api_id=api.id,

        title="API Failure",

        description=error,

        severity="HIGH",

        created_at=datetime.utcnow()

    )

    db.session.add(incident)

    db.session.commit()