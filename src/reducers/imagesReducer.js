const initialState = {
  fetching: false,
  fetched: false,
  images: [],
  error: null,
  fullscreenImage: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_IMAGES_PENDING": 
      return {
        ...state,
        fetching: true
      };
    
    case "FETCH_IMAGES_ERROR": 
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    
    case "RECEIVE_IMAGES": 
      return {
        ...state,
        images: action.images,
        fetched: true,
        fetching: false
      };

    case "VIEW_IN_FULLSCREEN":
      return {
        ...state,
        fullscreenImage: action.image
      };
    
    case "CLOSE_FULLSCREEN_VIEW":
      return {
        ...state,
        fullscreenImage: null
      }
    
    default: 
      return state;
    
  }
};
