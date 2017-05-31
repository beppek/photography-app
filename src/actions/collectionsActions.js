import DBService from "../Firebase/DBService";

export function fetchCollections(dispatch) {
  const db = new DBService();
  db.getFromDB("/collections", (collections) => {
    dispatch({
      type: "RECEIVE_COLLECTIONS",
      collections
    })
  });
}