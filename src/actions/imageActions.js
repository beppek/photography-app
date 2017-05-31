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