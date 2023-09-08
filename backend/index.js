const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// v3 validation using axios
app.post("/v3", async (req, res) => {
  const response = req.body;
  axios
    .post(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        secret: `6LfaJuMlAAAAAFHeqIlfPiibQ4hVGubWLtMdhbNn`,
        response: response.token,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
    .then((res) => {
      console.log(res.data)
      if(res?.data?.success==true && res.data.score>=0.5){
        console.log("valid")
      }
      else{
        throw({Error:`Not valid entry`})
      }
      // console.log(res)
    })
    .catch((err) => console.log(err));

    //check the score >0.5 then not robot
});



// v2 validation using fetch
app.post("/v2", async (req, res, next) => {
  const data = {
    ...req.body
  }

  try {

    // check for captcha reponse
    if (!req.body['g-recaptcha-response']) {
      return res.json({
        message: 'captcha error1'
      });
    }

    // verify captcha response
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:`secret=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe&${req.body['g-recaptcha-response']}`
    });
    const json = await response.json();

    console.log(json)
    // if invalid reponse (not human)
    if (!json.success) {
      return res.json({
        message: 'captcha error2'
      });
    }

    res.status(201).json({
      message: 'created'    
    });

  } catch (err) {
    next(err);
  }
}
)
app.listen("3550", () => console.log("server is running"));
