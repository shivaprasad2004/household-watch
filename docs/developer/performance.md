# Household Watch – Performance Optimization (MySQL)

## 🎯 Performance Goals
| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| API Response Time | < 200ms (95th percentile) |
| Real-time Updates | < 100ms latency |
| DB Queries | < 50ms average |
| Memory Usage | < 512MB per instance |
| CPU Usage | < 70% |

---

## 🚀 Frontend Optimization
- React `memo`, `useMemo`, `useCallback`
- Code splitting & lazy loading
- Webpack tree-shaking & minification
- Lazy load images + WebP

---

## ⚡ Backend Optimization (MySQL)
- Connection pooling with `mysql2/promise`
- Indexed queries
- Pagination using `LIMIT OFFSET`
- Redis & in-memory caching
- API compression + rate limiting
- Real-time updates via WebSocket

---

## 📊 Query Optimization
- Compound indexes on `household_id, timestamp, type`
- Generated columns for conditional indexing
- Full-text search on event logs
- Use projections (select only needed columns)

---

## 🔍 Monitoring & Profiling
- Node.js CPU & heap snapshots
- MySQL slow query logs
- `EXPLAIN` to analyze queries
- Performance alert thresholds (response time, memory, error rate)

---

## 🧪 Benchmarking
- Artillery load testing
- p95 / p99 latency tracking
- Weekly performance review & monthly optimization sprint
