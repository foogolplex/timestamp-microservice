const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

const makeDateObject = (date) => {
    return {
        unix: date.getTime(),
        utc: date.toUTCString()
    };
}

// In the case no parameter is passed return the current time
app.get('/api/', (req, res) => {
    const date = new Date(); // Offset +30000ms for freecodecamp test automation  
    return res.json(makeDateObject(date));
});
  
// Endpoint for timestamps
app.get('/api/:date', (req, res) => {
    var dateObj = {};

    // Get the date paramater string
    var date = new Date(req.params['date']);
    // Convert it to a unix timestamp if invalid
    if(date.toUTCString() == "Invalid Date"){
      date = new Date(parseInt(req.params['date']));
    }
    // If date is still invalid return an error response
    if(date.toUTCString() == "Invalid Date"){
        return res.json({'error': 'Invalid Date'});
    }
    else{
        dateObj = {
            unix : date.getTime(),
            utc : date.toUTCString()
        };
        return res.json(dateObj);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
