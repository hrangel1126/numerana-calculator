# ShopifyApi - Numerology Customer Integration

A PHP-based REST API service that integrates the Numerana Calculator with Shopify, creating/updating customer records with numerology data.

## Features

- ✅ Create new customers in Shopify with numerology data
- ✅ Update existing customers with birth date and consent information
- ✅ GraphQL support for Shopify Admin API
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling and validation
- ✅ Debug logging support
- ✅ Simple PHP configuration (no .env files needed)

## Project Structure

```
ShopifyApi/
├── public/
│   ├── index.php                 # Main router
│   └── api/
│       ├── create-customer.php   # Customer creation endpoint
│       └── test.php              # Connection test endpoint
├── includes/
│   └── ShopifyGraphQL.php       # GraphQL helper class
├── config.php                   # Configuration file (EDIT THIS!)
├── logs/                        # Log files (auto-created)
├── SETUP.md                     # Quick setup guide
└── README.md                    # This file
```

## ⚡ Quick Setup (2 minutes)

### 1. Edit Configuration File

Open `ShopifyApi/config.php` and update:

```php
'SHOP_DOMAIN' => 'your-store.myshopify.com',
'API_VERSION' => '2024-10',
'ADMIN_API_TOKEN' => 'shpat_your_token_here',
```

That's it! No need for `.env` files.

### 2. Get Your Shopify Token

1. Go to Shopify Admin: https://admin.shopify.com
2. **Apps and integrations** → **Develop apps**
3. Create or select your app
4. **Configuration** tab → **Admin API access tokens** → **Generate token**
5. Copy the token and paste into `config.php`

### 3. Run PHP Server

```bash
cd ShopifyApi/public
php -S localhost:8081
```

### 2. Configure PHP Server

For local development, you can use PHP's built-in server:

```bash
cd ShopifyApi/public
php -S localhost:8081
```

Then access the API at: `http://localhost:8081/`

### 3. Get Shopify Admin API Token

1. Go to your Shopify Admin dashboard
2. Navigate to **Apps and integrations** > **Develop apps**
3. Create a new app or select existing one
4. Go to **Configuration** tab
5. Under **Admin API access tokens**, generate a token
6. Copy the token and add to `.env`

## API Endpoints

### Test Connection
```
GET /api/test

Response:
{
    "success": true,
    "message": "Successfully connected to Shopify",
    "shop": {
        "name": "Your Store Name",
        "domain": "your-store.myshopify.com",
        "email": "contact@yourstore.com"
    },
    "timestamp": "2024-01-15T10:30:00+00:00"
}
```

### Create/Update Customer
```
POST /api/create-customer

Request Body:
{
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "15/05/1990",
    "consentedAt": "2024-01-15T10:30:00Z"  // Optional
}

Response (New Customer):
{
    "success": true,
    "action": "created",
    "message": "Customer created successfully",
    "customer": { ... },
    "timestamp": "2024-01-15T10:30:00+00:00"
}

Response (Existing Customer):
{
    "success": true,
    "action": "updated",
    "message": "Customer updated successfully",
    "customer": { ... },
    "timestamp": "2024-01-15T10:30:00+00:00"
}
```

## Integration with React (SingleBasic)

In `src/components/SingleBasicComponent.jsx`, add to `handleSubmit()`:

```javascript
// After form validation
const emailInput = document.getElementById('email-input');
const email = emailInput.value;

// Call Shopify API
try {
    const response = await fetch('http://localhost:8081/api/create-customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            firstName: nombre,
            birthdate: formattedDate,
            consentedAt: new Date().toISOString()
        })
    });

    const result = await response.json();
    if (result.success) {
        console.log('Customer saved to Shopify:', result);
        // Continue with calculation
    } else {
        console.error('Shopify error:', result.error);
        // Handle error
    }
} catch (error) {
    console.error('API error:', error);
}
```

## Error Handling

Common errors and their meanings:

| Error | Cause | Solution |
|-------|-------|----------|
| Missing required field | Form validation failed | Check all fields are filled |
| Invalid email format | Email is malformed | Provide valid email |
| Invalid birthdate format | Date format incorrect | Use DD/MM/YYYY or YYYY-MM-DD |
| Shopify API token not configured | .env file not set | Copy .env.example to .env and fill values |
| HTTP 500 Shopify connection error | Can't reach Shopify API | Check token and network |

## Deployment

### On Shared Hosting (Bluehost, GoDaddy, etc.)

1. Upload all files to `public_html/shopifyapi/`
2. Create `.env` file with your credentials
3. Access at: `https://yourdomain.com/shopifyapi/api/create-customer`

### On Vercel (Serverless Functions)

1. Convert to serverless format (requires restructuring)
2. Or use a separate PHP hosting service

### On DigitalOcean App Platform

1. Create App from GitHub repo
2. Set environment variables
3. Deploy

## Testing

### Using cURL

```bash
# Test connection
curl http://localhost:8081/api/test

# Create customer
curl -X POST http://localhost:8081/api/create-customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "15/05/1990"
  }'
```

### Using Postman

1. Import the endpoints above
2. Set method to POST for create-customer
3. Add JSON body
4. Send request

## Troubleshooting

### PHP version compatibility
- Requires PHP 7.4 or higher
- Check your hosting's PHP version

### CORS errors
- API already has CORS headers enabled
- If still getting errors, check browser console for details

### Logs
- Check `/logs/shopify.log` if `DEBUG=true` in `.env`
- Use PHP error logs: check hosting control panel

## Security Notes

⚠️ **Important for Production:**

1. Never commit `.env` file with real tokens
2. Use HTTPS in production
3. Validate all inputs server-side (already done)
4. Consider adding API key authentication
5. Implement rate limiting
6. Store sensitive data securely

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Shopify API documentation: https://shopify.dev/docs/admin-api
3. Check PHP logs for error details

## License

Part of Numerana Calculator project
