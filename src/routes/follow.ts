import express from "express";
import { FollowController } from "../controllers/FollowController";

const followController = new FollowController();

export const routerFollow = express.Router({
    strict:true
});

routerFollow.route('/follow').post(followController.create);
routerFollow.route('/unfollow').delete(followController.delete);