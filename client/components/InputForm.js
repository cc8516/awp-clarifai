import React, { useState } from "react";
import { connect } from "react-redux";
import { setImgUrl } from "../store/imgUrl";

import styles from "./InputForm.module.css";
import { makeCallToClarifai } from "../store/outputs";

const DEFAULT_IMG_URL =
  "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2022%2F01%2F13%2Famerican-pit-bull-brown-fur-red-collar-239531781-2000.jpg";

const InputForm = (props) => {
  const [imgUrl, setImgUrl] = useState(DEFAULT_IMG_URL);

  const { saveImgUrl, makeCallToClarifai } = props;

  const handleChangeImgUrl = (e) => {
    e.preventDefault();

    setImgUrl(e.target.value);
  };

  return (
    <div>
      <form
        name="imageUrl"
        onSubmit={(e) => {
          saveImgUrl(e, imgUrl);
          makeCallToClarifai(imgUrl);
        }}
      >
        <div className={styles.form}>
          <label htmlFor="imageUrl">
            <strong>Image Url (PNG/JPG/JPEG ONLY): </strong>
          </label>
          <input
            name="imageUrl"
            type="text"
            value={imgUrl}
            onChange={handleChangeImgUrl}
            placeholder="Img Url"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveImgUrl: (e, imgUrl) => {
      e.preventDefault();
      dispatch(setImgUrl(imgUrl));
    },
    makeCallToClarifai: (imgUrl) => dispatch(makeCallToClarifai(imgUrl)),
  };
};

export default connect(null, mapDispatchToProps)(InputForm);
