# Shopify Integration - Configuration Summary

All your Shopify credentials are already in the config! You only need to add one thing.

---

## 📋 What's Already Configured

These values from the original project are **already in the code**:

| Setting | Value | From |
|---------|-------|------|
| **Shop Domain** | `numerana.myshopify.com` | `src/config/shopify.js` ✅ |
| **API Version** | `2024-10` | `src/config/shopify.js` ✅ |
| **Client ID** | `5d05a9dabd8a17d05c510a55868be7fd` | `src/config/shopify.js` ✅ |
| **Client Secret** | `ccb76b93ab32f5669c2d2c9b97827aee` | `src/config/shopify.js` ✅ |

---

## 🔑 What YOU Need to Add

**Only ONE thing is missing:** Your Shopify Admin API Token

### Where to Add It

**File:** `ShopifyApi/config.php`  
**Line:** 27

```php
'ADMIN_API_TOKEN' => 'shpat_your_admin_api_token_here',  // ← REPLACE THIS
```

Change to:

```php
'ADMIN_API_TOKEN' => 'shpat_abc123def456...',  // Your actual token
```

---

## 🚀 How to Get Your Admin API Token

1. Go to: **https://admin.shopify.com**
2. Navigate to: **Apps and integrations** → **Develop apps**
3. Create a new app or select existing
4. Click **Configuration** tab
5. Find **Admin API access tokens**
6. Click **Generate token**
7. Copy the token (starts with `shpat_`)
8. Paste into `ShopifyApi/config.php` line 27

---

## 📍 Where Each Config Value Is Used

### PHP Backend (`ShopifyApi/config.php`)
```php
return [
    'SHOP_DOMAIN' => 'numerana.myshopify.com',           // From original
    'API_VERSION' => '2024-10',                          // From original
    'ADMIN_API_TOKEN' => 'shpat_...',                    // ← YOU ADD THIS
    'CLIENT_ID' => '5d05a9dabd...',                      // From original
    'CLIENT_SECRET' => 'ccb76b93ab...',                  // From original
];
```

### React Frontend (`src/services/shopifyService.js`)
```javascript
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';  // PHP server URL
// Change to your production server when deploying
```

---

## ✅ Configuration Checklist

- [x] Shop Domain: `numerana.myshopify.com` (already configured)
- [x] API Version: `2024-10` (already configured)
- [x] Client ID: `5d05a9dabd...` (already configured)
- [x] Client Secret: `ccb76b93ab...` (already configured)
- [ ] **Admin API Token: ADD THIS** (you need to generate)
- [x] React API URL: `http://localhost:8081` (already configured)

---

## 🔍 Verify Everything Works

### Test PHP Server
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
    "domain": "numerana.myshopify.com"
  }
}
```

If you get an error, your Admin API Token is wrong or not set.

---

## 📝 Configuration Files

| File | What It Contains | Should Edit? |
|------|------------------|--------------|
| `ShopifyApi/config.php` | PHP backend config | ✅ YES - Add your token! |
| `src/services/shopifyService.js` | React API URL | ⚠️ Only for production |
| `src/config/shopify.js` | Original Shopify config | ❌ NO - Don't change |

---

## 🎯 Summary

1. **Everything is pre-configured** from the original project
2. **Only need to add** your Admin API Token
3. **Takes 1 minute** to set up
4. **Edit one line** in `ShopifyApi/config.php`

That's it! You're done! 🎉

---

## 📞 Troubleshooting

### Q: Where do I find my Admin API Token?
A: Shopify Admin → **Apps and integrations** → **Develop apps** → Your App → **Configuration** → **Admin API access tokens**

### Q: What if the test endpoint returns an error?
A: Your Admin API Token is either missing, wrong, or the PHP server isn't running

### Q: Can I use the same token from the original project?
A: If you have it, yes! Just paste it into `ShopifyApi/config.php`

### Q: Do I need to change anything else?
A: No! Everything else is already configured.

---

**You're ready to go! Just add your Admin API Token and run the servers.** 🚀
