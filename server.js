const {google} = require("googleapis");
const scopes = ["https://www.googleapis.com/auth/analytics", "https://www.googleapis.com/auth/analytics.edit"];
const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scopes);

async function getData() {
  const response = await jwt.authorize()
  const result = await google.analytics("v3").management.webproperties.list({
    "auth": jwt,
    "accountID": process.env.ACCOUNT_ID
  }).then(result => {
    console.log(result.data.totalResults)
  })
}
// init project
const express = require('express');
const app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
