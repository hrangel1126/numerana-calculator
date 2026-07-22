<?php
/**
 * ShopifyApi Router
 * Main entry point for all API requests
 */

header('Content-Type: application/json');

// Handle CORS preflight request FIRST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
    header('Access-Control-Max-Age: 3600');
    http_response_code(200);
    exit(0);
}

// Set response headers for actual requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

// Get the request path
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = '/ShopifyApi/public';

// Remove base path if present
if (strpos($requestUri, $basePath) === 0) {
    $requestUri = substr($requestUri, strlen($basePath));
}

// Route the request
if ($requestUri === '/' || $requestUri === '/index.php' || empty($requestUri)) {
    // Root endpoint
    echo json_encode([
        'message' => 'ShopifyApi Server Running',
        'version' => '1.0.0',
        'timestamp' => date('c'),
        'endpoints' => [
            'POST /api/create-customer' => 'Create or update Shopify customer',
            'GET /api/test' => 'Test Shopify connection'
        ]
    ]);
} elseif (strpos($requestUri, '/api/create-customer') === 0) {
    require_once __DIR__ . '/api/create-customer.php';
} elseif (strpos($requestUri, '/api/test') === 0) {
    require_once __DIR__ . '/api/test.php';
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Endpoint not found',
        'path' => $requestUri
    ]);
}
?>
