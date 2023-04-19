import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Favorite } from "../models/Favorite";

export class FavoriteController extends CrudController {
    public create(req: Request, res: Response): void {
        if (!req.body.usersId) {
            res.status(400).json({ error: "Missing usersId in request body" });
        }

        Favorite.create(req.body)
        .then((favorite) => res.json(favorite))
        .catch((err) => res.status(500).json(err));
    }

    public delete(req: Request, res: Response): void {
        Favorite.destroy({
            where: {
                usersId: req.body.usersId,
                placesId: req.body.placesId
            }
        })
        .then((favorite) => res.json(favorite))
        .catch((err) => res.status(500).json(err));
    }
}