require('dotenv').config();

import express from 'express';
import { PORT } from './config/constants';

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});