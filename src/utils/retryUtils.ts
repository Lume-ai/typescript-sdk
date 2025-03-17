export async function retryWithBackoff<T>(
    operation: () => Promise<T>, 
    retries: number = 5, 
    delay: number = 1000, 
    factor: number = 2
  ): Promise<T> {
    try {
      return await operation(); // Try executing the request
    } catch (error: any) {
      // List of error codes that should trigger a retry
      const retryableErrorCodes = [408, 429, 502, 503, 504]; // Timeout, rate limit, server errors
      const retryableNetworkErrors = ['ECONNRESET', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'ECONNABORTED'];
      
      const shouldRetry = 
        retries > 0 && (
          // HTTP status codes
          (error.response && retryableErrorCodes.includes(error.response.status)) ||
          // Axios error codes
          (error.code && retryableNetworkErrors.includes(error.code)) ||
          // Other timeout indicators
          (error.code === 'ERR_NETWORK')
        );
      
      if (!shouldRetry) throw error; // Don't retry if conditions aren't met
      // Get a meaningful error code/status for logging
      const errorCode = error.response?.status || error.code || 'NETWORK_ERROR';
      console.warn(`Request failed with ${errorCode} - retrying in ${delay}ms (${retries} retries left)...`);
      
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      // Retry recursively with exponential backoff
      return retryWithBackoff(operation, retries - 1, delay * factor, factor);
    }
  }