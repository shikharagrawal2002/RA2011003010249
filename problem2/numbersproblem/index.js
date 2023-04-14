import express from "express";
import fetch from "node-fetch";

const app = express();
const json3 = { Hello: "Hello" };

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);

app.get("/numbers", async (req, res) => {
  try {
    const list1 = req.query.url;
    const list2 = await Promise.all(
      list1.map((url) => fetch(url).then((response) => response.json()))
    );
    const set3 = new Set(list2.flatMap((item) => item.numbers));
    const list3 = Array.from(set3).sort((a, b) => a - b);
    const json3 = { numbers: list3 };
    res.json(json3);
  } catch (err) {
    res.send("Error" + err);
  }
});
