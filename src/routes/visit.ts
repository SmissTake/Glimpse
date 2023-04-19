import express from "express";
import { VisiteController } from "../controllers/VisiteController";

const visitController = new VisiteController();

export const routerVisit = express.Router({
    strict:true
});

routerVisit.route('/visit').post(visitController.create);
routerVisit.route('/unvisit').delete(visitController.delete);