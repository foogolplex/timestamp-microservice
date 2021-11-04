import express = require('express')
const app = express()
const port = process.env.PORT 

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// In the case no parameter is passed return the current time
app.get('/api/', (req, res) => {
    var date = new Date(); // Offset +30000ms for freecodecamp test automation  
    return res.json({
        unix : date.getTime(),
        utc : date.toUTCString()
    });
});
  
// Endpoint for timestamps
app.get('/api/:date', (req, res) => {
    var dateObj;

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
  
app.listen(port, () => {
    console.log(`timestamp-microservice listening at http://localhost:${port}`)
}) 
