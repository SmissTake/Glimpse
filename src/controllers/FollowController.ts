import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Follow } from "../models/Follow";
import { validateToken } from "../authenticate/jwt";

export class FollowController extends CrudController {
    public create(req: Request, res: Response): void {
        const token = req.headers.authorization?.split(' ')[1];
        validateToken(token!)
        .then(decoded => {
            const followerId = decoded.usersId;
            if (!req.body.followingId) {
                res.status(400).json({ error: "Missing followingId in request body" });
            }
            else {
                const follow = {
                    followingId : req.body.followingId,
                    followerId : followerId
                };
                Follow.create(follow)
                .then((follow) => res.json(follow))
                .catch((err) => res.status(500).json(err));
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error following user"});
        });
    }

    public delete(req: Request, res: Response): void {
        Follow.destroy({
            where: {
                followerId: req.body.followerId,
                followingId: req.body.followingId
            }
        })
        .then((follow) => res.json(follow))
        .catch((err) => res.status(500).json(err));
    }
}