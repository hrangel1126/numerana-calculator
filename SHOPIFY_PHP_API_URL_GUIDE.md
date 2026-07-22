# Shopify PHP API - URL Structure & Configuration

**Date:** July 22, 2026  
**Topic:** Correct URL format for PHP Shopify API backend

---

## Quick Answer

### The correct URL is:

```
https://numerana.mx/ShopifyApi/public
```

**NOT:** `https://numerana.mx/ShopifyApi/public/index.php`  
**NOT:** `https://numerana.mx/ShopifyApi` (missing /public)

---

## Why This URL?

The PHP API uses URL routing/rewriting. Here's the structure:

```
ShopifyApi/
├── config.php                    ← Configuration (credentials)
├── includes/                     ← Shared includes
│   ├── ShopifyGraphQL.php       ← GraphQL client
│   └── ... other includes
├── public/                       ← Public entry point
│   ├── index.php                ← Main router (handles all requests)
│   └── api/
│       ├── create-customer.php  ← Customer creation endpoint
│       └── test.php             ← Test connection endpoint
├── README.md
└── SETUP.md
```

The `index.php` uses **routing/rewriting** to handle requests:
- Request: `POST /ShopifyApi/public/api/create-customer`
- Handled by: `public/index.php` (which routes to `/api/create-customer.php`)

---

## API Endpoints

### Base URL (for local & production)

**Local Development:**
```
http://localhost/ShopifyApi/public
```

**Production (numerana.mx):**
```
https://numerana.mx/ShopifyApi/public
```

### Available Endpoints

| Endpoint | Method | Purpose | File |
|----------|--------|---------|------|
| `/` | GET | API info & available endpoints | `public/index.php:28-38` |
| `/api/test` | GET | Test Shopify connection | `public/api/test.php` |
| `/api/create-customer` | POST | Create/update customer | `public/api/create-customer.php` |

### Full URLs

**Test Shopify Connection:**
```
GET https://numerana.mx/ShopifyApi/public/api/test
```

**Create Customer:**
```
POST https://numerana.mx/ShopifyApi/public/api/create-customer
Content-Type: application/json

{
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "birthdate": "01/15/1985"
}
```

**Get API Info:**
```
GET https://numerana.mx/ShopifyApi/public
```

---

## How URL Routing Works in index.php

The `public/index.php` (lines 18-50) handles routing:

```php
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/ShopifyApi/public';

// Remove base path
if (strpos($requestUri, $basePath) === 0) {
    $requestUri = substr($requestUri, strlen($basePath));
}

// Route to correct handler
if (strpos($requestUri, '/api/create-customer') === 0) {
    require_once __DIR__ . '/api/create-customer.php';
} elseif (strpos($requestUri, '/api/test') === 0) {
    require_once __DIR__ . '/api/test.php';
}
```

**So these URLs are equivalent:**
- ✅ `https://numerana.mx/ShopifyApi/public/api/create-customer`
- ✅ `https://numerana.mx/ShopifyApi/public/api/create-customer.php` (routing still works)
- ❌ `https://numerana.mx/ShopifyApi/public/index.php` (would return the API info page, not the endpoint)

---

## Where to Update the URL in SingleBasicComponent

The React component sends data to the PHP API. You need to update this:

**File:** `src/components/SingleBasicComponent.jsx`  
**Look for:** Where `createOrUpdateCustomer()` is called

**Current (Node.js Express):**
```javascript
const response = await createOrUpdateCustomer({
  email: email,
  firstName: firstName,
  lastName: lastName,
  birthdate: birthdate,
});
```

**Change to (PHP):**
```javascript
const response = await fetch('https://numerana.mx/ShopifyApi/public/api/create-customer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    firstName: firstName,
    lastName: lastName,
    birthdate: birthdate
  })
});

const data = await response.json();
```

Or update the service file to use the correct endpoint.

---

## Configuration Steps

### 1. Set Up Shopify Credentials

**File:** `ShopifyApi/config.php`

```php
<?php
// Shopify Store Configuration
define('SHOPIFY_STORE_DOMAIN', 'numerana.myshopify.com');
define('SHOPIFY_API_VERSION', '2024-10');
define('SHOPIFY_ADMIN_API_TOKEN', 'shpat_YOUR_TOKEN_HERE');

// API Settings
define('API_BASE_URL', 'https://numerana.myshopify.com/admin/api/2024-10');
define('SHOPIFY_GRAPHQL_ENDPOINT', '/graphql.json');

// CORS Settings
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://numerana.mx',
    'https://www.numerana.mx'
]);
?>
```

### 2. Update React to Use PHP Backend

**File:** `src/services/shopifyService.js`

Change:
```javascript
const DEFAULT_LOCAL_API_URL = "http://localhost:8080/api";
const DEFAULT_PROD_API_URL = "https://react-cal-production.up.railway.app/api";
```

To:
```javascript
const DEFAULT_LOCAL_API_URL = "http://localhost/ShopifyApi/public";
const DEFAULT_PROD_API_URL = "https://numerana.mx/ShopifyApi/public";
```

### 3. Update Create-Customer Call

**File:** `src/components/SingleBasicComponent.jsx`

Change endpoint path from:
```javascript
const response = await apiClient.post("/create-customer", {
```

To:
```javascript
const response = await apiClient.post("/api/create-customer", {
```

---

## Testing the PHP API

### Test 1: Check API is Running

