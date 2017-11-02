const path = require('path');
const express = require('express');
const port = process.env.PORT || 3333;
const publicPath = path.join(__dirname, '../public');

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log('server is up on 3333');
});
