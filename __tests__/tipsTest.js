import { getTip } from '../DB/tips';
import { jest } from '@jest/globals';

describe('Test for getTips', () => {
    it('should grab tip successfully', async () => {

          //debug logs for sanity checks
          console.log('Running getTips test');
          const result = getTip();
          console.log('getTip result:', result);

          expect(result).toBeDefined();
    });
});