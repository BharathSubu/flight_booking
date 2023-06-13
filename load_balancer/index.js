const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const port = 5000;
const servers = ["http://api1:5000", "http://api2:5000"];
// const port = 4000;
// const servers = ["http://localhost:2000", "http://localhost:2001"];

app.use(cors());
app.use(express.json());

let current = 0,
  server;
const handler = async (req, res) => {
  const { method, url, headers, body } = req;
  server = servers[current];
  current === servers.length - 1 ? (current = 0) : current++;
  try {
    console.log(headers);
    const response = await axios({
      method: method,
      url: `${server}${url}`,

      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    console.log(`proxy to  ${server} succeded`);
    res.send(response.data);
  } catch (err) {
    console.log(`proxy to ${server} failed`);
    // handler(req, res);
  }
};

app.use((req, res) => {
  handler(req, res);
});

app.listen(port, () => {
  console.log(`Load Balancer in port ${port}`);
});
