import express from "express";
import axios from "axios";
import twilio from "twilio";
import config from "config";

const { accountSid, authToken, twilioPhoneNumber, myPhoneNumber } = config;

const twilioClient = twilio(accountSid, authToken);
const PORT = 5555;

const app = express();
let pinger = [
  "https://suhailroushan.in",
  "https://suhailroushan.com",
  "https://csprojects.live",
  "https://pi-s.in",
  "https://library.suhailroushan.in/",
  "https://compiler.csprojects.live/",
  "https://tasky.csprojects.live/",
  //   "https://suhail.codes",
  //   "https://suhail.world",
  //   "https://suhails.pics",
  //   "https://suhail.life",
];

const currentDate = new Date().toLocaleString({
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const pingWebsitesAndSendSMS = async () => {
  for (const url of pinger) {
    try {
      const response = await axios.get(url);

      if (response.status >= 200 && response.status < 300) {
        console.log("Server is reachable. Status:", response.status);
      } else {
        console.log("Server responded with an error. Status:", response.status);
        await sendTwilioSMS(
          `Server ${url} is down! Status: ${response.status} ${currentDate}`
        );
      }
    } catch (error) {
      console.error("Error occurred while pinging server:", error.message);
      await sendTwilioSMS(
        `Error pinging server ${url}: ${error.message} at ${currentDate}`
      );
    }
  }
};

const sendTwilioSMS = async (message) => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: myPhoneNumber,
    });
    console.log("Twilio SMS sent:", messageResponse.sid);
  } catch (error) {
    console.error("Error sending Twilio SMS:", error.message);
  }
};

app.get("/", async (req, res) => {
  await pingWebsitesAndSendSMS();
  res.send("<h1>Ping and SMS process initiated. ✅</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Running at 5555`);
  // Every minute 60 * 1000
  // Every 3 Hours 3 * 60 * 60 * 1000

  setInterval(pingWebsitesAndSendSMS, 6 * 60 * 60 * 1000);
});
