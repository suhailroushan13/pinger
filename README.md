# Pinger Project Setup

This repository contains the code for the Pinger project. The project is designed to use Twilio to send messages to a specified phone number.

## Prerequisites

Before running the application, make sure you have the following:

1. Node.js installed on your system.
2. Git installed on your system.
3. Twilio account credentials (Account SID, Auth Token).
4. Twilio phone number (purchased from Twilio).
5. Your own phone number where you want to receive the messages.

## Setup Instructions

Follow the steps below to set up the project:

1. Clone the repository, change to the project directory, and create a configuration file:
 ```bash
git clone git@github.com:suhailroushan13/pinger.git
cd pinger
mkdir config && cd config
touch default.json
```
2. Edit default.json and fill the details
```json
{
  "accountSid": "ACadf3dXXXXXXXXXXXXX",
  "authToken": "b9f578eXXXXXXXXXXXXXX",
  "twilioPhoneNumber": "+12XXXXXXXXXX",
  "myPhoneNumber": "+919XXXXXXXXX"
}
```
3. Get back to Repository directory 
```bash
cd ..

```

4.Install All NPM Modules and Run The Project
```bash
npm install
npm start

```

