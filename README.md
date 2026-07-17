# NexStatus

A Cloud-Based API Monitoring and Status Management Platform

---

# Overview

NexStatus is a production-ready full-stack cloud application designed to monitor the availability and performance of REST APIs. It continuously performs automated health checks on registered APIs, records response metrics, detects service outages, and provides a centralized dashboard for monitoring API health in real time.

The platform features secure JWT-based authentication, configurable monitoring intervals, automated incident detection, uptime analytics, and historical monitoring logs. The application is deployed on Amazon Web Services (AWS) with a complete production setup using Nginx, Gunicorn, HTTPS, Terraform, and GitHub Actions CI/CD.

---

# Key Features

### Authentication & User Management

- Secure JWT Authentication
- User Registration & Login
- Profile Management
- Password Update

### API Monitoring

- Register and Manage APIs
- Automated API Health Checks
- Configurable Monitoring Intervals
- HTTP Status Code Monitoring
- Response Time Measurement
- API Availability Tracking
- API Status (UP / DOWN / DEGRADED)

### Incident Management

- Automatic Incident Detection
- Incident Resolution Tracking
- Incident History
- Search & Filter Incidents

### Analytics Dashboard

- API Uptime Percentage
- Average Response Time
- Recent Monitoring Activity
- Interactive Charts & Statistics
- Monitoring History

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Recharts
- React Icons
- CSS3

## Backend

- Python
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- APScheduler
- Requests

## Database

- MySQL
- Amazon RDS

## Cloud & Infrastructure

- Amazon EC2
- Amazon RDS
- IAM
- CloudWatch
- Security Groups

## DevOps

- Terraform
- Git
- GitHub
- GitHub Actions (CI/CD)
- Nginx
- Gunicorn
- Let's Encrypt SSL
- DuckDNS

---



# Installation

## Clone Repository

```bash
git clone https://github.com/Aishwaryakdm08/nexstatus.git

cd nexstatus
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate      # Linux

pip install -r requirements.txt

python app.py
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Production Deployment

The application is deployed on Amazon Web Services (AWS).

Production infrastructure includes:

- Amazon EC2
- Amazon RDS (MySQL)
- Nginx Reverse Proxy
- Gunicorn WSGI Server
- HTTPS using Let's Encrypt
- DuckDNS Domain
- GitHub Actions CI/CD
- Terraform Infrastructure as Code
- CloudWatch Monitoring
- IAM Role-based Access

---

