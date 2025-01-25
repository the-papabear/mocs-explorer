require("dotenv").config();
const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { setNumber } = req.query;
    if (!setNumber || setNumber.match(/^\d+(-\d+)?$/) === null) {
      res.send("NO NO NO NO");
    }

    const apiURL = `https://rebrickable.com/api/v3/lego/sets/${setNumber}/alternates/`;

    const headers = {
      Authorization: `key ${process.env.REBRICKABLE_API_KEY}`,
    };

    const response = await fetch(apiURL, { headers });
    const data = await response.json();
    res.json({ status: 200, data });
  } catch (error) {
    console.log("Not really handling errors:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
