<?php
/**
 * Test Endpoint
 * GET /api/test
 * 
 * Tests the connection to Shopify
 */

header('Content-Type: application/json');

// Handle CORS preflight request FIRST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
    header('Access-Control-Max-Age: 3600');
    http_response_code(200);
    exit(0);
}

// Set response headers for actual requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

try {
    require_once __DIR__ . '/../../includes/ShopifyGraphQL.php';
    require_once __DIR__ . '/../../config.php';

    $config = require(__DIR__ . '/../../config.php');

    // Check if token is configured
    if (empty($config['ADMIN_API_TOKEN'])) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Shopify API token not configured',
            'hint' => 'Please set SHOPIFY_ADMIN_API_TOKEN in .env file'
        ]);
        exit;
    }

    // Test Shopify connection
    $shopify = new ShopifyGraphQL($config);
    $testResult = $shopify->testConnection();

    if ($testResult['success']) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Successfully connected to Shopify',
            'shop' => $testResult['shop'],
            'timestamp' => date('c')
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $testResult['error'],
            'timestamp' => date('c')
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('c')
    ]);
}
?>