```bash
curl https://numerana.mx/ShopifyApi/public
```

Expected response:
```json
{
  "message": "ShopifyApi Server Running",
  "version": "1.0.0",
  "timestamp": "2026-07-22T...",
  "endpoints": {
    "POST /api/create-customer": "Create or update Shopify customer",
    "GET /api/test": "Test Shopify connection"
  }
}
```

### Test 2: Test Shopify Connection

```bash
curl https://numerana.mx/ShopifyApi/public/api/test
```

Expected response (if configured correctly):
```json
{
  "success": true,
  "message": "Successfully connected to Shopify",
  "shop": {
    "name": "Numerana",
    "domain": "numerana.myshopify.com",
    "email": "shop@numerana.myshopify.com"
  }
}
```

### Test 3: Create Customer

```bash
curl -X POST https://numerana.mx/ShopifyApi/public/api/create-customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "01/15/1985"
  }'
```

---

## Directory Structure Overview

```
Numerana-calculator/
│
├── ShopifyApi/                          ← PHP Backend
│   ├── config.php                       ← Credentials (update ADMIN_API_TOKEN)
│   ├── includes/
│   │   ├── ShopifyGraphQL.php          ← GraphQL client
│   │   └── ...
│   ├── public/
│   │   ├── index.php                   ← Main router
│   │   ├── api/
│   │   │   ├── create-customer.php    ← POST handler
│   │   │   └── test.php               ← GET handler
│   │   └── ...
│   └── README.md
│
├── src/                                 ← React Frontend
│   ├── components/
│   │   └── SingleBasicComponent.jsx    ← Form (calls PHP API)
│   ├── services/
│   │   └── shopifyService.js           ← API client
│   └── ...
│
└── ...
```

---

## Environment Setup for Different Hosting

### If Hosting on Shared Hosting (cPanel, Plesk, etc.)

The PHP files should be in the root or public_html:

```
/public_html/
├── index.html              ← React build (or in /react subfolder)
├── ShopifyApi/
│   ├── config.php         ← Update credentials here
│   ├── public/
│   │   ├── index.php
│   │   └── api/
│   └── ...
```

**URL:** `https://numerana.mx/ShopifyApi/public/api/create-customer`

### If Hosting on Custom Server (VPS, Heroku, etc.)

Adjust the base path in both:
1. `ShopifyApi/public/index.php` (line 20)
2. `src/services/shopifyService.js` (api base URL)

---

## Complete Flow with PHP API

```
┌──────────────────────────────────┐
│  React App (SingleBasic Form)    │
│  src/components/...              │
└──────────────────┬───────────────┘
                   │
                   │ POST JSON
                   │ email, firstName, lastName, birthdate
                   ▼
┌──────────────────────────────────────────┐
│  PHP Backend - ShopifyApi/public/        │
│  API Endpoint: /api/create-customer      │
├──────────────────────────────────────────┤
│  1. index.php routes request             │
│  2. create-customer.php processes data   │
│  3. ShopifyGraphQL.php calls Shopify API │
└──────────────────┬───────────────────────┘
                   │
                   │ GraphQL Query/Mutation
                   │ X-Shopify-Access-Token
                   ▼
┌──────────────────────────────────────────┐
│  Shopify Admin API                       │
│  https://numerana.myshopify.com/         │
│  admin/api/2024-10/graphql.json          │
│                                          │
│  Actions:                                │
│  - Check if customer exists              │
│  - Create new customer OR                │
│  - Update existing customer              │
│  - Add birthdate to metafields           │
└──────────────────┬───────────────────────┘
                   │
                   │ JSON Response with customer data
                   │ (customerId, email, metafields, etc)
                   ▼
┌──────────────────────────────────────────┐
│  PHP Backend Response                    │
│  {                                       │
│    "success": true,                      │
│    "action": "created|updated",          │
│    "customer": {...}                     │
│  }                                       │
└──────────────────┬───────────────────────┘
                   │
                   │ JSON Response
                   ▼
┌──────────────────────────────────────────┐
│  React App receives response             │
│  Shows success message to user           │
│  Displays customer data                  │
└──────────────────────────────────────────┘
```

---

## Summary

| Item | Local | Production |
|------|-------|-----------|
| **Base URL** | `http://localhost/ShopifyApi/public` | `https://numerana.mx/ShopifyApi/public` |
| **Create Customer** | POST `/api/create-customer` | POST `/api/create-customer` |
| **Full URL** | `http://localhost/ShopifyApi/public/api/create-customer` | `https://numerana.mx/ShopifyApi/public/api/create-customer` |
| **Config File** | `ShopifyApi/config.php` | `ShopifyApi/config.php` |
| **Router** | `ShopifyApi/public/index.php` | `ShopifyApi/public/index.php` |

**Key Point:** Always use `/ShopifyApi/public` as the base path, NOT `/ShopifyApi/public/index.php`

---

## Next Steps

1. ✅ Confirm PHP ShopifyApi backend is created
2. ⏳ Update `ShopifyApi/config.php` with Shopify credentials
3. ⏳ Update `src/services/shopifyService.js` to point to `https://numerana.mx/ShopifyApi/public`
4. ⏳ Update `src/components/SingleBasicComponent.jsx` to call correct endpoint
5. ⏳ Test the connection with curl commands above
6. ⏳ Test the form submission flow end-to-end

---

## Questions?

If you need clarification on any part of the PHP API setup, let me know!
