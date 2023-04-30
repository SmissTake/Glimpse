import express from "express";
import { VisiteController } from "../controllers/VisiteController";
import * as Auth from '../middleware/authenticate';

const visitController = new VisiteController();

export const routerVisit = express.Router({
    strict:true
});

routerVisit.route('/visit').post(Auth.authorize(['Utilisateur', 'Administrateur']), visitController.create);
routerVisit.route('/unvisit').delete(Auth.authorize(['Utilisateur', 'Administrateur']), visitController.delete);