import { getRandomNumberInRange } from 'src/utils/getRandomNumberInRange';

describe('getRandomNumberInRange', () => {
  it('should return a number between 0 and the max', () => {
    const max = 10;
    for (let i = 0; i < 1000; i++) {
      const result = getRandomNumberInRange(max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(max);
    }
  });
});
