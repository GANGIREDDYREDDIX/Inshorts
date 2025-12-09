# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Inshorts University Announcement Platform seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** (Preferred)
   - Go to the [Security tab](https://github.com/Parvaggarwal01/Inshorts/security/advisories/new)
   - Click "Report a vulnerability"
   - Fill out the form with details

2. **Direct Contact**
   - Open a private issue with the label `security`
   - Include detailed information about the vulnerability

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

## Security Best Practices

When using this project:

### Environment Variables

- **Never commit** `.env` files to version control
- Use `.env.example` as a template
- Rotate API keys regularly
- Use different keys for development and production

### Database Security

- Use strong MongoDB passwords
- Enable IP whitelisting in MongoDB Atlas
- Keep database connection strings private
- Regularly backup your data

### API Keys

- **Google Gemini API**: Keep your API key secure
- **Pexels API**: Protect your API key
- Monitor API usage for unusual activity
- Set up usage alerts and rate limits

### Authentication

- Change default passwords immediately
- Implement JWT or session-based auth for production
- Use HTTPS in production environments
- Enable CORS properly for your domain

### Dependencies

- Regularly update npm packages
- Run `npm audit` to check for vulnerabilities
- Review security advisories for dependencies
- Use `npm audit fix` to apply automated patches

### Production Deployment

- Use environment-specific configurations
- Enable security headers (helmet.js)
- Implement rate limiting
- Use a Web Application Firewall (WAF)
- Enable logging and monitoring
- Use HTTPS/TLS certificates

## Known Security Considerations

### Current Limitations

1. **Authentication**: Uses basic localStorage-based auth
   - **Recommendation**: Implement JWT or OAuth for production

2. **Password Storage**: Plaintext password comparison
   - **Recommendation**: Use bcrypt or argon2 for password hashing

3. **API Endpoint Protection**: Limited role-based validation
   - **Recommendation**: Implement middleware for role verification

4. **Rate Limiting**: Not implemented
   - **Recommendation**: Add express-rate-limit

5. **Input Validation**: Basic validation
   - **Recommendation**: Use validation libraries like Joi or express-validator

## Security Updates

Security updates will be released as patch versions. Subscribe to:

- GitHub Security Advisories
- Repository releases
- Watch the repository for notifications

## Disclosure Policy

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide regular updates about our progress
- We will credit you (if desired) in the security advisory
- We ask that you do not publicly disclose the vulnerability until we have addressed it

## Bug Bounty Program

Currently, we do not offer a paid bug bounty program. However, we greatly appreciate responsible disclosure and will acknowledge contributors in our security advisories.

## Contact

For security concerns, please use GitHub's security advisory feature or open a private issue.

## Acknowledgments

We would like to thank the following individuals for responsibly disclosing security issues:

_No reports yet - be the first!_

---

**Last Updated**: December 9, 2025
