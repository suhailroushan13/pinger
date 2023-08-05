import express from "express";
import axios from "axios";
import twilio from "twilio";

const accountSid = "ACadf3d32966b670c52585de7f3c45b9cd";
const authToken = "b9f578e9dd020ce88ee97ff1b5fa5dd2";
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = "+12057360671";
const myPhoneNumber = "+919618211626"; // Replace with your phone number

const PORT = 5555;

const app = express();
let pinger = [
  "https://suhailroushan.in",
  "https://suhailroushan.com",
  "https://suhailss.in",
];
// If an error occurs during the request (e.g., network issue, server down, etc.)
// const asiaTimezone = "Asia/Tokyo";

// Get the current date and time in UTC
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

      // If the request was successful, the status will be in the 2xx range
      if (response.status >= 200 && response.status < 300) {
        console.log("Server is reachable. Status:", response.status);
      } else {
        console.log("Server responded with an error. Status:", response.status);
        sendTwilioSMS(
          `Server ${url} is down! Status: ${response.status} ${currentDate}`
        );
      }
    } catch (error) {
      console.error("Error occurred while pinging server:", error.message);
      sendTwilioSMS(
        `Error pinging server ${url}: ${error.message} at ${currentDate}`
      );
    }
  }
};

const sendTwilioSMS = (message) => {
  twilioClient.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: myPhoneNumber,
    })
    .then((message) => console.log("Twilio SMS sent:", message.sid))
    .catch((error) =>
      console.error("Error sending Twilio SMS:", error.message)
    );
};

app.get("/", async (req, res) => {
  pingWebsitesAndSendSMS();
  res.send("Ping and SMS process initiated.");
});

app.listen(PORT, () => {
  console.log(`Server Running at 5555`);

  // Schedule the ping and SMS process every 3 hours (in milliseconds: 3 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  // setInterval(pingWebsitesAndSendSMS, 3 * 60 * 60 * 1000);
  setInterval(pingWebsitesAndSendSMS, 60 * 1000);
});
