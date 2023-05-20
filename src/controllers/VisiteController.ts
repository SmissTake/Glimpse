import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Visite } from "../models/Visite";
import { validateToken } from "../authenticate/jwt";

export class VisiteController extends CrudController {
    public create(req: Request, res: Response): void {
        const token = req.headers.authorization?.split(' ')[1];
        validateToken(token!)
        .then(decoded => {
            const usersId = decoded.usersId;
            const visite = req.body;
            visite.usersId = usersId;
            Visite.create(visite)
            .then((visite) => res.json(visite))
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
            Visite.destroy({
                where: {
                    usersId: usersId,
                    placesId: placesId
                }
            })
            .then((visite) => res.json(visite))
            .catch((err) => res.status(500).json(err));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "Error unliking place"});
        });
    }
}