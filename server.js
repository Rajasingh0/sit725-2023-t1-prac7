let express = require('express');
let app = express();
let port = process.env.port || 3000;

require('./database_connection');
let router = require("./routers/router");


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use('/api/cat', router);


app.listen(port, ()=>{
    console.log('Express server started');
    // runDBConnection();
});