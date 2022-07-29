const router = require("express").Router();
require("../../secrets.js");

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

module.exports = router;

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();

metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);

function predictImage(inputs) {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs,
      },
      metadata,
      (err, response) => {
        if (err) {
          reject("Error: " + err);
          return;
        }

        if (response.status.code !== 10000) {
          reject(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }

        let outputs = [];
        for (const c of response.outputs[0].data.concepts) {
          outputs.push({
            name: c.name,
            value: c.value,
          });
        }

        resolve(outputs);
      }
    );
  });
}

router.post("/", async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    const inputs = [
      {
        data: {
          image: {
            url: imageUrl,
          },
        },
      },
    ];

    const outputs = await predictImage(inputs);

    res.json(outputs);
  } catch (error) {
    next(error);
  }
});
