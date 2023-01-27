import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { User } from "../models/User";
import { Place } from "../models/Place";
import { PicturePlace } from "../models/PicturePlace";
import { Category } from "../models/Category";
import { Accessibility } from "../models/Accessibility";


export class UserController extends CrudController{

    //Get all about a user by id except password
    public read(req: Request, res: Response): void{
        User.findByPk(req.params.id, {
            attributes: { exclude: ['mail', 'password', 'permissionsId'] },
            include: [
                {
                    model: Place,
                    as: 'FavoritePlaces',
                    attributes: ['id', 'title', 'created_at'],
                    include: [
                        {
                            model: PicturePlace,
                            attributes: ['url'],
                            limit: 1
                        },
                        {
                            model: Category,
                            attributes: ['label']
                        },
                        {
                            model: Accessibility,
                            attributes: ['label']
                        }
                    ],
                    through: { attributes: [] },
                },
                {
                    model: Place,
                    as: 'posted',
                    attributes: ['id', 'title', 'created_at'],
                    include: [
                        {
                            model: PicturePlace,
                            attributes: ['url'],
                            limit: 1
                        },
                        {
                            model: Category,
                            attributes: ['label']
                        },
                        {
                            model: Accessibility,
                            attributes: ['label']
                        }
                    ],
                }
            ]
        })
        .then((user) => res.json(user))
        .catch(error => {
            console.log(error);
            res.send('no user found');
        });
    }
}