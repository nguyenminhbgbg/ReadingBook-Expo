import {
  GET_BOOKS,
  GET_GENRE,
  SEARCH_GENRE,
  GET_BOOKS_BEST_SELLER,
  GET_BOOKS_THE_LATEST,
  GET_BOOKS_COMING_SOON,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST,
  SEARCH_BOOK_LIST,
  CANCEL_SEARCH_BOOK,
  CHOICE_CHAPTER_LIST,
  DATA_BOOK_READING,
  CLEAR_CHAPTER_BOOK,
  PLUS_ONE_FONT,
  LOW_ONE_FONT,
  LIGHT_MODE,
  LIGHT2_MODE,
  DARK_MODE,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SIGN_UP_ACTION
} from './actions';

const initialState = {
  books: [],
  genres: [],
  chapter: [],
  booksSearch: [],
  booksBestSeller: [],
  booksTheLatest: [],
  booksComingSoon: [],
  bookmarks: [],
  search: '',
  loadReadingBook: false,
  chapterReading:[],
  dataBookReadingNow: [],
  fontReading: 18,
  fontTitleReading: 26,
  fontColor: '#000',
  backgroundColor: '#FFF',
  userToken: null,
  mesLogin: null,
  mesRegister: null,
  userInfo: null,

};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION:{
      state.mesLogin = action.payload.message;
      if(action.payload.token){
        state.userToken = action.payload.token;
        state.userInfo = action.payload.others;
      }
      return { ...state };
    }
    case SEARCH_GENRE:{
      state.booksSearch = action.payload
      return {...state };
    }
    case LOGOUT_ACTION: {
      state.mesLogin= null;
      state.userToken = null;
      state.userInfo = null;
      state.mesRegister = null;
      return {...state };
    }
    case SIGN_UP_ACTION:
    return { ...state , mesRegister: action.payload.message };

    case GET_BOOKS: {
    return { ...state, books: action.payload , booksSearch: action.payload};
  }
    case GET_GENRE:
      return { ...state, genres: action.payload };
    
    case ADD_TO_BOOKMARK_LIST:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
      };
    case GET_BOOKS_BEST_SELLER:
      return { 
        ...state, 
        booksBestSeller: action.payload
      };
    case GET_BOOKS_THE_LATEST:
    return { 
      ...state, 
      booksTheLatest: action.payload
    };
    case GET_BOOKS_COMING_SOON:
    return { 
      ...state, 
      booksComingSoon: action.payload
    };
    case SEARCH_BOOK_LIST:{
      const text = action.payload;
      if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = state.booksSearch.filter(
        function (item) {
          const itemData = item.bookName
            ? item.bookName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      state.booksSearch= newData;
      state.search= text;
      // state.booksSearch(newData)
      // state.search(text)
      } else {
        state.booksSearch= state.books;
        state.search= text;
        // state.booksSearch(books)
        // state.search(text)
      }
      return {...state };
    }
    case CANCEL_SEARCH_BOOK: {
      state.search='';
      state.booksSearch= state.books;
      return {...state };
    }

    case CHOICE_CHAPTER_LIST: {
      state.chapterReading= action.payload;
      return {...state };
    }

    case DATA_BOOK_READING: {
      state.chapter = action.payload.Chapters;
      state.chapterReading= action.payload.Chapters[0]
      console.log(action.payload);
      console.log(action.payload.chapter);
      state.dataBookReadingNow= action.payload;
      return {...state };
    }

    case CLEAR_CHAPTER_BOOK: {
      state.chapterReading= [];
      return {...state };
    }

    case PLUS_ONE_FONT: {
      state.fontReading= state.fontReading + 2;
      state.fontTitleReading= state.fontTitleReading + 4;
      return {...state };
    }

    case LOW_ONE_FONT: {
      state.fontReading= state.fontReading - 2;
      state.fontTitleReading= state.fontTitleReading - 4;
      return {...state };
    }

    case LIGHT_MODE: {
      state.fontColor= '#000000' ;
      state.backgroundColor= '#FFF';
      return {...state };
    }

    case LIGHT2_MODE: {
      state.fontColor= '#111827' ;
      state.backgroundColor= '#ffedd5';
      return {...state };
    }

    case DARK_MODE: {
      state.fontColor= '#FFF' ;
      state.backgroundColor= '#111827';
      return {...state };
    }
    default:
      return state;
  }
}

export default booksReducer;
