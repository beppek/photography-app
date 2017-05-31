const initialState = {
  fetching: false,
  fetched: false,
  images: [],
  error: null
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "FETCH_IMAGES_PENDING": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_IMAGES_ERROR": {
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    }
    case "RECEIVE_IMAGES": {
      return {
        ...state,
        images: action.images,
        fetched: true,
        fetching: false
      };
    }
  }
  return state;
};
