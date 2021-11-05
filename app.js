const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.status(500).send('Internal error from the server side')
    res.status(200).json({
        "status": "success",
        "data": { 
            message: 'Hello World from artflix', 
            app: "artflix" 
        }
    });
});

app.post('/', (req, res) => {
    res.send('Post method');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});