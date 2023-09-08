import React, { useCallback } from "react";
import {
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import axios from "axios";

import { useEffect } from "react";

const GoogleCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha();
    console.log(token)
    axios.post("http://localhost:3550/v3", { token })
      .then((res) => { console.log(res.data) })
      .catch((err) => console.log(err))
  }, [executeRecaptcha]);
  
  useEffect(() => {
    handleReCaptchaVerify();

  }, [handleReCaptchaVerify]);

  return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
};

export default GoogleCaptcha;
