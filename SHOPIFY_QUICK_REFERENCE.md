# Shopify Integration - Quick Reference

## ⚡ Quick Setup (1 Minute!)

### Step 1: Add Token to PHP Config
Open `ShopifyApi/config.php` line 27 and change:
```php
'ADMIN_API_TOKEN' => 'shpat_your_admin_api_token_here',
```

To your actual token:
```php
'ADMIN_API_TOKEN' => 'shpat_abc123def456...',
```

**Everything else is already set!**

### Step 2: Check React API URL (Optional)
For local development, `src/services/shopifyService.js` is already set to:
```javascript
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
```

Only change if using production server. See `SHOPIFY_API_URL_CONFIG.md`

### Step 3: Run PHP Server
```bash
cd ShopifyApi/public
php -S localhost:8081
```

### Step 4: Run React App
```bash
npm start
```

### Step 5: Test
- Go to http://localhost:3000/singlebasic
- Fill form with test data
- Submit and check Shopify admin for new customer

---

## 📁 What Was Created

| Location | Purpose |
|----------|---------|
| `ShopifyApi/` | PHP backend service |
| `ShopifyApi/config/shopify.php` | Configuration |
| `ShopifyApi/includes/ShopifyGraphQL.php` | Shopify API client |
| `ShopifyApi/public/api/create-customer.php` | Customer endpoint |
| `ShopifyApi/public/api/test.php` | Test endpoint |
| `src/services/shopifyService.js` | React service |
| `src/components/SingleBasicComponent.jsx` | Updated form |
| `.env.example` | Configuration template |
| `SHOPIFY_SETUP_GUIDE.md` | Full documentation |

---

## 🎯 What Happens When User Submits SingleBasic Form

```
1. User fills: Name, Birth Date, Email, Captcha
2. Click Submit
3. React validates form ✓
4. React calculates numerology ✓
5. React sends customer data to PHP API
6. PHP API creates/updates in Shopify ✓
7. Show results to user
```

---

## 📊 Customer Data in Shopify

When user submits form with:
- Name: "John Doe"
- Email: "john@example.com"
- Birth Date: "15/05/1990"

Shopify stores:
```
Customer:
  Email: john@example.com
  First Name: John
  Last Name: Doe
  Marketing: SUBSCRIBED

Metafields:
  custom.dob = 15/05/1990
  custom.consented_at = 2024-01-15T10:30:00Z
```

---

## 🔧 Configuration Files

### PHP Backend (`ShopifyApi/config.php`)
```php
'SHOP_DOMAIN' => 'your-store.myshopify.com',
'API_VERSION' => '2024-10',
'ADMIN_API_TOKEN' => 'shpat_your_token_here',
'DEBUG' => false,
```

### React Frontend (`src/services/shopifyService.js`)
```javascript
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
// For production, change to: https://your-php-server.com
```

---

## 🧪 Testing

### Test PHP Server
```bash
curl http://localhost:8081/api/test
```

### Test Customer Creation
```bash
curl -X POST http://localhost:8081/api/create-customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "birthdate": "01/01/2000"
  }'
```

---

## 🚀 Where Does Integration Happen?

### Only in SingleBasic
- ✅ `http://localhost:3000/singlebasic` - **Has Shopify integration**
- ❌ `http://localhost:3000/single` - No integration (unchanged)
- ❌ `http://localhost:3000/couple` - No integration (unchanged)
- ❌ `http://localhost:3000/team` - No integration (unchanged)

### Integration Code Location
**React File:** `src/components/SingleBasicComponent.jsx`
- Line 2: Import shopify service
- Line 121: Call Shopify API after successful calculation

**Service File:** `src/services/shopifyService.js`
- Communicates with PHP backend

**PHP File:** `ShopifyApi/public/api/create-customer.php`
- Creates/updates customer in Shopify

---

## ⚙️ How Configuration Works

1. **React reads from:**
   - Environment variable: `REACT_APP_SHOPIFY_API_URL`
   - Default: `http://localhost:8081`

2. **PHP reads from:**
   - `.env` file in project root
   - Uses variables: `ADMIN_API_ACCESS_TOKEN`, `SHOP_DOMAIN`, `API_VERSION`

3. **Same variables as original code**
   - Uses `ADMIN_API_ACCESS_TOKEN` (from original `server/server.js`)
   - Uses `SHOP_DOMAIN` (from original `src/config/shopify.js`)
   - Uses `API_VERSION` (from original `src/config/shopify.js`)

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "API token not configured" | Check `.env` file exists and has token |
| "Customer not saving" | Make sure PHP server running on 8081 |
| "CORS error" | Check `REACT_APP_SHOPIFY_API_URL` in `.env` |
| "Invalid email" | Use real email format: `user@domain.com` |
| "Invalid date" | Use format `DD/MM/YYYY` like `15/05/1990` |

---

## 📖 Full Documentation

See `SHOPIFY_SETUP_GUIDE.md` for:
- Complete setup instructions
- API endpoint documentation
- Security considerations
- Deployment options
- Troubleshooting guide
- FAQ

---

## 🎯 Key Points

✅ Only SingleBasic form has Shopify integration  
✅ Uses same environment variables as original code  
✅ PHP backend separate from React app  
✅ Works with localhost for development  
✅ Easy to deploy to production  
✅ Customers stored in Shopify permanently  
✅ Can be extended to other calculators later  

---

## 🚀 Next Steps

1. Get Shopify Admin API token
2. Create `.env` file
3. Run PHP server
4. Run React app
5. Test with SingleBasic form
6. Check Shopify admin for customers

---

**Questions?** See `SHOPIFY_SETUP_GUIDE.md` for detailed help.
