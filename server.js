const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed: npm install node-fetch

const app = express();

// Use the PORT environment variable provided by Render, with a fallback to 3000 if not set.
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const XTRADE_API_URL = 'https://www.xtrade.com/api/lead/create'; // Replace with the actual Xtrade API endpoint

app.post('/api/lead/create', async (req, res) => {
  try {
    // Extract lead data from the request
    const {
      email,
      fullName,
      countryCodeISO2,
      phoneCountryCode,
      phoneAreaCode,
      phoneNumber,
      emailOpt,
      language,
      affTrack,
      affToken,
      affTags
    } = req.body;

    // Validate required fields
    if (!email || !fullName || !countryCodeISO2 || !phoneCountryCode || !phoneNumber || !language || !affTrack || !affToken) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Build the request body for Xtrade API
    const requestBody = new URLSearchParams({
      email,
      fullName,
      countryCodeISO2,
      phoneCountryCode,
      phoneAreaCode,
      phoneNumber,
      emailOpt,
      language,
      affTrack,
      affToken,
      affTags
    });

    // Make a POST request to Xtrade API
    const apiResponse = await fetch(XTRADE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });

    // Parse the response from Xtrade API
    const responseData = await apiResponse.json();

    // Check if the lead creation was successful
    if (responseData.success) {
      res.json(responseData);
    } else {
      res.status(400).json(responseData);
    }
  } catch (error) {
    console.error('Error connecting to the Xtrade API:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Listen on the port provided by the PORT environment variable
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
