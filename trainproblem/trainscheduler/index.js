import express from "express";
import fetch from "node-fetch";
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);

var data = { companyName: "Company1" };

var access_token = "";

const json1 = await fetch("http://localhost:3000/register", {
  method: "POST",

  body: JSON.stringify(data),

  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((response) => response.json());

var data2 = json1;
const json2 = await fetch("http://localhost:3000/auth", {
  method: "POST",

  body: JSON.stringify(data2),

  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((response) => response.json());

access_token = json2.access_token;

const json3 = await fetch("http://localhost:3000/trains", {
  method: "GET",

  headers: {
    Authorization: "Bearer " + access_token,
  },
}).then((response) => response.json());

const trainScheduler = (json3) => {
  for (var i = 0; i < json3.length; i++) {
    for (var j = i + 1; j < json3.length; j++) {
      console.log(json3[i].trainName, json3[j].trainName);
      if (
        !(json3[i].departureTime < json3[j].departureTime) &&
        !(json3[i].price > json3[j].price) &&
        !(json3[i].seatsAvailable < json3[j].seatsAvailable)
      ) {
        [json3[i], json3[j]] = [json3[j], json3[i]];
      }
    }
  }
  return json3;
};

console.log(trainScheduler(json3));

app.get("/", (req, res) => {
  try {
    res.json(json3);
    console.log(json3);
  } catch (err) {
    res.send("Error" + err);
  }
});
