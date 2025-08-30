# Household Watch 

# Household Watch 🏠⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%3E%3D18.0.0-blue)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![GDPR Compliant](https://img.shields.io/badge/GDPR-compliant-green)](https://gdpr.eu/)

A comprehensive IoT-based energy monitoring system for households that provides real-time energy consumption tracking, cost analysis, and energy efficiency insights while maintaining GDPR compliance and robust security.

## 🚀 Features

- **Real-time Energy Monitoring**: Live tracking of voltage, current, and power consumption
- **Smart Analytics**: Energy trends, usage patterns, and cost projections
- **Privacy-First**: GDPR-compliant data handling with explicit user consent
- **Secure by Design**: AES encryption, JWT authentication, and secure API endpoints
- **Scalable Architecture**: Microservices-ready with Docker containerization
- **Open Source**: MIT licensed for community contributions

## 📋 Table of Contents

- [System Architecture](#-system-architecture)
- [Hardware Requirements](#-hardware-requirements)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Frontend Components](#-frontend-components)
- [Security & Privacy](#-security--privacy)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🏗 System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   IoT Devices   │───▶│   Backend API    │───▶│  React Frontend │
│                 │    │                  │    │                 │
│ • Arduino/RPi   │    │ • Node.js/Express│    │ • Dashboard     │
│ • Sensors       │    │ • MySQL Database │    │ • Analytics     │
│ • ESP8266 WiFi  │    │ • JWT Auth       │    │ • User Settings │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   Data Storage   │
                       │                  │
                       │ • Energy Metrics │
                       │ • User Data      │
                       │ • Consent Logs   │
                       └──────────────────┘
```

## 🔧 Hardware Requirements

### Core Components
- **Microcontroller**: Arduino Uno/Nano or Raspberry Pi 4
- **Current Sensors**: ACS712 (5A/20A/30A) or INA219 (high-precision)
- **Voltage Sensor**: ZMPT101B AC voltage sensor module
- **Connectivity**: ESP8266 Wi-Fi module (NodeMCU/Wemos D1 Mini)
- **Power Supply**: 5V/3.3V regulated power supply

### Optional Enhancements
- **Display**: OLED/LCD for local readings
- **Storage**: MicroSD card for offline data buffering
- **Enclosure**: IP65-rated housing for safety

## 📁 Project Structure

```
household-watch/
├── hardware/                    # Arduino/IoT device code
│   ├── arduino/
│   │   ├── main.ino
│   │   ├── sensors.h
│   │   └── wifi_manager.h
│   ├── raspberry-pi/
│   └── schemas/                 # Hardware connection diagrams
├── backend/                     # Node.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── tests/
│   ├── docker/
│   ├── package.json
│   └── .env.example
├── frontend/                    # React.js dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── tests/
│   └── package.json
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
├── docs/                        # Documentation
│   ├── api/
│   ├── hardware/
│   └── deployment/
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── LICENSE
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16.0.0
- MySQL ≥ 8.0
- Docker & Docker Compose (optional)
- Arduino IDE or PlatformIO

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/household-watch.git
cd household-watch
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your database and JWT secret in .env
npm run migrate
npm run seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Hardware Setup
```bash
# Upload Arduino code to your device
# Configure WiFi credentials and API endpoint
# Connect sensors according to hardware/schemas/
```

## 💾 Installation

### Development Environment

#### Backend Dependencies
```bash
cd backend
npm install express mysql2 bcryptjs jsonwebtoken
npm install --save-dev jest supertest eslint prettier
```

#### Frontend Dependencies
```bash
cd frontend
npm install react react-dom recharts axios
npm install --save-dev @testing-library/react jest
```

### Docker Deployment
```bash
docker-compose up -d
```

## 📡 API Documentation

### Authentication Endpoints
```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/refresh      # Token refresh
DELETE /api/auth/logout       # User logout
```

### Energy Data Endpoints
```http
GET    /api/energy/readings   # Get energy readings (paginated)
POST   /api/energy/readings   # Create new reading (IoT devices)
GET    /api/energy/stats      # Get energy statistics
GET    /api/energy/trends     # Get trend analysis
```

### User Management
```http
GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile
DELETE /api/users/account     # Delete user account (GDPR)
```

### Consent Management (GDPR)
```http
GET    /api/consent/status    # Get current consent status
POST   /api/consent/grant     # Grant data processing consent
POST   /api/consent/revoke    # Revoke consent
GET    /api/consent/export    # Export user data (GDPR)
```

### Example API Response
```json
{
  "status": "success",
  "data": {
    "readings": [
      {
        "id": "uuid-here",
        "deviceId": "device-001",
        "timestamp": "2025-08-30T10:30:00Z",
        "voltage": 230.5,
        "current": 2.1,
        "power": 484.05,
        "energy": 0.484,
        "cost": 0.058
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1250
    }
  }
}
```

## 🗄 Database Schema

### Core Tables
```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Devices table
CREATE TABLE devices (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('arduino', 'raspberry_pi') NOT NULL,
    mac_address VARCHAR(17) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Energy readings table
CREATE TABLE energy_readings (
    id VARCHAR(36) PRIMARY KEY,
    device_id VARCHAR(36) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    voltage DECIMAL(8,2) NOT NULL,
    current DECIMAL(8,2) NOT NULL,
    power DECIMAL(10,2) NOT NULL,
    energy_kwh DECIMAL(10,4) NOT NULL,
    cost DECIMAL(8,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
    INDEX idx_device_timestamp (device_id, timestamp),
    INDEX idx_timestamp (timestamp)
);

-- GDPR consent management
CREATE TABLE user_consents (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    consent_type ENUM('data_processing', 'analytics', 'marketing') NOT NULL,
    granted BOOLEAN NOT NULL,
    granted_at TIMESTAMP,
    revoked_at TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## ⚛️ Frontend Components

### Component Hierarchy
```
App
├── Router
├── AuthProvider
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Main
│       ├── Dashboard
│       │   ├── RealTimeMetrics
│       │   ├── EnergyChart
│       │   ├── CostAnalysis
│       │   └── DeviceStatus
│       ├── Analytics
│       │   ├── TrendAnalysis
│       │   ├── UsagePatterns
│       │   └── Recommendations
│       ├── Settings
│       │   ├── UserProfile
│       │   ├── DeviceManagement
│       │   └── PrivacySettings
│       └── Reports
└── ErrorBoundary
```

### State Management Strategy
- **Context API**: Global authentication state, user preferences
- **React Query**: Server state management, caching, background updates
- **Local State**: Component-specific UI state
- **Zustand**: Complex client-side state (optional for advanced features)

## 🔒 Security & Privacy

### Security Measures
- **Authentication**: JWT tokens with refresh mechanism
- **Encryption**: AES-256-GCM for sensitive data at rest
- **API Security**: Rate limiting, input validation, CORS protection
- **Database**: Prepared statements, connection pooling
- **Communication**: HTTPS/TLS 1.3, WSS for real-time data

### GDPR Compliance
- **Explicit Consent**: Clear consent forms for data processing
- **Data Minimization**: Collect only necessary data
- **Right to Access**: API endpoint for data export
- **Right to Erasure**: Complete data deletion capabilities
- **Data Portability**: JSON export in standard format
- **Consent Logging**: Audit trail of all consent actions

### Privacy Controls
```javascript
// Example consent management
const consentTypes = {
  ESSENTIAL: 'essential',        // Required for core functionality
  ANALYTICS: 'analytics',        // Usage analytics and trends
  MARKETING: 'marketing'         // Optional marketing communications
};
```

## 🧪 Testing Strategy

### Unit Testing
- **Backend**: Jest + Supertest for API endpoints
- **Frontend**: Jest + React Testing Library
- **Hardware**: Arduino unit tests with mocks

### Integration Testing
- **API Integration**: Database + API layer testing
- **End-to-End**: Cypress for complete user workflows
- **Hardware Integration**: Sensor simulation and validation

### Test Coverage Goals
- Backend: ≥ 90% code coverage
- Frontend: ≥ 85% code coverage
- Critical paths: 100% coverage

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Production Architecture
```
Internet
    │
    ▼
┌─────────────┐
│   Nginx     │  ── Load Balancer/Reverse Proxy
│   (SSL/TLS) │
└─────────────┘
    │
    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Frontend   │    │   Backend   │    │  Database   │
│  (React)    │    │  (Node.js)  │    │   (MySQL)   │
│  Container  │    │  Container  │    │  Container  │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Docker Deployment
```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment Options
- **AWS**: ECS/Fargate + RDS + CloudFront
- **Google Cloud**: Cloud Run + Cloud SQL + Cloud CDN
- **DigitalOcean**: App Platform + Managed Database
- **Self-hosted**: VPS with Docker Swarm/Kubernetes

## 🛠 Development

### Environment Setup
```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Format code
npm run format

# Lint code
npm run lint
```

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=household_watch
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-32-byte-encryption-key
CORS_ORIGIN=http://localhost:3000

# Frontend (.env.local)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

## 📊 Hardware Setup

### Wiring Diagram
```
Arduino Uno          Sensors
┌─────────────┐     ┌──────────────┐
│     A0      │────▶│  ZMPT101B    │ (Voltage)
│     A1      │────▶│  ACS712      │ (Current)
│   D2, D3    │────▶│  ESP8266     │ (WiFi)
│     GND     │────▶│  Common GND  │
│     5V      │────▶│  VCC         │
└─────────────┘     └──────────────┘
```

### Sensor Calibration
```cpp
// Voltage calibration factor
#define VOLTAGE_CALIBRATION 106.8

// Current calibration factor  
#define CURRENT_CALIBRATION 0.066

// Power calculation
float power = voltage * current;
float energy_kwh = power * (interval_ms / 3600000.0);
```

## 🔌 API Endpoints

### Authentication
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "consent": {
    "essential": true,
    "analytics": true,
    "marketing": false
  }
}
```

### Energy Data
```http
GET /api/energy/readings?page=1&limit=50&startDate=2025-08-01&endDate=2025-08-30
Authorization: Bearer <jwt_token>

Response:
{
  "status": "success",
  "data": {
    "readings": [...],
    "pagination": {...},
    "summary": {
      "totalEnergyKwh": 245.67,
      "averagePower": 1.23,
      "estimatedCost": 29.48
    }
  }
}
```

## 🏗 Database Improvements & Scalability

### Recommended Enhancements
1. **Time-Series Optimization**
   - Implement data partitioning by date
   - Use InfluxDB for time-series data (alternative to MySQL)
   - Add data retention policies (auto-delete old data)

2. **Caching Strategy**
   - Redis for session storage and frequently accessed data
   - Application-level caching for dashboard metrics
   - CDN for static assets

3. **Scalability Improvements**
   - Database read replicas for analytics queries
   - Message queue (Redis/RabbitMQ) for IoT data ingestion
   - Horizontal scaling with load balancers

## 🧪 Testing Commands

```bash
# Backend testing
npm run test                    # Unit tests
npm run test:integration       # Integration tests
npm run test:e2e              # End-to-end tests
npm run test:coverage         # Coverage report

# Frontend testing
npm run test                    # React component tests
npm run test:e2e              # Cypress E2E tests

# Hardware testing
cd hardware && npm run test    # Sensor simulation tests
```

## 🌐 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **Backend**: ESLint + Prettier with Airbnb config
- **Frontend**: ESLint + Prettier with React/Hooks rules
- **Hardware**: Arduino/C++ style guide
- **Commits**: Conventional Commits specification

## 📈 Monitoring & Analytics

### Built-in Metrics
- Energy consumption trends (hourly/daily/monthly)
- Cost analysis and projections
- Device health monitoring
- User engagement analytics (privacy-compliant)

### External Integrations
- Prometheus metrics export
- Grafana dashboard templates
- Alert system for anomalies

## 🔧 Configuration

### Backend Configuration
```javascript
// config/default.js
module.exports = {
  server: {
    port: process.env.PORT || 3001,
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    }
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'household_watch'
  },
  security: {
    jwtSecret: process.env.JWT_SECRET,
    encryptionKey: process.env.ENCRYPTION_KEY,
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // requests per window
    }
  }
};
```

## 🏆 Best Practices

### Code Organization
- **Modular Architecture**: Clear separation of concerns
- **Error Handling**: Comprehensive error catching and logging
- **Documentation**: JSDoc for functions, README for modules
- **Version Control**: Semantic versioning, clear commit messages

### Security Best Practices
- **Input Validation**: Joi/Yup schema validation
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: SameSite cookies, CSRF tokens

## 📋 Roadmap

- [ ] **v1.0**: Core energy monitoring functionality
- [ ] **v1.1**: Advanced analytics and ML predictions
- [ ] **v1.2**: Mobile app (React Native)
- [ ] **v1.3**: Multi-device household support
- [ ] **v2.0**: Smart home integration (HomeKit/Google Home)

## 🤝 Community

- **Discord**: [Join our community](https://discord.gg/household-watch)
- **Issues**: [GitHub Issues](https://github.com/yourusername/household-watch/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/household-watch/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Arduino and Raspberry Pi communities
- Open-source IoT sensor libraries
- React and Node.js ecosystems
- Contributors and testers

## 📞 Support

- **Documentation**: [docs.household-watch.dev](https://docs.household-watch.dev)
- **Email**: support@household-watch.dev
- **Issues**: GitHub Issues for bug reports and feature requests

---

**Made with ❤️ for sustainable energy monitoring**

> ⚠️ **Safety Notice**: Always follow electrical safety guidelines when working with AC voltage sensors. Ensure proper isolation and consider professional installation for high-voltage setups.
