import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Visite } from "../models/Visite";

export class VisiteController extends CrudController {
    public create(req: Request, res: Response): void {
        if (!req.body.usersId) {
            res.status(400).json({ error: "Missing usersId in request body" });
        }

        Visite.create(req.body)
        .then((visite) => res.json(visite))
        .catch((err) => res.status(500).json(err));
    }

    public delete(req: Request, res: Response): void {
        Visite.destroy({
            where: {
                usersId: req.body.usersId,
                placesId: req.body.placesId
            }
        })
        .then((visite) => res.json(visite))
        .catch((err) => res.status(500).json(err));
    }
}