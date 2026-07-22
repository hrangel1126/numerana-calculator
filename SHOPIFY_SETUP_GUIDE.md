# Shopify Integration Setup Guide

This guide explains how to set up and use the Shopify integration for the Numerana Calculator.

## 📋 Overview

The Shopify integration allows SingleBasic calculator to:
- ✅ Create new customers in Shopify when users submit the form
- ✅ Update existing customers with numerology data (birth date)
- ✅ Store consent timestamps
- ✅ Enable personalized follow-ups in Shopify

### Architecture

```
React Frontend (SingleBasic)
    ↓ (HTTPS)
    ↓ POST /api/create-customer
    ↓
PHP Backend (ShopifyApi)
    ↓ (GraphQL)
    ↓
Shopify Admin API
    ↓
Shopify Database
```

## 🚀 Quick Start

### 1. Prerequisites

- PHP 7.4+ (most hosting provides this)
- cURL extension enabled in PHP
- Shopify store with Admin API access
- Node.js/npm for React development

### 2. Create .env File

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Fill in your Shopify credentials:

```env
# Your Shopify store domain
SHOP_DOMAIN=your-store.myshopify.com

# Shopify API version (default is fine)
API_VERSION=2024-10

# Get this from Shopify Admin > Apps > Develop apps > Your App > Configuration
ADMIN_API_ACCESS_TOKEN=shpat_1234567890abcdefghijk

# For local development
REACT_APP_SHOPIFY_API_URL=http://localhost:8081

# Set to true for debugging
DEBUG=false
```

### 3. Get Shopify Admin API Token

**Steps:**

1. Go to your Shopify store: https://admin.shopify.com
2. Navigate to: **Apps and integrations** → **Develop apps**
3. Click **Create an app**
4. Fill in app name (e.g., "Numerology Integration")
5. Click **Create app**
6. Go to **Configuration** tab
7. Scroll to **Admin API access tokens**
8. Click **Generate token**
9. Copy the token (starts with `shpat_`)
10. Add to your `.env` file as `ADMIN_API_ACCESS_TOKEN`

**Required API Scopes** (configure in app):
- `write_customers` - Create/update customers
- `read_customers` - Read customer data

### 4. Run Locally

**Terminal 1 - PHP Server (ShopifyApi):**

```bash
cd ShopifyApi/public
php -S localhost:8081
```

You should see:
```
[Wed Jan 15 10:30:00 2025] Listening on http://localhost:8081
[Wed Jan 15 10:30:00 2025] Press Ctrl+C to quit
```

**Terminal 2 - React App:**

```bash
npm start
```

React will open at: `http://localhost:3000`

### 5. Test It

1. Go to: http://localhost:3000/singlebasic
2. Fill in the form:
   - **Name:** John Doe
   - **Birth Date:** 15/05/1990 (DD/MM/YYYY)
   - **Email:** john@example.com
3. Complete the captcha
4. Click **Submit**
5. Check your Shopify store for the new customer

## 📁 File Structure

```
Numerana-calculator/
├── ShopifyApi/                    # PHP Backend (separate from React)
│   ├── public/
│   │   ├── index.php              # Main router
│   │   └── api/
│   │       ├── create-customer.php # Create/update customer endpoint
│   │       └── test.php           # Test connection endpoint
│   ├── config/
│   │   └── shopify.php           # Configuration (reads from .env)
│   ├── includes/
│   │   └── ShopifyGraphQL.php    # GraphQL helper class
│   ├── logs/                     # Auto-created for logging
│   ├── .env.example              # Environment template
│   └── README.md                 # ShopifyApi documentation
│
├── src/
│   ├── components/
│   │   └── SingleBasicComponent.jsx  # Updated with Shopify integration
│   └── services/
│       └── shopifyService.js     # React service that calls PHP API
│
├── .env                          # Your credentials (git ignored)
├── .env.example                  # Template
└── SHOPIFY_SETUP_GUIDE.md       # This file
```

## 🔌 API Endpoints

### POST /api/create-customer

**Creates or updates a customer in Shopify**

Request:
```json
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "birthdate": "15/05/1990",
  "consentedAt": "2024-01-15T10:30:00Z"
}
```

Response (Success):
```json
{
  "success": true,
  "action": "created",
  "message": "Customer created successfully",
  "customer": { ... },
  "timestamp": "2024-01-15T10:30:00+00:00"
}
```

Response (Error):
```json
{
  "success": false,
  "error": "Invalid email format",
  "timestamp": "2024-01-15T10:30:00+00:00"
}
```

### GET /api/test

**Tests Shopify connection**

Response:
```json
{
  "success": true,
  "message": "Successfully connected to Shopify",
  "shop": {
    "name": "My Store",
    "domain": "my-store.myshopify.com",
    "email": "admin@mystore.com"
  },
  "timestamp": "2024-01-15T10:30:00+00:00"
}
```

