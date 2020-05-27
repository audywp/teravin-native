const initialState = {
  Loading: true,
};

const Loading = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        Loading: false,
      };
    case 'END_LOADING':
      return {
        ...state,
        Loading: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default Loading;
