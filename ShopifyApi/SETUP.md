# ShopifyApi - Setup Guide

## ⚡ Quick Setup (1 Minute!)

### Step 1: Edit Configuration
Open `ShopifyApi/config.php` and replace this line:

```php
'ADMIN_API_TOKEN' => 'shpat_your_admin_api_token_here',
```

With your actual Shopify Admin API token:

```php
'ADMIN_API_TOKEN' => 'shpat_abc123def456...',
```

**That's it!** The rest is already configured:
- ✅ `SHOP_DOMAIN` → `numerana.myshopify.com`
- ✅ `API_VERSION` → `2024-10`
- ✅ `CLIENT_ID` → Already set
- ✅ `CLIENT_SECRET` → Already set

### Step 2: Get Your Admin API Token (if you don't have it)

1. Go to your Shopify Admin: https://admin.shopify.com
2. **Apps and integrations** → **Develop apps**
3. Create a new app or select existing
4. Go to **Configuration** tab
5. Scroll to **Admin API access tokens**
6. Click **Generate token**
7. Copy the token (starts with `shpat_`)
8. Paste into `config.php` as `ADMIN_API_TOKEN`

### Step 3: Run PHP Server

```bash
cd ShopifyApi/public
php -S localhost:8081
```

You should see:
```
Listening on http://localhost:8081
Press Ctrl+C to quit
```

### Step 4: Run React App

```bash
npm start
```

### Step 5: Test It

1. Go to: http://localhost:3000/singlebasic
2. Fill form with test data
3. Submit
4. Check Shopify admin for new customer ✅

---

## 📁 Configuration File

**Location:** `ShopifyApi/config.php`

```php
<?php
return [
    // Your Shopify store domain
    'SHOP_DOMAIN' => 'numerana.myshopify.com',
    
    // Shopify API version
    'API_VERSION' => '2024-10',
    
    // Admin API token (from Shopify)
    'ADMIN_API_TOKEN' => 'shpat_your_token_here',
    
    // Debug mode (set to true for logging)
    'DEBUG' => false,
    
    // Log file
    'LOG_FILE' => __DIR__ . '/../logs/shopify.log',
];
?>
```

---

## 🔍 Verify Setup

Test the connection:

```bash
curl http://localhost:8081/api/test
```

Should return:
```json
{
  "success": true,
  "message": "Successfully connected to Shopify",
  "shop": {
    "name": "Your Store Name",
    "domain": "your-store.myshopify.com"
  }
}
```

---

## 📚 File Structure

```
ShopifyApi/
├── config.php                    ← EDIT THIS FILE
├── includes/
│   └── ShopifyGraphQL.php       ← GraphQL client
├── public/
│   ├── index.php                ← Router
│   └── api/
│       ├── create-customer.php  ← Creates customers
│       └── test.php             ← Tests connection
├── logs/                        ← Auto-created
└── SETUP.md                     ← This file
```

---

## 🚀 That's All!

Just edit `config.php` with your Shopify token, run the servers, and you're done!

For more details, see the root documentation:
- `SHOPIFY_START_HERE.md`
- `SHOPIFY_QUICK_REFERENCE.md`
