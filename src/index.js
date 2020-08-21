require('dotenv').config();
const app = require('./server');
const PORT = process.env.PORT || 3200;

//const https = require('https');
//const fs = require('fs');

// we will pass our 'app' to 'https' server
/*https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: ''
}, app).listen(443);*/

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
