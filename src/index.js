require('dotenv').config();
const app = require('./server');
const PORT = process.env.PORT || 3200;

const logger = require('./utils/logger');

//const https = require('https');
//const fs = require('fs');

// we will pass our 'app' to 'https' server
/*https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: ''
}, app).listen(443);*/

app.listen(PORT, () => logger.info(`Server is up and running on port ${PORT}`));
