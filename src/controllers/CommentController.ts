import { Request, Response, response } from "express";
import { CrudController } from "./CrudController";
import { Comment } from "../models/Comment";
import { PictureComment } from "../models/PictureComment";
import multer, { FileFilterCallback } from "multer";

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

    //Get all comments by place id
    public readAllByPlaceId (req: Request, res: Response): void {
        Comment.findAll({
            where: { placesId: req.params.id },
            include: [
                {
                    model: PictureComment,
                    attributes: ['url']
                }
            ]
        })
        .then((comments) => res.json(comments))
        .catch(error => {
            console.log(error);
            res.send('no comments found');
        });
    }

    //Create a comment with pictures (if any)
    public create (req: Request, res: Response): void {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/comments');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        });
        const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        };
        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        }).array('pictures', 5);
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error uploading pictures" });
            } else {
                const comment = req.body;
                Comment.create(comment)
                .then((comment) => {
                    const pictures: Express.Multer.File[] = req.files as Express.Multer.File[];
                    if(pictures){
                        pictures.forEach((picture : Express.Multer.File) => {
                            PictureComment.create({
                                url: picture.path,
                                commentsId: comment.id
                            });
                        });
                    }
                    res.json(comment);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: "Error creating comment" });
                });
            }
        });
    }

    // Delete a comment by id
    public delete (req: Request, res: Response): void {
        Comment.findByPk(req.params.id)
        .then((comment) => {
            if(comment){
                PictureComment.findAll({
                    where: { commentsId: comment.id }
                })
                .then((pictures) => {
                    pictures.forEach((picture) => {
                        picture.destroy();
                    });
                    comment.destroy();
                    res.json(comment);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ message: "Error deleting pictures" });
                });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting comment" });
        });
    }
}