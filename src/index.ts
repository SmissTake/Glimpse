require('dotenv').config();

import cors, { CorsOptions } from 'cors';
import { generateToken } from './authenticate/jwt';
import express from 'express';
import { PORT } from './config/constants';
import {routerPlace} from './routes/place';
import {routerUser} from './routes/user';
import { routerCategory } from './routes/category';
import { routerComment } from './routes/comment';
import { routerAdmin } from './routes/admin';
import { routerAccessibility } from './routes/accessibility';
import { routerFavorite } from './routes/favorite';
import { routerVisit } from './routes/visit';
import { routerFollow } from './routes/follow';
import { routerAuthenticate } from './routes/authenticate';

const app = express();
const allowOrigins = [`http://192.168.1.49:${PORT}`];

const options: cors.CorsOptions = {
    origin: allowOrigins
};

if(process.env.NODE_ENV !== 'production'){
    console.log('Le token JWT :', generateToken(1, "User1", "user-1@gmail.com", "Administrateur"));
}

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de l\'application mobile Glimpse',
            version: '1.0.0',
            description: 'Glimpse est une application mobile d\'exploration urbaine',
        },
        servers: [
            {
                url: `localhost:${PORT}`,
                description: 'Serveur de développement'
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);


app.use(cors())
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/place/show/:id', routerPlace);
app.get('/place/listall', routerPlace);
app.get('/place/count/:id', routerPlace);
app.get('/place/search', routerPlace);
app.post('/place/create', routerPlace);
app.put('/place/update/:id', routerPlace);
app.delete('/place/delete/:id', routerPlace);

app.post('/favorite', routerFavorite);
app.delete('/unfavorite', routerFavorite);

app.post('/visit', routerVisit);
app.delete('/unvisit', routerVisit);

app.get('/user/show/:id', routerUser);
app.get('/user/listall', routerUser);
app.get('/user/search', routerUser);
app.put('/user/update/:id', routerUser);

app.post('/follow', routerFollow);
app.delete('/unfollow', routerFollow);

app.get('/category/listall', routerCategory);
app.get('/category/listplaces/:id', routerCategory);

app.get('/accessibility/listall', routerAccessibility);

app.get('/comment/show/:id', routerComment);
app.get('/comment/place/:id', routerComment);
app.post('/comment/create', routerComment);
app.delete('/comment/delete/:id', routerComment);

app.use('/admin', routerAdmin);

app.post('/user/signin', routerAuthenticate);
app.post('/user/login', routerAuthenticate);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
