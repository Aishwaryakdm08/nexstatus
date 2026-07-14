from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

from models.api import API
from services.monitor_service import check_api

scheduler = BackgroundScheduler()


def monitor_all_apis():

    print("Running automatic monitoring...")

    apis = API.query.filter_by(is_active=True).all()

    now = datetime.utcnow()

    for api in apis:

        if api.last_checked is None:

            print(f"Checking {api.name} (first run)")

            check_api(api)

            continue

        elapsed = (now - api.last_checked).total_seconds()

        if elapsed >= api.check_interval:

            print(f"Checking {api.name}")

            check_api(api)

        else:

            print(
                f"Skipping {api.name} "
                f"({int(elapsed)}/{api.check_interval}s)"
            )



def start_scheduler(app):

    scheduler.add_job(
        func=lambda: run_with_context(app),
        trigger="interval",
        seconds=15
    )

    scheduler.start()

    print("Scheduler started successfully.")


def run_with_context(app):

    with app.app_context():

        monitor_all_apis()
