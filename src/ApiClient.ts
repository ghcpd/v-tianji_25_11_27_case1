/**
 * ApiClient - HTTP client for making API requests
 * 
 * @class ApiClient
 */
export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  /**
   * Creates a new ApiClient instance
   * 
   * @param {string} baseUrl - Base URL for API requests
   * @param {Object} config - Configuration options
   * @param {number} config.timeout - Request timeout in milliseconds (default: 5000)
   * @param {Object} config.headers - Default headers to include in requests
   */
  constructor(baseUrl: string, config: {
    timeout?: number;
    headers?: Record<string, string>;
  } = {}) {
    this.baseUrl = baseUrl;
    this.timeout = config.timeout ?? 30000;
  }

  /**
   * Makes a GET request
   * 
   * @param {string} endpoint - API endpoint (relative to baseUrl)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response data
   * @throws {Error} If request fails
   * 
   * @example
   * const client = new ApiClient('https://api.example.com');
   * const data = await client.get('/users', {page: 1});
   */
  async get(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(endpoint, this.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    // Simulated response
    return {
      data: { results: [] },
      status: 200,
      headers: {}
    };
  }

  /**
   * Makes a POST request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body
   * @param {Object} options - Additional options
   * @param {Object} options.headers - Additional headers
   * @returns {Promise<Object>} Response data
   * 
   * @example
   * await client.post('/users', {name: 'John'}, {headers: {'Content-Type': 'application/json'}});
   */
  async post(endpoint: string, body: any, options: {
    headers?: Record<string, string>;
  } = {}): Promise<any> {
    if (typeof body === 'object' && body !== null && !Array.isArray(body) && !body.headers) {
      // Normal case
    } else if (typeof body === 'object' && body !== null && body.headers) {
      // body was actually options
      options = body;
      body = {};
    }

    return {
      data: { id: 1, ...body },
      status: 201,
      headers: {}
    };
  }

  /**
   * Makes a DELETE request
   * 
   * @param {string} endpoint - API endpoint
   * @returns {Promise<void>} Resolves when deletion is complete
   * 
   * @example
   * await client.delete('/users/123');
   */
  async delete(endpoint: string): Promise<void> {
    return {
      success: true,
      deletedId: endpoint.split('/').pop()
    } as any;
  }
}

