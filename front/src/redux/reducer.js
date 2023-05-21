import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE, GET_ALL_BOOKS, SORT_BY_PRICE, SORT_BY_RATING, GET_BOOKSPAGE, CHANGE_PAGINA, SEARCH_BY_NAME_OR_AUTHOR,SET_DETAIL } from './action';


// Initial state
const initialState = {
  loading: false,
  data: null,
  //detail_data es en donde se guarda la data para renderizar en detail, tanto del searchbar como al clickear una portada. 
  detail_data: undefined,
  booksPage: [],
  paginaActual: 1,
  error: null,
  books: [],
  allBooks: [],

};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        allBooks: action.payload
      };

    case CHANGE_PAGINA:
      return {
        ...state,
        paginaActual: action.payload
      };

    case GET_BOOKSPAGE:
      const pageSize = 9;
      const pageNumber = action.payload
      const indiceInicio = (pageNumber - 1) * pageSize;
      const indiceFinal = indiceInicio + pageSize;

      console.log("pageNumber " + pageNumber)
      console.log("indiceInicio " + indiceInicio)
      console.log("indiceFinal " + indiceFinal)
      console.log()

      return {
        ...state,
        booksPage: state.allBooks.slice(indiceInicio, indiceFinal)
      };

    case SORT_BY_PRICE:
      let sortPriceArray = action.payload === 'Asc' ? state.books.sort((a, b) => {
        return a.price - b.price
      }) :
        state.books.sort((a, b) => {
          return b.price - a.price
        });
      return {
        ...state,
        books: [...sortPriceArray]
      }
    //el case SORT_BY_RATING esta hecho en base al precio, ya que aun no hay reseñas
    case SORT_BY_RATING:
      let sortRatingArray = action.payload === 'Asc' ? state.books.sort((a, b) => {
        return a.price - b.price
      }) :
        state.books.sort((a, b) => {
          return b.price - a.price
        });
      return {
        ...state,
        books: [...sortRatingArray]
      }
    case SEARCH_BY_NAME_OR_AUTHOR:
      return {
        ...state,
        books: action.payload,
      };

    case SET_DETAIL:
      return {
        ...state,
        detail_data: action.payload,
      };


    default:
      return state;
  }
};

export default reducer;