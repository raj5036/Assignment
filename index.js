const express = require('express');
const { AdminRoutes } = require('./src/routes/routes');

const app = express();
const PORT = 3001 || process.env.PORT;

app.get(AdminRoutes.SERVER_HEALTH_CHECKUP, (req, res) => {
	res.send('<h1>Server is running properly</h1>');
});

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});