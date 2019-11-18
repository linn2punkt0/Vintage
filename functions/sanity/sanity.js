/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch(
      `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${event.queryStringParameters.input}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`
        }
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
