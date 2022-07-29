const SET_IMG_URL = "SET_IMG_URL";

export const setImgUrl = (imgUrl) => ({ type: SET_IMG_URL, imgUrl });

export default function (state = "", action) {
  switch (action.type) {
    case SET_IMG_URL:
      return action.imgUrl;
    default:
      return state;
  }
}
