import express from "express";
import { FollowController } from "../controllers/FollowController";
import * as Auth from '../middleware/authenticate';

const followController = new FollowController();

export const routerFollow = express.Router({
    strict:true
});

routerFollow.route('/follow').post(Auth.authorize(['Utilisateur', 'Administrateur']), followController.create);
routerFollow.route('/unfollow').delete(Auth.authorize(['Utilisateur', 'Administrateur']), followController.delete);