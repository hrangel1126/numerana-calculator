# Shopify API URL Configuration

## 🎯 Where to Set the PHP API URL

The React app needs to know where your PHP ShopifyApi server is located.

### Step 1: Find the Configuration File

Open: `src/services/shopifyService.js`

### Step 2: Find This Line (Around Line 30)

```javascript
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
```

### Step 3: Update Based on Your Setup

---

## 📍 Configuration Examples

### Local Development
```javascript
// Your PHP server runs on your computer
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
```

Run PHP with:
```bash
cd ShopifyApi/public
php -S localhost:8081
```

---

### Shared Hosting (e.g., Bluehost, GoDaddy)
```javascript
// Your PHP server is on shared hosting
const SHOPIFY_API_BASE_URL = 'https://yourdomain.com/shopifyapi';
```

Upload `ShopifyApi/` folder to: `/public_html/shopifyapi/`

---

### Dedicated Server or VPS (e.g., DigitalOcean, Linode)
```javascript
// Your PHP server runs on a separate server
const SHOPIFY_API_BASE_URL = 'https://api.yourdomain.com';
```

Or:
```javascript
// Your PHP server is on a subdomain
const SHOPIFY_API_BASE_URL = 'https://shopify-api.yourdomain.com';
```

---

### Separate PHP Hosting Service
```javascript
// You use a separate PHP hosting provider
const SHOPIFY_API_BASE_URL = 'https://php-server.yourhost.com/shopifyapi';
```

---

### Docker/Container Setup
```javascript
// Your PHP runs in a Docker container
const SHOPIFY_API_BASE_URL = 'http://shopify-api:8081';
```

Or (if exposed to outside):
```javascript
const SHOPIFY_API_BASE_URL = 'https://your-docker-domain.com';
```

---

## 🔍 How to Verify the URL is Correct

### Test from Browser Console

Open your browser console (F12) when on `/singlebasic` page and run:

```javascript
fetch('http://localhost:8081/api/test')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should return:
```json
{
  "success": true,
  "message": "Successfully connected to Shopify",
  "shop": { ... }
}
```

If you get an error, the URL is wrong or PHP server is not running.

---

## 📝 Common Mistakes

### ❌ Wrong: Using localhost in production
```javascript
// DON'T do this in production!
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
```

### ❌ Wrong: Missing trailing slash
```javascript
// Both work, but be consistent:
'http://localhost:8081'   // ✅ Works
'http://localhost:8081/'  // ✅ Also works
```

### ❌ Wrong: Including the full path to file
```javascript
// DON'T include /public/:
const SHOPIFY_API_BASE_URL = 'http://localhost:8081/public'; // ❌ Wrong

// The router handles it automatically:
const SHOPIFY_API_BASE_URL = 'http://localhost:8081'; // ✅ Correct
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update `SHOPIFY_API_BASE_URL` in `src/services/shopifyService.js`
- [ ] Make sure URL points to your PHP server
- [ ] Test the URL works: `curl https://your-url/api/test`
- [ ] Verify PHP server can reach Shopify (not blocked by firewall)
- [ ] Check CORS headers allow your React domain
- [ ] Use HTTPS in production (not HTTP)
- [ ] Test the form submission works end-to-end

---

## 🔐 HTTPS in Production

**Always use HTTPS in production!**

```javascript
// Development (localhost is OK with HTTP)
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';

// Production (MUST use HTTPS!)
const SHOPIFY_API_BASE_URL = 'https://api.yourdomain.com';
```

---

## 🔄 CORS Configuration

If you get CORS errors in production:

Edit `ShopifyApi/public/api/create-customer.php` line 11:

From:
```php
header('Access-Control-Allow-Origin: *');
```

To:
```php
header('Access-Control-Allow-Origin: https://your-react-domain.com');
```

---

## 📞 Troubleshooting

### Q: How do I know if the URL is correct?
A: Test with curl:
```bash
curl https://your-url/api/test
```

Should return JSON with `"success": true`

### Q: What if the PHP server is behind a firewall?
A: Make sure port 8081 (or whatever port you use) is open and accessible

### Q: Can I use the same domain for React and PHP?
A: Yes! Example:
```javascript
// React and PHP on same domain
const SHOPIFY_API_BASE_URL = 'https://yourdomain.com/shopifyapi';
```

### Q: Do I need to restart React after changing the URL?
A: Yes! Stop React (`Ctrl+C`) and run `npm start` again

---

## 📚 Related Files

- **PHP Configuration:** `ShopifyApi/config.php` - Edit Shopify credentials there
- **React Service:** `src/services/shopifyService.js` - Edit API URL there
- **Setup Guide:** `SHOPIFY_START_HERE.md` - Complete setup instructions

---

**Remember:** If the API URL is wrong, the form will still work but customers won't be saved to Shopify. Check the browser console for error messages.
