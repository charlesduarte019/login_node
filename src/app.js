const express = require('express');
var cors = require('cors')
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

//notFound
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

//catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message })
})

app.listen(3000, () => {
    var dtNow = new Date;
    console.log('--------------------------------------');
    console.log('    Server running: ' + dtNow.getHours() + ":" + dtNow.getMinutes() + ":" + dtNow.getSeconds());
    console.log('--------------------------------------');
});