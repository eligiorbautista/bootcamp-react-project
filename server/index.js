const cors = require('cors');
const express = require('express');
const router = require('./src/routes/user-routes');
const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(router);
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running at port ${port} ✔`));