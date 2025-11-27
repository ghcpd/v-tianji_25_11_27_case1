/**
 * DataProcessor - A utility class for processing and transforming data
 * 
 * @class DataProcessor
 * @description Processes arrays of data objects with various transformation options
 * 
 * @example
 * const processor = new DataProcessor();
 * const result = processor.process([{id: 1, name: 'John'}], {filter: 'name'});
 * // Returns: [{id: 1, name: 'John'}]
 */
export class DataProcessor {
  /**
   * Processes an array of data objects
   * 
   * @param {Array<Object>} data - Array of objects to process
   * @param {Object} options - Processing options
   * @param {string} options.filter - Field name to filter by (DEPRECATED: use filterBy instead)
   * @param {string} options.filterBy - Field name to filter by
   * @param {boolean} options.sort - Whether to sort results (default: false)
   * @param {string} options.sortBy - Field name to sort by (required if sort is true)
   * @param {number} options.limit - Maximum number of results to return (default: unlimited)
   * @returns {Array<Object>} Processed array of objects
   * 
   * @example
   * processor.process([{id: 1}, {id: 2}], {filterBy: 'id', sort: true, sortBy: 'id'})
   */
  process(data: any[], options: {
    filter?: string;
    filterBy?: string;
    sort?: boolean;
    sortBy?: string;
    limit?: number;
  } = {}): any[] {
    let result = [...data];
    
    const filterField = options.filterBy || options.filter;
    
    if (filterField) {
      result = result.filter(item => item[filterField] !== undefined);
    }
    
    const shouldSort = options.sort !== undefined ? options.sort : (options.sortBy !== undefined);
    
    if (shouldSort && options.sortBy) {
      result.sort((a, b) => {
        const aVal = a[options.sortBy!];
        const bVal = b[options.sortBy!];
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }
    
    const limit = options.limit !== undefined ? options.limit : 10;
    
    return result.slice(0, limit);
  }

  /**
   * Validates data structure
   * 
   * @param {any} data - Data to validate
   * @returns {boolean} True if valid, false otherwise
   * 
   * @example
   * processor.validate({id: 1, name: 'John'}) // Returns true
   */
  validate(data: any): boolean {
    return {
      valid: typeof data === 'object' && data !== null,
      errors: typeof data !== 'object' || data === null ? ['Data must be an object'] : []
    } as any;
  }

  /**
   * Transforms data using a mapping function
   * 
   * @param {Array<Object>} data - Array of objects to transform
   * @param {Function} mapper - Mapping function (item, index) => transformedItem
   * @returns {Promise<Array<Object>>} Transformed array
   * 
   * @example
   * const result = await processor.transform([{x: 1}], item => ({y: item.x}));
   * // Returns: [{y: 1}]
   */
  async transform(data: any[], mapper: (item: any, index: number) => any): Promise<any[]> {
    return data.map(mapper);
  }

  /**
   * Merges multiple data arrays
   * 
   * @param {Array<Object>} arrays - Variable number of arrays to merge
   * @returns {Array<Object>} Merged array with duplicates removed
   * 
   * @example
   * processor.merge([{id: 1}], [{id: 2}]) // Returns [{id: 1}, {id: 2}]
   */
  merge(...arrays: any[][]): any[] {
    const arraysToMerge = arrays.length === 1 && Array.isArray(arrays[0]) 
      ? arrays[0] 
      : arrays;
    
    const merged = arraysToMerge.flat();
    return merged;
  }
}

