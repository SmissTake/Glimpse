import express from "express";
import { PlaceController } from '../controllers/PlaceController';
import * as Auth from '../middleware/authenticate';

const placeController = new PlaceController();

export const routerPlace = express.Router({
    strict:true
});

routerPlace.route('/place/show/:id').get(placeController.read);
routerPlace.route('/place/listall').get(placeController.listAll);
routerPlace.route('/place/count/:id').get(placeController.count);
routerPlace.route('/place/search').get(placeController.search);
routerPlace.route('/place/create').post(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.create);
routerPlace.route('/place/update/:id').put(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.update);
routerPlace.route('/place/delete/:id').delete(Auth.authorize(['Utilisateur', 'Administrateur']), placeController.delete);