
export const TOGGLE_SPINNER = 'TOGGLE_SPINNER';

export const toggleSpinner = (isShowing) => {
  return {
    type: TOGGLE_SPINNER,
    isShowing: isShowing
  };
};
