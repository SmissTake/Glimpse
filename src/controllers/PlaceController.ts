import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { User } from "../models/User";
import { Place } from "../models/Place";
import { PicturePlace } from "../models/PicturePlace";
import { Category } from "../models/Category";
import { Accessibility } from "../models/Accessibility";
import { Comment } from "../models/Comment";
import { PictureComment } from "../models/PictureComment";
import { Favorite } from "../models/Favorite";

export class PlaceController extends CrudController{

    //Get all about a place by id
    public read(req: Request, res: Response): void{
        Place.findByPk(req.params.id, {
            include: [
                {
                    model: PicturePlace,
                    attributes: ['url']
                },
                {
                    model: User,
                    attributes: ['id', 'pseudonym', 'avatar']
                },
                {
                    model: Category,
                    attributes: ['label']
                },
                {
                    model: Accessibility,
                    attributes: ['label']
                },
                {
                    model: Comment,
                    attributes: ['comment', 'created_at'],
                    include: [
                        {
                            model: PictureComment,
                            attributes: ['url']
                        }
                    ]
                }
            ]
        })
        .then((place) => res.json(place))
        .catch(error => {
            console.log(error);
            res.send('no place found');
        });
    }

    // Get id, title, created_at, pictures, user id and pseudonym, category label, accessibility label of all places
    public listAll(req: Request, res: Response): void{
        Place.findAll({ 
            attributes: ['id', 'title', 'created_at'],
            include: [
                {
                    model: PicturePlace,
                    attributes: ['url']
                },
                {
                    model: User,
                    attributes: ['id', 'pseudonym']
                },
                {
                    model: Category,
                    attributes: ['label']
                },
                {
                    model: Accessibility,
                    attributes: ['label']
                }
            ]
        })
        .then((place) => res.json(place))
        .catch(error => {
            console.log(error)
            res.send('no places found');
        });
    }
}