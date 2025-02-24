const initialState = {

  book: [],

  fav:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "acheter":
      return { ...state, book: [...state.book, action.payload] };

    case "supprimer":
      return { ...state, book: state.book.filter((b) => b.key !== action.payload) }
     
    case "fav":
        return { ...state, fav: [...state.fav, action.payload] };  

    case "supprimerr":
          return { ...state, fav: state.fav.filter((b) => b.key !== action.payload) }
           
    default:
      return state;
  }
}
