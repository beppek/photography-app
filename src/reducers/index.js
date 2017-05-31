import { combineReducers } from "redux";
import images from "./imagesReducer";
import collections from "./collectionsReducer";

export default combineReducers({
  images,
  collections
});
