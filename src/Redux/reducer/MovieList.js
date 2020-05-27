const intialState = {
  data: [],
  detail: [],
};

const MovieList = (state = intialState, action) => {
  switch (action.type) {
    case 'MOVIELIST':
      return {
        ...state,
        data: action.payload,
      };
    case 'MOVIEDETAIL':
      return {
        ...state,
        detail: action.payload,
      }
    default:
      return {
        ...state,
      };
  }
};
export default MovieList;
