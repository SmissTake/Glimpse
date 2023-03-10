import express from "express";
import { UserController } from '../controllers/UserController';

const userController = new UserController();

export const routerUser = express.Router({
    strict:true
});

routerUser.route('/user/show/:id').get(userController.read);
routerUser.route('/user/listall').get(userController.listAll);
routerUser.route('/user/search').get(userController.search);
routerUser.route('/user/update/:id').put(userController.update);