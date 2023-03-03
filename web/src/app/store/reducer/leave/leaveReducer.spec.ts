import { leaveReducer, initialState } from './leaveReducer';

describe('Leave  Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result =leaveReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
