import express from 'express';
import AdminJSExpress from '@adminjs/express';
import AdminJS from 'adminjs';
import MySQLStore from 'express-mysql-session';
import session from 'express-session'

const admin = new AdminJS({})

const DEFAULT_ADMIN = {
    email: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  }
console.log(DEFAULT_ADMIN)

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

const options = {
    host: 'localhost',
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
  };
  
  // create a new session store with the options
  const sessionStore = new MySQLStore(options);

export const routerAdmin = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
);

// Mount the admin router at '/admin'
const app = express();
app.use('/admin', routerAdmin);
