<?php
/**
 * Shopify Customer Creation Endpoint
 * POST /api/create-customer
 * 
 * Creates or updates a customer in Shopify with numerology data
 */

// Enable error logging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Set response headers
header('Content-Type: application/json');

// Handle CORS preflight request FIRST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
    header('Access-Control-Max-Age: 3600');
    http_response_code(200);
    exit(0);
}

// Set response headers for actual requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS, GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
    exit;
}

try {
    // Include necessary files
    require_once __DIR__ . '/../../includes/ShopifyGraphQL.php';
    require_once __DIR__ . '/../../config.php';

    // Load configuration
    $config = require(__DIR__ . '/../../config.php');

    // Get POST data
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    // Log request if debug is enabled
    if ($config['DEBUG']) {
        error_log("Received customer creation request: " . json_encode($data));
    }

    // Validate required fields
    $requiredFields = ['email', 'firstName', 'birthdate'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => "Missing required field: $field"
            ]);
            exit;
        }
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email format'
        ]);
        exit;
    }

    // Validate birthdate format (DD/MM/YYYY or YYYY-MM-DD)
    $birthdate = $data['birthdate'];
    if (!isValidDate($birthdate)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid birthdate format. Use DD/MM/YYYY or YYYY-MM-DD'
        ]);
        exit;
    }

    // Initialize Shopify GraphQL client
    $shopify = new ShopifyGraphQL($config);

    // Check if customer exists
    $existingCustomer = $shopify->getCustomerByEmail($data['email']);

    if ($existingCustomer) {
        // Update existing customer
        $response = $shopify->updateCustomerMetafields(
            $existingCustomer['id'],
            $birthdate,
            $data['consentedAt'] ?? date('c')
        );

        // Check for errors
        if (isset($response['errors'])) {
            throw new Exception(json_encode($response['errors']));
        }

        if (isset($response['data']['customerUpdate']['userErrors']) && 
            count($response['data']['customerUpdate']['userErrors']) > 0) {
            throw new Exception(json_encode($response['data']['customerUpdate']['userErrors']));
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'action' => 'updated',
            'message' => 'Customer updated successfully',
            'customer' => $response['data']['customerUpdate']['customer'] ?? [],
            'timestamp' => date('c')
        ]);

    } else {
        // Create new customer
        $response = $shopify->createCustomer([
            'email' => $data['email'],
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'] ?? '',
            'birthdate' => $birthdate,
            'consentedAt' => $data['consentedAt'] ?? date('c')
        ]);

        // Check for errors
        if (isset($response['errors'])) {
            throw new Exception(json_encode($response['errors']));
        }

        if (isset($response['data']['customerCreate']['userErrors']) && 
            count($response['data']['customerCreate']['userErrors']) > 0) {
            throw new Exception(json_encode($response['data']['customerCreate']['userErrors']));
        }

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'action' => 'created',
            'message' => 'Customer created successfully',
            'customer' => $response['data']['customerCreate']['customer'] ?? [],
            'timestamp' => date('c')
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage(),
        'timestamp' => date('c')
    ]);
}

/**
 * Validate date format
 * Accepts DD/MM/YYYY or YYYY-MM-DD
 */
function isValidDate($date) {
    // Try DD/MM/YYYY format
    $formats = ['d/m/Y', 'Y-m-d'];
    
    foreach ($formats as $format) {
        $d = \DateTime::createFromFormat($format, $date);
        if ($d && $d->format($format) === $date) {
            return true;
        }
    }
    
    return false;
}
?>
