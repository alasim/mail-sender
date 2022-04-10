require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const router = express.Router();
const app = express();
const port = 3000;
const log = console.log;

sgMail.setApiKey(process.env.SG_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL, // hello@authcms.com
    pass: process.env.SENDER_PASSWORD,
  },
});

app.post("/sendsg", (req, res) => {
  var subject = req.body.subject;
  var text = req.body.text;
  var html = req.body.html;
  var to = req.body.to;
  console.log(req.body);
  const msg = {
    to,
    from: {
      name: "KLWEBCO",
      email: "hello@authcms.com",
    },
    subject,
    html,
  };

  sgMail
    .send(msg)
    .then(() => res.status(200).send({ send: "OK" }))
    .catch((error) => {
      console.log(error);
      res.status(400).send({ send: "NOT SENT" });
    });
});

app.post("/sendnd", (req, res) => {
  var subject = req.body.subject;
  var text = req.body.text;
  var html = req.body.html;
  var to = req.body.to;

  let mailOptions = {
    from: "klwebcoClients@gmail.com",
    to,
    subject,
    html,
  };

  try {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send({ send: "SOMETHING WRONG" });
      }
      res.status(200).send({ send: "OK" });
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Mail sender listening on port ${port}`);
});

// beginner2professional@gmail.com
// 222.loveU2much?b2p
// curl -d "to=alasim.mail@gmail.com&subject=nodemailer&html=<i>Hello mailer</i>" -X POST http://localhost:3000/sendnd
