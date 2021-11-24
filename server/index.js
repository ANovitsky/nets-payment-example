var express = require("express");
var https = require("https");
var cors = require("cors");
var fiddler = require("./fiddlerProxy");
var app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

//allow all
app.use(cors(corsOpts));

var server = app.listen(5000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server app listening at http://%s:%d", host, port);
});

//create payment id by request
app.get("/createPayment", (req, res, next) => {
  const postData = JSON.stringify({
    order: {
      items: [
        {
          reference: "Sneaky",
          name: "Sneaky",
          quantity: 1,
          unit: "pcs",
          unitPrice: 2500,
          taxRate: 1000,
          taxAmount: 250,
          netTotalAmount: 2500,
          grossTotalAmount: 2750,
        },
      ],
      amount: 2750,
      currency: "SEK",
      reference: "Nets Easyshop",
    },
    checkout: {
      termsUrl: "http://localhost:3000/terms",
      publicDevice: false,
      charge: false,
      integrationType: "EmbeddedCheckout",
      url: "http://localhost:3000/checkout",
    },
  });

  const options = {
    method: "POST",
    hostname: "test.api.dibspayment.eu",
    port: 443,
    path: "/v1/payments",
    headers: {
      "content-type": "application/*+json",
      Authorization: "[YOUR KEY]",
    },
  };

  try {
    //const request = http.request(fiddler.setFiddlerProxy(options), function (response) {
    const request = https.request(options, function (response) {
      const chunks = [];

      response.on("data", function (chunk) {
        chunks.push(chunk);
      });

      response.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
        res.end(body.toString());
      });

      response.on("error", function (e) {
        console.error(e);
      });
    });

    request.write(postData);
    request.end();
  } catch (error) {
    console.error(error);
  } finally {
  }
});
