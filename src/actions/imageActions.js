import DBService from "../Firebase/DBService";

export function fetchImages(dispatch) {
  const db = new DBService();
  db.getFromDB("/images", (images) => {
    dispatch({
      type: "RECEIVE_IMAGES",
      images
    })
  });
}

export function viewInFullscreen(image, dispatch) {
  return (dispatch) => {
    dispatch({
      type: "VIEW_IN_FULLSCREEN",
      image
    });
  }
}

export function closeFullscreen(dispatch) {
  return (dispatch) => {
    dispatch({
      type: "CLOSE_FULLSCREEN_VIEW",
    });
  }
}