const initialState = {
  fetching: false,
  fetched: false,
  collections: [],
  error: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_COLLECTIONS_PENDING": 
      return {
        ...state,
        fetching: true
      };
    
    case "FETCH_COLLECTIONS_ERROR": 
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    
    case "RECEIVE_COLLECTIONS": 
      return {
        ...state,
        collections: action.collections,
        fetched: true,
        fetching: false
      };
    
    default: 
      return state;
  }
};