## 🔍 What Gets Stored in Shopify

When a user submits the SingleBasic form, the following is stored:

### Customer Record
```
Email: john@example.com
First Name: John
Last Name: Doe (optional)
Email Marketing Consent: SUBSCRIBED
```

### Metafields (Custom Data)
```
custom.dob = "15/05/1990"              # Birth date from form
custom.consented_at = "2024-01-15T..." # When they submitted
```

These metafields are visible in Shopify Admin under customer profile.

## 🛡️ Security Considerations

### What You Should Know

1. **API Token Storage**
   - Never commit `.env` file with real tokens
   - Use `.gitignore` to exclude `.env`
   - Rotate tokens regularly

2. **CORS**
   - API allows all origins (`*`) for development
   - For production, restrict to your domain
   - Edit `ShopifyApi/public/api/create-customer.php` line 11:
     ```php
     header('Access-Control-Allow-Origin: https://your-domain.com');
     ```

3. **Input Validation**
   - Email format checked
   - Birth date format validated
   - Name fields required
   - Already implemented in PHP

4. **HTTPS in Production**
   - Always use HTTPS in production
   - Never send credentials over HTTP
   - Use trusted hosting

## 🚨 Troubleshooting

### "API token not configured"
**Problem:** Error when trying to test connection

**Solution:**
1. Check `.env` file exists in project root
2. Verify `ADMIN_API_ACCESS_TOKEN` is set
3. Make sure value doesn't have quotes: `shpat_xxx` (not `"shpat_xxx"`)

### "Customer not saving to Shopify"
**Problem:** Form submits but customer doesn't appear in Shopify

**Solutions:**
1. Test connection: `GET http://localhost:8081/api/test`
2. Check browser console for errors
3. Check PHP error log
4. Verify API token has correct scopes
5. Check `.env` file is readable by PHP

### "CORS error in browser"
**Problem:** "Access-Control-Allow-Origin" error

**Solutions:**
1. Ensure PHP server is running on 8081
2. Check `REACT_APP_SHOPIFY_API_URL=http://localhost:8081` in `.env`
3. Clear browser cache and reload
4. Check browser console for exact error

### "Invalid birthdate format"
**Problem:** Form rejects valid date

**Solutions:**
1. Use format: `DD/MM/YYYY` (e.g., `15/05/1990`)
2. Don't use spaces or other separators
3. Day must be 01-31, Month 01-12

## 📊 Monitoring & Logs

### Enable Debug Logging

1. Set `DEBUG=true` in `.env`
2. Logs appear in `ShopifyApi/logs/shopify.log`
3. Check logs for detailed error information

### Common Log Messages

```
[2024-01-15 10:30:00] Request URL: https://numerana.myshopify.com/admin/api/2024-10/graphql.json
[2024-01-15 10:30:01] GraphQL Response: {"data":{"customers":...}}
[2024-01-15 10:30:02] Customer updated successfully
```

## 🌐 Deployment

### Local Development
- PHP: `php -S localhost:8081`
- React: `npm start`
- API URL: `http://localhost:8081`

### Production (GitHub Pages + Shared Hosting)

**Frontend (GitHub Pages):**
- Deploy React app to GitHub Pages as usual
- Set `REACT_APP_SHOPIFY_API_URL` to production domain

**Backend (Shared Hosting):**
1. Upload `ShopifyApi` folder to hosting
2. Create `.env` file on server with credentials
3. Access at: `https://your-hosting.com/shopifyapi/api/create-customer`

### Production (Vercel)

**Frontend:**
- Deploy React to Vercel
- Set environment variable `REACT_APP_SHOPIFY_API_URL`

**Backend:**
- Use separate PHP hosting (Vercel doesn't support PHP)
- Or convert to serverless functions

## 📚 Additional Resources

- [Shopify Admin API Docs](https://shopify.dev/docs/admin-api)
- [Shopify GraphQL API](https://shopify.dev/docs/admin-api/graphql-reference)
- [PHP cURL Documentation](https://www.php.net/manual/en/book.curl.php)

## ❓ FAQ

**Q: Will this work without internet?**
A: No, it requires connection to Shopify API.

**Q: Can I test without a real Shopify store?**
A: Yes, create a free development store at developer.shopify.com

**Q: How long do customers stay in Shopify?**
A: Indefinitely, until you delete them manually.

**Q: Can I use this for other calculators (Couple, Team)?**
A: Yes! The integration is designed for SingleBasic, but can be adapted.

**Q: What if the user doesn't have an email?**
A: Email is required by Shopify to create a customer.

## 📞 Support

If you encounter issues:

1. Check troubleshooting section above
2. Enable debug logging
3. Check error logs
4. Verify `.env` configuration
5. Test with cURL: `curl http://localhost:8081/api/test`

---

**Last Updated:** January 15, 2025  
**Version:** 1.0.0
