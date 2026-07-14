from app import app
from scheduler import start_scheduler
import time

if __name__ == "__main__":
    start_scheduler(app)

    print("NexStatus Scheduler started...")

    while True:
        time.sleep(60)
