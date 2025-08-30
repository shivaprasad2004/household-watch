# Security Policy

## Supported Versions

We actively support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| 0.9.x   | ❌ No              |
| < 0.9   | ❌ No              |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **security@household-watch.com**

### What to Include

Please include the following information:
- Type of issue (e.g. buffer overflow, SQL injection, etc.)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 24 hours
- **Assessment**: Within 72 hours
- **Fix Timeline**: Critical issues within 7 days, others within 30 days
- **Public Disclosure**: After fix is deployed and users have had time to update

## Security Best Practices

### For Users
- Keep your installation updated to the latest version
- Use strong, unique passwords
- Enable two-factor authentication when available
- Review privacy settings regularly

### For Developers
- Follow our [security guidelines](./developer/security.md)
- Use dependency scanning tools
- Implement proper input validation
- Follow OWASP security principles

## Known Security Considerations

- All user data is encrypted at rest and in transit
- We use industry-standard authentication protocols
- Regular security audits are performed
- We maintain a responsible disclosure policy

## Bug Bounty Program

Currently, we do not have a formal bug bounty program, but we deeply appreciate security researchers who help us keep our users safe.

---

*Last updated: August 30, 2025*