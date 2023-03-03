import { leaveTypeReducer, initialState } from './leavetype.reducer';

describe('Leave type  Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result =leaveTypeReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
