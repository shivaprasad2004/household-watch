# System Architecture

## Overview

Household Watch follows a modern microservices architecture with a React frontend, Node.js backend, and MongoDB database.

## High-Level Architecture
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Node.js API    │    │    MongoDB      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                       │                       │
│              ┌─────────────────┐              │
└──────────────►│  WebSocket      │◄─────────────┘
│  (Real-time)    │
└─────────────────┘

## Component Architecture

### Frontend (React)
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── services/           # API communication
├── utils/              # Helper functions
└── store/              # State management

### Backend (Node.js)
src/
├── controllers/        # Request handlers
├── models/            # Database models
├── middleware/        # Express middleware
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Helper functions
└── config/            # Configuration files

## Data Flow

1. **User Interaction**: User interacts with React frontend
2. **API Request**: Frontend makes HTTP request to Node.js API
3. **Authentication**: JWT token verified by auth middleware
4. **Business Logic**: Controller processes request using services
5. **Database Operation**: MongoDB operations via Mongoose
6. **Response**: JSON response sent back to frontend
7. **Real-time Updates**: WebSocket events for live data

## Security Architecture

- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: AES-256 for sensitive data
- **Transport Security**: HTTPS/WSS for all communications
- **Input Validation**: Joi schemas for request validation

## Database Schema

### Core Collections
- `users` - User accounts and profiles
- `households` - Household information and settings
- `devices` - Connected device registry
- `events` - System events and logs
- `notifications` - User notifications

## Performance Considerations

- **Caching**: Redis for session and frequently accessed data
- **Database Indexing**: Optimized queries with proper indexes
- **CDN**: Static assets served via CDN
- **Load Balancing**: Horizontal scaling capability

## Monitoring & Observability

- **Logging**: Structured logging with Winston
- **Metrics**: Application performance monitoring
- **Health Checks**: Automated system health monitoring
- **Error Tracking**: Comprehensive error reporting

-  [ ZMPT101B ]       [ ACS712 ]
 (Voltage Sensor)   (Current Sensor)
        │                 │
        └──────► [ Arduino / ESP8266 ] ◄──────────────┐
                        │                             │
                        ▼                             │ Wi-Fi (HTTP POST JSON)
              Sends JSON payload                      │
         { voltage, current, power, user_id }         │
                        │                             │
                        ▼                             │
               ┌───────────────────────┐              │
               │     Backend API       │  (Node.js + Express)
               │  http://localhost:4000│
               └───────────────────────┘
                        │
                        ▼
     ┌─────────────────────────────┐
     │         Database            │
     │       (MySQL / Firebase)    │
     │ Tables: users, readings,    │
     │ preferences, consent_logs   │
     └─────────────────────────────┘
                        │
                        ▼
      ┌───────────────────────────────┐
      │        Frontend Dashboard     │  (React.js)
      │   - Real-time Charts          │
      │   - Privacy Controls          │
      │   - User Auth (Login/Signup)  │
      │   - Historical Analysis       │
      └───────────────────────────────┘
                        │
                        ▼
      ┌───────────────────────────────┐
      │       Mobile App (Optional)   │
      │  - Same APIs as frontend      │
      └───────────────────────────────┘


## Deployment Architecture
Internet → Load Balancer → Application Servers → Database Cluster
│
└─────────→ Static Assets (CDN)
