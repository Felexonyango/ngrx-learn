import { departmentReducer, initialState } from './departmentReducer';

describe('Department  Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result =departmentReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
