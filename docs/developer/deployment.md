Deployment Guide (MySQL Edition)
Overview

This guide covers deploying Household Watch to production environments using modern DevOps practices with Docker, CI/CD pipelines, and cloud infrastructure.

🏗️ Architecture Overview
Internet → Load Balancer → Web Servers → Application Servers → MySQL Cluster
              │                              │
              └─── CDN ←───────────────────────┘

📋 Prerequisites
Required Software

Docker 20.10+

Docker Compose 2.0+

Node.js 18+

MySQL 8.0+

Redis 6.0+

Nginx 1.20+

🚀 Quick Deployment (Docker – MySQL)
Environment Configuration
# .env.production
NODE_ENV=production
PORT=5000

# MySQL Database
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=household_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=household_watch

# Redis
REDIS_URL=redis://redis:6379

# Security
JWT_SECRET=your-super-secure-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
ENCRYPTION_KEY=your-32-character-encryption-key

# External Services
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=household-watch-media

Docker Compose (MySQL)
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "5000:5000"
    env_file:
      - .env.production
    depends_on:
      - mysql
      - redis
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: household_watch
      MYSQL_USER: household_user
      MYSQL_PASSWORD: your_mysql_password
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

  redis:
    image: redis:6.0-alpine
    ports:
      - "6379:6379"
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  mysql_data:
  redis_data:

Application MySQL Connection (Node.js Example)
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

🗄️ Database Setup
# Connect to MySQL
docker exec -it household-watch-mysql mysql -u household_user -p

# Create tables
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  device_name VARCHAR(100),
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

Backup Strategy
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mysql"
S3_BUCKET="household-watch-backups"

# Create backup
mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Upload to S3
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://$S3_BUCKET/mysql/

# Cleanup old backups (7 days)
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

CI/CD Updates

Replace MongoDB service in GitHub Actions and GitLab CI with MySQL:

services:
  mysql:
    image: mysql:8.0
    ports:
      - 3306:3306
    env:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: household_watch
      MYSQL_USER: household_user
      MYSQL_PASSWORD: password


Use MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE in test and build steps.

Environment Variables for Production
export NODE_ENV=production
export PORT=5000
export MYSQL_HOST=mysql
export MYSQL_PORT=3306
export MYSQL_USER=household_user
export MYSQL_PASSWORD=your_mysql_password
export MYSQL_DATABASE=household_watch
export REDIS_URL=redis://redis:6379
export JWT_SECRET=your-jwt-secret
export JWT_REFRESH_SECRET=your-refresh-secret
export ENCRYPTION_KEY=your-32-character-key

Rollback Procedures (MySQL)
# Restore database
gunzip < /backups/mysql/backup_PREVIOUS.sql.gz | mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE


