<?php
/**
 * ShopifyGraphQL Helper Class
 * Handles all GraphQL queries and mutations for Shopify API
 */

class ShopifyGraphQL
{
    private $shopDomain;
    private $apiVersion;
    private $accessToken;
    private $debug;
    private $logFile;

    public function __construct($config)
    {
        $this->shopDomain = $config['SHOP_DOMAIN'];
        $this->apiVersion = $config['API_VERSION'];
        $this->accessToken = $config['ADMIN_API_TOKEN'];
        $this->debug = $config['DEBUG'] ?? false;
        $this->logFile = $config['LOG_FILE'] ?? null;

        // Validate token
        if (empty($this->accessToken) || $this->accessToken === 'YOUR_ADMIN_API_TOKEN_HERE') {
            throw new Exception('Shopify Admin API token is not configured. Please edit ShopifyApi/config.php and add your token to ADMIN_API_TOKEN');
        }
    }

    /**
     * Execute GraphQL query or mutation
     */
    public function execute($query, $variables = null)
    {
        try {
            $url = $this->getGraphQLEndpoint();
            
            $payload = [
                'query' => $query
            ];

            if ($variables) {
                $payload['variables'] = $variables;
            }

            $response = $this->makeRequest($url, $payload);
            
            if ($this->debug) {
                $this->log("GraphQL Response: " . json_encode($response));
            }

            return $response;
        } catch (Exception $e) {
            $this->log("GraphQL Error: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get customer by email
     */
    public function getCustomerByEmail($email)
    {
        $query = '
            query getCustomerByEmail($query: String!) {
                customers(first: 1, query: $query) {
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            email
                            emailMarketingConsent {
                                marketingState
                            }
                            metafields(first: 10) {
                                edges {
                                    node {
                                        id
                                        namespace
                                        key
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ';

        $variables = [
            'query' => 'email:' . $email
        ];

        $response = $this->execute($query, $variables);

        if (isset($response['data']['customers']['edges'][0])) {
            return $response['data']['customers']['edges'][0]['node'];
        }

        return null;
    }

    /**
     * Create new customer
     */
    public function createCustomer($customerData)
    {
        $mutation = '
            mutation customerCreate($input: CustomerInput!) {
                customerCreate(input: $input) {
                    customer {
                        id
                        email
                        firstName
                        lastName
                        emailMarketingConsent {
                            marketingState
                        }
                        metafields(first: 10) {
                            edges {
                                node {
                                    id
                                    namespace
                                    key
                                    value
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        ';

        $metafields = [
            [
                'namespace' => 'custom',
                'key' => 'dob',
                'value' => $customerData['birthdate']
            ]
        ];

        if (!empty($customerData['consentedAt'])) {
            $metafields[] = [
                'namespace' => 'custom',
                'key' => 'consented_at',
                'value' => $customerData['consentedAt']
            ];
        }

        $variables = [
            'input' => [
                'email' => $customerData['email'],
                'firstName' => $customerData['firstName'],
                'lastName' => $customerData['lastName'] ?? '',
                'emailMarketingConsent' => [
                    'marketingState' => 'SUBSCRIBED',
                    'marketingOptInLevel' => 'SINGLE_OPT_IN'
                ],
                'metafields' => $metafields
            ]
        ];

        return $this->execute($mutation, $variables);
    }

    /**
     * Update customer metafields
     */
    public function updateCustomerMetafields($customerId, $birthdate, $consentedAt = null)
    {
        $mutation = '
            mutation updateCustomerMetafields($input: CustomerInput!) {
                customerUpdate(input: $input) {
                    customer {
                        id
                        email
                        firstName
                        metafields(first: 10) {
                            edges {
                                node {
                                    id
                                    namespace
                                    key
                                    value
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        ';

        $metafields = [
            [
                'namespace' => 'custom',
                'key' => 'dob',
                'value' => $birthdate
            ]
        ];

        if (!empty($consentedAt)) {
            $metafields[] = [
                'namespace' => 'custom',
                'key' => 'consented_at',
                'value' => $consentedAt
            ];
        }

        $variables = [
            'input' => [
                'id' => $customerId,
                'metafields' => $metafields
            ]
        ];

        return $this->execute($mutation, $variables);
    }

    /**
     * Test connection to Shopify
     */
    public function testConnection()
    {
        $query = '{
            shop {
                name
                myshopifyDomain
                email
            }
        }';

        try {
            $response = $this->execute($query);
            if (isset($response['data']['shop'])) {
                return [
                    'success' => true,
                    'shop' => $response['data']['shop']
                ];
            }
            return [
                'success' => false,
                'error' => 'Invalid response from Shopify'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Make HTTP request to Shopify
     */
    private function makeRequest($url, $payload)
    {
        $ch = curl_init($url);

        $headers = [
            'Content-Type: application/json',
            'X-Shopify-Access-Token: ' . $this->accessToken,
            'Accept: application/json'
        ];

        curl_setopt_array($ch, [
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CONNECTTIMEOUT => 10
        ]);

        if ($this->debug) {
            $this->log("Request URL: " . $url);
            $this->log("Request Payload: " . json_encode($payload));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);

        curl_close($ch);

        if ($curlError) {
            throw new Exception("cURL Error: " . $curlError);
        }

        $decoded = json_decode($response, true);

        if ($httpCode !== 200) {
            throw new Exception("Shopify API Error: HTTP $httpCode - " . json_encode($decoded));
        }

        if (isset($decoded['errors'])) {
            throw new Exception("GraphQL Error: " . json_encode($decoded['errors']));
        }

        return $decoded;
    }

    /**
     * Get GraphQL endpoint URL
     */
    private function getGraphQLEndpoint()
    {
        return "https://{$this->shopDomain}/admin/api/{$this->apiVersion}/graphql.json";
    }

    /**
     * Log message
     */
    private function log($message)
    {
        if ($this->logFile && is_writable(dirname($this->logFile))) {
            $timestamp = date('Y-m-d H:i:s');
            file_put_contents($this->logFile, "[$timestamp] $message\n", FILE_APPEND);
        }
    }
}
?>
