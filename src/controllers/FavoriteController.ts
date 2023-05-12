import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Favorite } from "../models/Favorite";
import { validateToken } from "../authenticate/jwt";

export class FavoriteController extends CrudController {
    public create(req: Request, res: Response): void {
        const token = req.headers.authorization?.split(' ')[1];
        validateToken(token!)
        .then(decoded => {
            const usersId = decoded.usersId;
            const favorite = req.body;
            favorite.usersId = usersId;
            Favorite.create(favorite)
            .then((favorite) => res.json(favorite))
            .catch((err) => res.status(500).json(err));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error liking place"});
        });
    }

    public delete(req: Request, res: Response): void {
        const token = req.headers.authorization?.split(' ')[1];
        validateToken(token!)
        .then(decoded => {
            const usersId = decoded.usersId;
            const placesId = req.body.placesId;
            Favorite.destroy({
                where: {
                    usersId: usersId,
                    placesId: placesId
                }
            })
            .then((favorite) => res.json(favorite))
            .catch((err) => res.status(500).json(err));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "Error unliking place"});
        });
    }
}