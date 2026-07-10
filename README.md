# NexStatus

A cloud-based API Monitoring and Status Management Platform 

## Overview

NexStatus is a full-stack cloud application developed to simplify API health monitoring for developers and organizations. The platform continuously performs automated health checks on registered APIs, records response metrics, detects downtime, and provides a centralized dashboard for monitoring service availability.

The system includes secure JWT-based authentication, real-time monitoring, incident tracking, historical analytics, and visual dashboards to help users quickly identify and respond to API failures.

---

## Key Features

- Secure User Authentication using JWT
- API Registration and Management
- Automated API Health Monitoring
- Configurable Monitoring Intervals
- Response Time Measurement
- HTTP Status Code Tracking
- API Availability Monitoring (UP / DOWN / DEGRADED)
- Automatic Incident Detection
- Incident Resolution Tracking
- Search and Filter Incidents
- Dashboard Analytics
- Uptime Percentage Calculation
- Recent API Activity Monitoring
- Interactive Charts and Statistics
- User Profile & Password Management

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Recharts
- React Icons
- CSS3

### Backend

- Python
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- APScheduler
- Requests

### Database

- MySQL (Amazon RDS)

### Cloud & DevOps

- Amazon Web Services (AWS)
- Git
- GitHub

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Aishwaryakdm08/nexstatus.git
cd nexstatus
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```
---

## Deployment

The application is designed for cloud deployment using Amazon Web Services (AWS).

Deployment includes:

- Frontend Hosting
- Flask Backend Deployment
- Amazon RDS Database
- Cloud-based API Monitoring
- GitHub Version Control

---

## License

This project is licensed under the MIT License.

---

## Author

**Aishwarya Kadam**

Bachelor of Science in Computer Science

GitHub: https://github.com/Aishwaryakdm08