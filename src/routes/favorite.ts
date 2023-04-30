import express from "express";
import { FavoriteController } from "../controllers/FavoriteController";
import * as Auth from '../middleware/authenticate';

const favoriteController = new FavoriteController();

export const routerFavorite = express.Router({
    strict:true
});

routerFavorite.route('/favorite').post(Auth.authorize(['Utilisateur', 'Administrateur']), favoriteController.create);
routerFavorite.route('/unfavorite').delete(Auth.authorize(['Utilisateur', 'Administrateur']), favoriteController.delete);