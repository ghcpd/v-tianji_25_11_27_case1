import { ApiClient } from '../src/ApiClient';

describe('ApiClient', () => {
  describe('Constructor', () => {
    test('timeout default value', () => {
      const client = new ApiClient('https://api.example.com');
      expect((client as any).timeout).toBe(30000);
    });
  });

  describe('get() method', () => {
    test('returns response', async () => {
      const client = new ApiClient('https://api.example.com');
      const result = await client.get('/users', {page: 1});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('headers');
    });
  });

  describe('post() method', () => {
    test('post with body', async () => {
      const client = new ApiClient('https://api.example.com');
      const result1 = await client.post('/users', {name: 'John'});
      const result2 = await client.post('/users', {headers: {'X-Custom': 'value'}});
      expect(result1.data).toHaveProperty('name', 'John');
      expect(result2.data).toEqual({id: 1});
    });
  });

  describe('delete() method', () => {
    test('deletes resource', async () => {
      const client = new ApiClient('https://api.example.com');
      const result = await client.delete('/users/123');
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('deletedId');
    });
  });
});

