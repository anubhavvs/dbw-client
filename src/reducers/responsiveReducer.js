import { SCREEN_SIZE } from '../constants/responsiveConstants';

export const respoonsiveReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_SIZE:
      return { ...state, screenWidth: action.payload };
    default:
      return state;
  }
};
