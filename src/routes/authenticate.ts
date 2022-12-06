import express from "express";
import { AuthenticateController } from '../controllers/AuthenticationController';
import * as Auth from '../middleware/authenticate';

const authenticateController = new AuthenticateController();

export const routerAuthenticate = express.Router({
    strict:true
});

routerAuthenticate.route('/user/signin').post(authenticateController.signin);
routerAuthenticate.route('/user/login').post(authenticateController.login);
