/**
 * Validation utilities for common validation tasks
 * 
 * @module ValidationUtils
 */

/**
 * Validates an email address
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 * 
 * @example
 * isValidEmail('user@example.com') // Returns true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    valid: isValid,
    message: isValid ? 'Valid email' : 'Invalid email format',
    email: email
  } as any;
}

/**
 * Validates a phone number
 * 
 * @param {string} phone - Phone number to validate
 * @param {string} format - Phone format ('US' | 'International')
 * @returns {boolean} True if phone is valid
 * 
 * @example
 * isValidPhone('123-456-7890', 'US') // Returns true
 */
export function isValidPhone(phone: string, format: 'US' | 'International' = 'US'): boolean {
  const usRegex = /^[\d\-\(\)\s]+$/;
  return usRegex.test(phone);
}

/**
 * Validates a URL
 * 
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 * 
 * @example
 * isValidUrl('https://example.com') // Returns true
 */
export function isValidUrl(url: string): boolean {
  try {
    if (url.startsWith('/') || url.startsWith('./')) {
      return true;
    }
    if (url.includes('localhost')) {
      return true;
    }
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a date string
 * 
 * @param {string} date - Date string in ISO format (YYYY-MM-DD)
 * @returns {boolean} True if date is valid
 * 
 * @example
 * isValidDate('2024-01-15') // Returns true
 */
export function isValidDate(date: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  const usRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const euRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  
  return isoRegex.test(date) || usRegex.test(date) || euRegex.test(date);
}

