from apscheduler.schedulers.background import BackgroundScheduler

from models.api import API
from services.monitor_service import check_api

scheduler = BackgroundScheduler()


def monitor_all_apis():

    print("Running automatic monitoring...")

    apis = API.query.all()

    for api in apis:

        print(f"Checking: {api.name}")

        check_api(api)


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