const express = require('express');
const bodyParser = require('body-parser');
const prismaErdRoutes = require('./api/routes/prismaErdRoutes');

const app = express();
const PORT = 7000;

app.use(bodyParser.json());

app.use('/prisma-erd', prismaErdRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
