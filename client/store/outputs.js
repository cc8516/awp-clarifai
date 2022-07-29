import axios from "axios";

const GET_OUTPUTS = "GET_OUTPUTS";

const getOutputs = (outputs) => ({
  type: GET_OUTPUTS,
  outputs,
});

export const makeCallToClarifai = (imageUrl) => async (dispatch) => {
  try {
    const res = await axios.post("/api/clarifai", { imageUrl });
    dispatch(getOutputs(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_OUTPUTS:
      return action.outputs;
    default:
      return state;
  }
}
