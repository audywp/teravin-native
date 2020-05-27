/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import Loading from './Loading';
import MovieList from './MovieList';

const Reducer = combineReducers({
  MovieList, Loading,
});

export default Reducer;
