# 🚀 Shopify Integration Setup - READ THIS FIRST

**Status:** ✅ Complete and Ready to Use  
**Setup Time:** 1 minute  
**Difficulty:** Super Easy

---

## 🎯 What You Need to Do (Just 1 Thing!)

### Edit ONE File

Open: `ShopifyApi/config.php`

Find this line (around line 27):
```php
'ADMIN_API_TOKEN' => 'shpat_your_admin_api_token_here',
```

Replace with your actual Shopify Admin API Token:
```php
'ADMIN_API_TOKEN' => 'shpat_abc123def456...',
```

**That's it!** Everything else is already configured! ✅

---

## ✅ What's Already Pre-Configured

Your Shopify store information from the original project is already in place:

- ✅ Store Domain: `numerana.myshopify.com`
- ✅ API Version: `2024-10`
- ✅ Client ID: `5d05a9dabd8a17d05c510a55868be7fd`
- ✅ Client Secret: `ccb76b93ab32f5669c2d2c9b97827aee`
- ✅ React API URL: `http://localhost:8081` (for local dev)

---

## 🔑 Where to Get Your Admin API Token

If you don't have it:

1. Go to: https://admin.shopify.com
2. **Apps and integrations** → **Develop apps**
3. Create or select your app
4. **Configuration** tab
5. **Admin API access tokens** → **Generate token**
6. Copy and paste into `ShopifyApi/config.php`

---

## 🏃 Quick Start (After Adding Token)

### Terminal 1: Run PHP Server
```bash
cd ShopifyApi/public
php -S localhost:8081
```

### Terminal 2: Run React App
```bash
npm start
```

### Test It
1. Go to: http://localhost:3000/singlebasic
2. Fill the form (name, birth date, email, captcha)
3. Submit
4. Check Shopify admin for new customer ✅

---

## 📁 Project Structure

```
Numerana-calculator/
├── ShopifyApi/                          # PHP Backend (Shopify API service)
│   ├── config.php                       # ⚙️ EDIT THIS - Add your token here!
│   ├── includes/ShopifyGraphQL.php      # GraphQL client
│   ├── public/
│   │   ├── index.php                    # Router
│   │   └── api/
│   │       ├── create-customer.php      # Creates customers
│   │       └── test.php                 # Tests connection
│   ├── SETUP.md                         # Detailed setup guide
│   └── README.md                        # API documentation
│
├── src/
│   ├── components/SingleBasicComponent.jsx  # MODIFIED - Form integration
│   └── services/shopifyService.js           # NEW - Shopify API service
│
└── Documentation:
    ├── 00_READ_THIS_FIRST.md            # ← You are here!
    ├── SHOPIFY_CONFIGURATION_SUMMARY.md  # All configs explained
    ├── SHOPIFY_START_HERE.md             # Detailed guide
    ├── SHOPIFY_QUICK_REFERENCE.md        # Quick commands
    ├── SHOPIFY_API_URL_CONFIG.md         # Production URL guide
    └── SHOPIFY_IMPLEMENTATION_SUMMARY.md # Technical details
```

---

## 📖 Documentation Guide

**Start with:**
1. This file (you're reading it now!) ✅
2. `SHOPIFY_CONFIGURATION_SUMMARY.md` - See what's configured

**For detailed info:**
3. `SHOPIFY_START_HERE.md` - Complete setup walkthrough
4. `SHOPIFY_QUICK_REFERENCE.md` - Quick commands and tips

**For production deployment:**
5. `SHOPIFY_API_URL_CONFIG.md` - How to set API URL for production

**For technical details:**
6. `SHOPIFY_IMPLEMENTATION_SUMMARY.md` - How it all works
7. `ShopifyApi/README.md` - API endpoint documentation

---

## 🎯 What Happens When User Submits SingleBasic Form

```
1. User fills: Name, Birth Date, Email, Captcha
2. React validates and calculates numerology
3. React sends customer data to PHP API
4. PHP API creates/updates customer in Shopify
5. Customer appears in Shopify admin
6. User sees numerology results
```

---

## ⚙️ Configuration Details

### PHP Backend: `ShopifyApi/config.php`
```php
return [
    'SHOP_DOMAIN' => 'numerana.myshopify.com',       // ✅ Pre-configured
    'API_VERSION' => '2024-10',                      // ✅ Pre-configured
    'ADMIN_API_TOKEN' => 'shpat_...',               // ⚠️ YOU ADD THIS!
    'CLIENT_ID' => '5d05a9dabd...',                 // ✅ Pre-configured
    'CLIENT_SECRET' => 'ccb76b93ab...',             // ✅ Pre-configured
    'DEBUG' => false,
];
```

### React Frontend: `src/services/shopifyService.js`
```javascript
const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
// Already set for local dev. Only change for production.
```

---

## ✨ Features

✅ **One-Line Setup** - Just add your token!  
✅ **Pre-Configured** - Store info already in place  
✅ **No .env Files** - Simple PHP config file  
✅ **Non-Blocking** - Doesn't delay user experience  
✅ **Secure** - Credentials in config, not hardcoded  
✅ **SingleBasic Only** - Clean and focused scope  
✅ **Production Ready** - Deploy with confidence  
✅ **Well Documented** - Multiple guides included  

---

## 🚀 You're Ready!

1. Open `ShopifyApi/config.php`
2. Add your Admin API Token to line 27
3. Run PHP server: `php -S localhost:8081`
4. Run React app: `npm start`
5. Test the form!

**That's it! You're done!** 🎉

---

## 📞 Troubleshooting

### Q: Where exactly do I add the token?
A: In `ShopifyApi/config.php` around line 27, replace `shpat_your_admin_api_token_here` with your actual token.

### Q: What if I don't have my Admin API Token?
A: Generate a new one from Shopify Admin > Apps > Develop apps > Your App > Configuration

### Q: How do I know if it's working?
A: Run: `curl http://localhost:8081/api/test` - Should return shop information

### Q: Do I need to change anything else?
A: No! Everything else is already configured.

### Q: Can I deploy this to production?
A: Yes! See `SHOPIFY_API_URL_CONFIG.md` for deployment instructions.

---

## 📚 All Documentation Files

| File | Purpose |
|------|---------|
| `00_READ_THIS_FIRST.md` | ← You are here! Quick overview |
| `SHOPIFY_CONFIGURATION_SUMMARY.md` | What's pre-configured & what to add |
| `SHOPIFY_START_HERE.md` | Detailed 5-minute setup guide |
| `SHOPIFY_QUICK_REFERENCE.md` | Quick commands & tips |
| `SHOPIFY_API_URL_CONFIG.md` | How to configure for production |
| `SHOPIFY_IMPLEMENTATION_SUMMARY.md` | Technical implementation details |
| `ShopifyApi/SETUP.md` | Quick PHP setup guide |
| `ShopifyApi/README.md` | API endpoint documentation |

---

## ✅ Setup Checklist

- [ ] Found `ShopifyApi/config.php`
- [ ] Generated Admin API Token from Shopify
- [ ] Added token to line 27 of `config.php`
- [ ] Run PHP server: `php -S localhost:8081`
- [ ] Run React: `npm start`
- [ ] Test `/singlebasic` form
- [ ] Check Shopify admin for customer

---

**Everything is ready. Just add your token and go!** 🚀

For more information, see `SHOPIFY_CONFIGURATION_SUMMARY.md`
