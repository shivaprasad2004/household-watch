# Household Watch – Security Guidelines

## 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Passwords hashed with bcrypt
- Token expiration + refresh flow

---

## 🔒 Database Security (MySQL)
- Use **parameterized queries** (SQL injection prevention)
- Enable SSL/TLS for DB connections
- Principle of Least Privilege (POLP) on DB users
- Enable MySQL audit logging

---

## 🌐 API Security
- HTTPS-only communication
- Rate limiting + request throttling
- Input validation & sanitization
- CORS configured per environment

---

## 📦 Data Protection
- Encrypt sensitive fields at rest (AES-256)
- Secure key management via environment variables
- Logs exclude sensitive data
- Regular data backups + restore testing

---

## 🛡️ Infrastructure
- Use WAF (Web Application Firewall)
- Regular patching of Node.js, MySQL, dependencies
- Docker image scanning
- Secrets in `.env`, never in Git

---

## 🚨 Security Monitoring
- Brute-force login detection
- Suspicious query monitoring
- Audit trail for user actions
- Alerts on abnormal DB activity
