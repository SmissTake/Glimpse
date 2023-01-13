import express from "express";
import { PlaceController } from '../controllers/PlaceController';

const placeController = new PlaceController();

export const routerPlace = express.Router({
    strict:true
});

routerPlace.route('/place/show/:id').get(placeController.read);
routerPlace.route('/place/listall').get(placeController.listAll);
routerPlace.route('/place/count/:id').get(placeController.count);