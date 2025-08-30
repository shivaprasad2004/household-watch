# Household Watch – Testing Strategy

## 🧪 Types of Testing
1. **Unit Tests**
   - Functions, utilities, controllers
   - Jest or Mocha/Chai
2. **Integration Tests**
   - API endpoints with real DB
   - Supertest for Express.js
3. **E2E Tests**
   - Full user flow (frontend → backend → DB)
   - Cypress or Playwright
4. **Performance Tests**
   - Artillery load tests (API response times, DB query latency)
5. **Security Tests**
   - OWASP ZAP, SQL injection checks, XSS testing
6. **Regression Tests**
   - Run before each release

---

## 🛠️ Example Unit Test
```javascript
test("GET /api/devices should return list of devices", async () => {
  const res = await request(app).get("/api/devices").set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
