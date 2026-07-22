/**
 * Shopify Service
 * Handles communication with ShopifyApi (PHP backend)
 * Used exclusively for SingleBasic component
 * 
 * ================================================================
 * ⚠️  CONFIGURATION - READ THIS IF YOU'RE DEPLOYING TO PRODUCTION
 * ================================================================
 * 
 * This service communicates with the PHP backend (ShopifyApi).
 * You MUST update the SHOPIFY_API_BASE_URL to point to your PHP server.
 * 
 * LOCAL DEVELOPMENT:
 *   const SHOPIFY_API_BASE_URL = 'http://localhost:8081';
 * 
 * PRODUCTION (examples):
 *   const SHOPIFY_API_BASE_URL = 'https://your-domain.com/shopifyapi';
 *   const SHOPIFY_API_BASE_URL = 'https://api.your-domain.com';
 *   const SHOPIFY_API_BASE_URL = 'https://shopify-api.your-hosting.com';
 * 
 * The PHP backend (ShopifyApi) should be running at this URL and
 * serve requests like:
 *   - POST {SHOPIFY_API_BASE_URL}/api/create-customer
 *   - GET {SHOPIFY_API_BASE_URL}/api/test
 * 
 * ================================================================
 * EDIT THE URL BELOW TO MATCH YOUR PHP SERVER LOCATION
 * ================================================================
 */

// ⚙️  CHANGE THIS URL TO YOUR PHP SERVER
const SHOPIFY_API_BASE_URL = 'https://numerana.mx/ShopifyApi/public'; // Change for production!

// Logging
console.log('🔧 Shopify Service Configuration:', {
  apiBaseUrl: SHOPIFY_API_BASE_URL,
  endpoint: `${SHOPIFY_API_BASE_URL}/api/create-customer`,
  note: 'Make sure this URL points to your PHP ShopifyApi server'
});

/**
 * Send customer data to Shopify via PHP API
 * @param {Object} customerData - Customer information
 * @param {string} customerData.email - Customer email
 * @param {string} customerData.firstName - Customer first name
 * @param {string} customerData.lastName - Customer last name (optional)
 * @param {string} customerData.birthdate - Customer birth date (DD/MM/YYYY format)
 * @returns {Promise<Object>} Response from API
 */
export const createOrUpdateShopifyCustomer = async (customerData) => {
  try {
    console.log('📤 Sending customer data to Shopify:', {
      email: customerData.email,
      firstName: customerData.firstName,
      birthdate: customerData.birthdate
    });

    // Use relative URL if deployed on same domain, otherwise use absolute URL
    const endpoint = SHOPIFY_API_BASE_URL.startsWith('http') 
      ? `${SHOPIFY_API_BASE_URL}/api/create-customer`
      : `/ShopifyApi/public/api/create-customer`;

    console.log('🔗 API Endpoint:', endpoint);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: customerData.email,
        firstName: customerData.firstName,
        lastName: customerData.lastName || '',
        birthdate: customerData.birthdate,
        consentedAt: new Date().toISOString()
      })
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    console.log('📥 Shopify API Response:', result);

    // Check if the API returned success
    if (!result.success) {
      throw new Error(result.error || 'Unknown error from Shopify API');
    }

    return {
      success: true,
      action: result.action, // 'created' or 'updated'
      message: result.message,
      customer: result.customer,
      timestamp: result.timestamp
    };

  } catch (error) {
    console.error('❌ Error creating/updating Shopify customer:', {
      message: error.message,
      type: error.name,
      url: `${SHOPIFY_API_BASE_URL}/api/create-customer`
    });

    // Return error object instead of throwing
    return {
      success: false,
      error: error.message || 'Failed to save customer to Shopify',
      details: error
    };
  }
};

/**
 * Test connection to Shopify API
 * @returns {Promise<boolean>} True if connection successful
 */
export const testShopifyConnection = async () => {
  try {
    console.log('🔍 Testing Shopify connection...');

    const response = await fetch(`${SHOPIFY_API_BASE_URL}/api/test`);

    if (!response.ok) {
      console.error('❌ Shopify test failed with HTTP', response.status);
      return false;
    }

    const result = await response.json();

    if (result.success) {
      console.log('✅ Shopify connection successful:', result.shop);
      return true;
    } else {
      console.error('❌ Shopify test returned success=false:', result.error);
      return false;
    }

  } catch (error) {
    console.error('❌ Shopify connection test error:', error.message);
    return false;
  }
};

export default {
  createOrUpdateShopifyCustomer,
  testShopifyConnection
};
