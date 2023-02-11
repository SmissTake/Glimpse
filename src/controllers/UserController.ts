import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { User } from "../models/User";
import { Place } from "../models/Place";
import { PicturePlace } from "../models/PicturePlace";
import { Category } from "../models/Category";
import { Accessibility } from "../models/Accessibility";
import sequelize, { Op } from "sequelize";


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

    // Get id, pseudonym, avatar of all users
    public listAll(req: Request, res: Response): void{
        User.findAll({ 
            attributes: ['id', 'pseudonym', 'avatar']
        })
        .then((users) => res.json(users))
        .catch(error => {
            console.log(error);
            res.send('no users found');
        });
    }

    // Update a user by id
    public update(req: Request, res: Response): void{
        User.update(req.body, {
            where: { id: req.params.id }
        })
        .then(() => res.send('user updated'))
        .catch(error => {
            console.log(error);
            res.send('user not updated');
        });
    }

    // Search a user with parameters query, limit and offset
    public search(req: Request, res: Response): void{
        const searchQuery = req.body.query || "";
        const limit = parseInt(req.body.limit) || 20;
        const offset = parseInt(req.body.offset) || 0;
        if (typeof searchQuery !== "string" || !searchQuery.length || isNaN(limit) || isNaN(offset)) {
            res.status(400).json({ message: "Invalid limit or offset value, or no query" });
        }
        User.findAll({
            attributes: ['id', 'pseudonym', 'avatar'],
            where: {
                pseudonym: {
                    [Op.like]: '%' + searchQuery + '%'
                },
                biography: {
                    [Op.like]: '%' + searchQuery + '%'
                }
            },
            limit: limit,
            offset: offset,
        })
        .then((users) => res.json(users))
        .catch(error => {
            console.log(error);
            res.send('no users found');
        });
    }
}