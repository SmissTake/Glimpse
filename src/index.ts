require('dotenv').config();

import cors, { CorsOptions } from 'cors';
//import { generateToken } from './authenticate/jwt';
import express from 'express';
import { PORT } from './config/constants';
import {routerPlace} from './routes/place';
import {routerUser} from './routes/user';
import { routerCategory } from './routes/category';

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
app.get('/place/search', routerPlace);
app.post('/place/create', routerPlace);
app.put('/place/update/:id', routerPlace);
app.delete('/place/delete/:id', routerPlace);

app.get('/user/show/:id', routerUser);
app.get('/user/listall', routerUser);
app.get('/user/search', routerUser);
app.put('/user/update/:id', routerUser);

app.get('/category/listall', routerCategory);
app.get('/category/listplaces/:id', routerCategory);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});