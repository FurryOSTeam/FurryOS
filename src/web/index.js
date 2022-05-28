const express = require("express");
const app = express();

app.get('/', (request, response) => {
    return response.sendFile('./src/web/index.html', { root: '.' });
});
app.use(express.static(path.join(__dirname, './src/web/index.html')));

const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is currently listening on port: ' + listener.address().port);
});