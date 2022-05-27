import axios from 'axios';

import { BASE_URL,LOGIN_URL, CHAPTER_URL, SIGNUP_URL, GENRE_URL } from '../config';

// Define action types
export const GET_BOOKS = 'GET_BOOKS';

export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';

export const SEARCH_BOOK_LIST = 'SEARCH_BOOK_LIST';
export const CANCEL_SEARCH_BOOK = 'CANCEL_SEARCH_BOOK';

export const GET_CHAPTER_LIST = 'GET_CHAPTER_LIST';
export const GET_GENRE = 'GET_GENRE';
export const SEARCH_GENRE = 'SEARCH_GENRE';
export const CHOICE_CHAPTER_LIST = 'CHOICE_CHAPTER_LIST';
export const DATA_BOOK_READING = 'DATA_BOOK_READING';

export const CLEAR_CHAPTER_BOOK = 'CLEAR_CHAPTER_BOOK';

export const PLUS_ONE_FONT = 'PLUS_ONE_FONT';
export const LOW_ONE_FONT = 'LOW_ONE_FONT';

export const LIGHT_MODE = 'LIGHT_MODE';
export const LIGHT2_MODE = 'LIGHT2_MODE';
export const DARK_MODE = 'DARK_MODE';

// LOGIN ACTION

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const SIGN_UP_ACTION = 'SIGN_UP_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export const logOutAction = () => dispatch => {
  dispatch({
    type: LOGOUT_ACTION,
  });
};

export const getBooks = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      // console.log('DATA ========>', response.data);
      if (response.data) {
        dispatch({
          type: GET_BOOKS,
          payload: response.data
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
    debugger
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const getGenre = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${GENRE_URL}`);
      // console.log('DATA ========>', response.data);
      if (response.data) {
        dispatch({
          type: GET_GENRE,
          payload: response.data
        });
      } else {
        console.log('Unable to fetch data from the API Genre URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const searchGenre = genreName => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}/${genreName}`);
      // console.log('DATA ========>', response.data);
      if (response.data) {
        dispatch({
          type: SEARCH_GENRE,
          payload: response.data
        });
      } else {
        console.log('Unable to fetch data from the API Genre search URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const addBookmark = book => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: book
  });
};

export const removeBookmark = book => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: book
  });
};

export const searchBook = text => dispatch => {
  dispatch({
    type: SEARCH_BOOK_LIST,
    payload: text
  });
};

export const cancelSearch = () => dispatch => {
  dispatch({
    type: CANCEL_SEARCH_BOOK,
  });
};

export const loadReadingBook = () => dispatch => {
  dispatch({
    type: LOAD_REDING_BOOK,
  });
};

export const getChapterList = () => dispatch => {
  dispatch({
    type: GET_CHAPTER_LIST,
  });
};

export const choiceChapterList = chapter => dispatch => {
  dispatch({
    type: CHOICE_CHAPTER_LIST,
    payload: chapter
  });
};

export const dataBookReading = book => dispatch => {
  dispatch({
    type: DATA_BOOK_READING,
    payload: book
  });
};

export const clearChapterBook = () => dispatch => {
  dispatch({
    type: CLEAR_CHAPTER_BOOK,
  });
};

export const plusOneFont = () => dispatch => {
  dispatch({
    type: PLUS_ONE_FONT,
  });
};

export const lowOneFont = () => dispatch => {
  dispatch({
    type: LOW_ONE_FONT,
  });
};

export const lightMode = () => dispatch => {
  dispatch({
    type: LIGHT_MODE,
  });
};

export const light2Mode = () => dispatch => {
  dispatch({
    type: LIGHT2_MODE,
  });
};

export const darkMode = () => dispatch => {
  dispatch({
    type: DARK_MODE,
  });
};

export const loginAction = (email, pass) => {
  try {
    return async dispatch => {
      const response = await axios.post(`${LOGIN_URL}`, {
        email: email,
        password: pass
      })
      if (response.data) {
        dispatch({
          type: LOGIN_ACTION,
          payload: response.data
        });
      } else {
        console.log('LOGIN ERR CONNECT!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const signUpAction = (name, email, pass) => {
  try {
    return async dispatch => {
      const response = await axios.post(`${SIGNUP_URL}`, {
        name: name,
        email: email,
        password: pass
      })
      if (response.data) {
        dispatch({
          type: SIGN_UP_ACTION,
          payload: response.data
        });
      } else {
        console.log('SIGN UP ERR CONNECT!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};