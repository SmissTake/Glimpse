import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Follow } from "../models/Follow";

export class FollowController extends CrudController {
    public create(req: Request, res: Response): void {
        if (!req.body.followerId) {
            res.status(400).json({ error: "Missing followerId in request body" });
        }

        Follow.create(req.body)
        .then((follow) => res.json(follow))
        .catch((err) => res.status(500).json(err));
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