import { DataProcessor } from '../src/DataProcessor';

describe('DataProcessor', () => {
  const processor = new DataProcessor();

  describe('process() method', () => {
    test('filter option works', () => {
      const data = [{id: 1, name: 'John'}, {id: 2}];
      const resultWithFilter = processor.process(data, {filter: 'name'});
      const resultWithFilterBy = processor.process(data, {filterBy: 'name'});
      expect(resultWithFilter).toEqual(resultWithFilterBy);
    });

    test('sort behavior with sortBy', () => {
      const data = [{id: 3}, {id: 1}, {id: 2}];
      const result = processor.process(data, {sortBy: 'id'});
      expect(result[0].id).toBe(1);
    });

    test('limit behavior', () => {
      const data = Array.from({length: 20}, (_, i) => ({id: i}));
      const result = processor.process(data);
      expect(result.length).toBe(10);
    });
  });

  describe('validate() method', () => {
    test('returns validation result', () => {
      const data = {id: 1, name: 'John'};
      const result = processor.validate(data);
      expect(typeof result).toBe('object');
      expect(result.valid).toBe(true);
      expect(result.errors).toBeDefined();
    });
  });

  describe('transform() method', () => {
    test('transforms data', () => {
      const data = [{x: 1}, {x: 2}];
      const result = processor.transform(data, item => ({y: item.x}));
      expect(result).not.toBeInstanceOf(Promise);
      expect(result).toEqual([{y: 1}, {y: 2}]);
    });
  });

  describe('merge() method', () => {
    test('merges arrays', () => {
      const result1 = processor.merge([{id: 1}], [{id: 2}]);
      const result2 = processor.merge([[{id: 1}], [{id: 2}]]);
      expect(result1).toEqual([{id: 1}, {id: 2}]);
      expect(result2).toEqual([{id: 1}, {id: 2}]);
    });

    test('merge with duplicates', () => {
      const result = processor.merge([{id: 1}], [{id: 1}], [{id: 2}]);
      expect(result.length).toBe(3);
      expect(result.filter(item => item.id === 1).length).toBe(2);
    });
  });
});

