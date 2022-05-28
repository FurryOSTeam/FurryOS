const express = require("express");
const app = express();

app.use(express.static("/"));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', (request, response) => {
    return response.sendFile('./src/web/index.html', { root: '.' });
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is currently listening on port: ' + listener.address().port);
});