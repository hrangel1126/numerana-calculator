<?php
/**
 * ShopifyApi Configuration File
 * 
 * This is the main configuration file for the Shopify API service.
 * These credentials are from the original Numerana-calculator project.
 * 
 * No need for .env files - just edit this file directly!
 */

return [
    // ============================================
    // Shopify Store Configuration
    // From original: src/config/shopify.js
    // ============================================
    
    // Your Shopify store domain (without https://)
    'SHOP_DOMAIN' => 'numerana.myshopify.com',
    
    // Shopify Admin API version
    'API_VERSION' => '2024-10',
    
    // ============================================
    // Shopify Admin API Credentials
    // From original: server/server.js
    // Get from: Shopify Admin > Apps and integrations > Develop apps > Your App > Configuration
    // ============================================
    
    // Admin API Access Token (starts with shpat_)
    // This token allows the API to create/update customers in your Shopify store
    'ADMIN_API_TOKEN' => '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',
    
    // Optional: OAuth credentials (for future use)
    // From original: src/config/shopify.js
    'CLIENT_ID' => '5d05a9dabd8a17d05c510a55868be7fd',
    'CLIENT_SECRET' => 'ccb76b93ab32f5669c2d2c9b97827aee',
    
    // ============================================
    // Application Settings
    // ============================================
    
    // Enable debug mode for detailed logging
    // Set to true to see detailed logs in logs/shopify.log
    'DEBUG' => false,
    
    // Log file path (relative to this config file's directory)
    'LOG_FILE' => __DIR__ . '/../logs/shopify.log',
    
    // ============================================
    // API Endpoints Configuration
    // ============================================
    
    // Base path for API endpoints
    'API_BASE_PATH' => '/api',
    
    // Allowed origins for CORS (for development, set to *)
    // For production, set specific domain: 'https://yourdomain.com'
    'CORS_ORIGIN' => '*',
];
?>
