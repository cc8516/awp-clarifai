import React from "react";
import { connect } from "react-redux";

import styles from "./DisplayOutputs.module.css";

const DisplayOutput = (props) => {
  const { imgUrl, outputs } = props;

  return (
    <div className={styles.row}>
      <section className={styles.column}>
        <h1>Data Retrieved from Clarifai API</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Concept Name</th>
              <th>Model Confidence</th>
            </tr>
          </thead>
          <tbody>
            {outputs.map((output, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{output.name}</td>
                  <td>{output.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className={styles.column}>
        {imgUrl ? <img src={imgUrl} alt="image from img url" /> : <div></div>}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { imgUrl: state.imgUrl, outputs: state.outputs };
};

export default connect(mapStateToProps, null)(DisplayOutput);
