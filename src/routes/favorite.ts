import express from "express";
import { FavoriteController } from "../controllers/FavoriteController";

const favoriteController = new FavoriteController();

export const routerFavorite = express.Router({
    strict:true
});

routerFavorite.route('/favorite').post(favoriteController.create);
routerFavorite.route('/unfavorite').delete(favoriteController.delete);