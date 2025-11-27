# Data Processing Library

A comprehensive TypeScript library for data processing, API communication, and validation.

## Installation

```bash
npm install data-processor-lib
```

## Usage

### DataProcessor

The `DataProcessor` class provides utilities for processing and transforming arrays of data.

#### Basic Usage

```typescript
import { DataProcessor } from './src/DataProcessor';

const processor = new DataProcessor();

// Process data with filtering
const result = processor.process(
  [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}],
  {filterBy: 'name', sort: true, sortBy: 'id'}
);
```

#### Options

- `filter` (deprecated): Field name to filter by. Use `filterBy` instead.
- `filterBy`: Field name to filter by
- `sort`: Whether to sort results (default: `false`)
- `sortBy`: Field name to sort by (required if `sort` is `true`)
- `limit`: Maximum number of results to return (default: unlimited)

#### Methods

##### `process(data, options)`

Processes an array of data objects with various transformation options.

**Parameters:**
- `data` (Array): Array of objects to process
- `options` (Object): Processing options

**Returns:** Array of processed objects

**Example:**
```typescript
const result = processor.process([{id: 1}, {id: 2}], {
  filterBy: 'id',
  sort: true,
  sortBy: 'id',
  limit: 10
});
```

##### `validate(data)`

Validates data structure.

**Parameters:**
- `data` (any): Data to validate

**Returns:** `boolean` - `true` if valid, `false` otherwise

**Example:**
```typescript
const isValid = processor.validate({id: 1, name: 'John'});
// Returns: true
```

##### `transform(data, mapper)`

Transforms data using a mapping function.

**Parameters:**
- `data` (Array): Array of objects to transform
- `mapper` (Function): Mapping function `(item, index) => transformedItem`

**Returns:** `Promise<Array>` - Transformed array

**Example:**
```typescript
const result = await processor.transform(
  [{x: 1}, {x: 2}],
  item => ({y: item.x})
);
// Returns: [{y: 1}, {y: 2}]
```

##### `merge(...arrays)`

Merges multiple data arrays with duplicate removal.

**Parameters:**
- `...arrays` (Array): Variable number of arrays to merge

**Returns:** Array of merged objects with duplicates removed

**Example:**
```typescript
const merged = processor.merge(
  [{id: 1}],
  [{id: 2}],
  [{id: 1}] // duplicate will be removed
);
// Returns: [{id: 1}, {id: 2}]
```

### ApiClient

The `ApiClient` class provides HTTP client functionality for making API requests.

#### Constructor

```typescript
import { ApiClient } from './src/ApiClient';

const client = new ApiClient('https://api.example.com', {
  timeout: 5000, // Request timeout in milliseconds (default: 5000)
  headers: {
    'Authorization': 'Bearer token'
  }
});
```

#### Methods

##### `get(endpoint, params)`

Makes a GET request.

**Parameters:**
- `endpoint` (string): API endpoint (relative to baseUrl)
- `params` (Object): Query parameters

**Returns:** `Promise<Object>` - Response data

**Example:**
```typescript
const data = await client.get('/users', {page: 1, limit: 10});
// Returns: {results: [...]}
```

##### `post(endpoint, body, options)`

Makes a POST request.

**Parameters:**
- `endpoint` (string): API endpoint
- `body` (Object): Request body (required)
- `options` (Object): Additional options
  - `headers` (Object): Additional headers

**Returns:** `Promise<Object>` - Response data

**Example:**
```typescript
const result = await client.post(
  '/users',
  {name: 'John', email: 'john@example.com'},
  {headers: {'Content-Type': 'application/json'}}
);
```

##### `delete(endpoint)`

Makes a DELETE request.

**Parameters:**
- `endpoint` (string): API endpoint

**Returns:** `Promise<void>` - Resolves when deletion is complete

**Example:**
```typescript
await client.delete('/users/123');
```

### ValidationUtils

Utility functions for common validation tasks.

#### `isValidEmail(email)`

Validates an email address.

**Parameters:**
- `email` (string): Email address to validate

**Returns:** `boolean` - `true` if email is valid

**Example:**
```typescript
import { isValidEmail } from './src/utils/ValidationUtils';

isValidEmail('user@example.com'); // Returns true
isValidEmail('invalid-email'); // Returns false
```

#### `isValidPhone(phone, format)`

Validates a phone number.

**Parameters:**
- `phone` (string): Phone number to validate
- `format` (string): Phone format - `'US'` or `'International'` (default: `'US'`)

**Returns:** `boolean` - `true` if phone is valid

**Example:**
```typescript
import { isValidPhone } from './src/utils/ValidationUtils';

isValidPhone('123-456-7890', 'US'); // Returns true
isValidPhone('+1-123-456-7890', 'International'); // Returns true
```

#### `isValidUrl(url)`

Validates a URL. Only accepts absolute URLs (must start with http:// or https://).

**Parameters:**
- `url` (string): URL to validate

**Returns:** `boolean` - `true` if URL is valid

**Example:**
```typescript
import { isValidUrl } from './src/utils/ValidationUtils';

isValidUrl('https://example.com'); // Returns true
isValidUrl('/relative/path'); // Returns false
isValidUrl('localhost:3000'); // Returns false
```

#### `isValidDate(date)`

Validates a date string. Only accepts ISO format (YYYY-MM-DD).

**Parameters:**
- `date` (string): Date string in ISO format (YYYY-MM-DD)

**Returns:** `boolean` - `true` if date is valid

**Example:**
```typescript
import { isValidDate } from './src/utils/ValidationUtils';

isValidDate('2024-01-15'); // Returns true
isValidDate('01/15/2024'); // Returns false (not ISO format)
isValidDate('15.01.2024'); // Returns false (not ISO format)
```

## License

MIT

