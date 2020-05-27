/* eslint-disable prettier/prettier */
import axios from 'axios';

export const MovieList = (page) => async dispatch => {
  try {
    const list = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf&page=${page}`)
    console.log(list.data);
    dispatch({
      type: 'MOVIELIST',
      payload: list.data,
    });
    dispatch({
      type: 'LOADING',
    });
    dispatch({
      type: 'END_LOADING',
    });
  } catch (error) {
    console.log(error);
  }
};

export const MovieDetails = data => dispatch => {
  dispatch({
    type: 'MOVIEDETAIL',
    payload: data,
  });
};
