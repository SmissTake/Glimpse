import { Request, Response, response } from "express";
import { CrudController } from "./CrudController";
import { Comment } from "../models/Comment";
import { PictureComment } from "../models/PictureComment";

export class CommentController extends CrudController {

    //Get a comment by id
    public read (req: Request, res: Response): void {
        Comment.findByPk(req.params.id, {
            include: [
                {
                    model: PictureComment,
                    attributes: ['url']
                }
            ]
        })
        .then((comment) => res.json(comment))
        .catch(error => {
            console.log(error);
            res.send('no comment found');
        });
    }
}