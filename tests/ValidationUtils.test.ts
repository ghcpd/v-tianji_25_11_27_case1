import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidDate
} from '../src/utils/ValidationUtils';

describe('ValidationUtils', () => {
  describe('isValidEmail()', () => {
    test('validates email', () => {
      const result = isValidEmail('user@example.com');
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('email');
    });
  });

  describe('isValidPhone()', () => {
    test('validates phone numbers', () => {
      const usPhone = '123-456-7890';
      const intlPhone = '+1-123-456-7890';
      const result1 = isValidPhone(usPhone, 'US');
      const result2 = isValidPhone(intlPhone, 'International');
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });
  });

  describe('isValidUrl()', () => {
    test('validates URLs', () => {
      const relativeUrl = '/api/users';
      const localhostUrl = 'http://localhost:3000';
      const absoluteUrl = 'https://example.com';
      expect(isValidUrl(relativeUrl)).toBe(true);
      expect(isValidUrl(localhostUrl)).toBe(true);
      expect(isValidUrl(absoluteUrl)).toBe(true);
    });
  });

  describe('isValidDate()', () => {
    test('validates dates', () => {
      const isoDate = '2024-01-15';
      const usDate = '01/15/2024';
      const euDate = '15.01.2024';
      expect(isValidDate(isoDate)).toBe(true);
      expect(isValidDate(usDate)).toBe(true);
      expect(isValidDate(euDate)).toBe(true);
    });
  });
});

