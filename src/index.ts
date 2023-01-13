require('dotenv').config();

import cors, { CorsOptions } from 'cors';
//import { generateToken } from './authenticate/jwt';
import express from 'express';
import { PORT } from './config/constants';
import {routerPlace} from './routes/place';

const app = express();
const allowOrigins = [`http://localhost:${PORT}`];

const options: cors.CorsOptions = {
    origin: allowOrigins
};

// if(process.env.NODE_ENV !== 'production'){
//     console.log('Le token JWT :', generateToken("tanguy", "gwion.tanguy@my-digital-school.org", "Administrateur"));
// }

app.use(cors())
app.use(express.json());

app.get('/place/show/:id', routerPlace);
app.get('/place/listall', routerPlace);
app.get('/place/count/:id', routerPlace);
app.post('/place/create', routerPlace);
app.put('/place/update/:id', routerPlace);
app.delete('/place/delete/:id', routerPlace);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});