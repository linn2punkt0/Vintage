/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    // const url = new URL(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.queryStringParameters.input}&key=${process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}`
    // );

    // const response = await fetch(url.href);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.queryStringParameters.input}&key=${process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}`,
      {
        headers: { Accept: "application/json" }
      }
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
