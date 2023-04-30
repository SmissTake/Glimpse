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
import sequelize, { Op } from "sequelize";
import multer, { FileFilterCallback } from "multer";
import { validateToken } from "../authenticate/jwt";

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
                    as: 'postedBy',
                    attributes: ['id', 'pseudonym', 'avatar']
                },
                {
                    model: Category,
                    attributes: ['label'],
                    where: { is_active: true },
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
                        },
                        {
                            model: User,
                            as: 'postedBy',
                            attributes: ['id', 'pseudonym', 'avatar']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'FavoriteUsers',
                    attributes: ['id']
                },
            ],
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
                    as: 'postedBy',
                    attributes: ['id', 'pseudonym', 'avatar']
                },
                {
                    model: Category,
                    attributes: ['label'],
                    where: { is_active: true },
                },
                {
                    model: Accessibility,
                    attributes: ['label']
                },
                {
                    model: User,
                    as: 'FavoriteUsers',
                    attributes: ['id']
                }
            ],
            where: { is_active: true },
        })
        .then((place) => res.json(place))
        .catch(error => {
            console.log(error)
            res.send('no places found');
        });
    }

    // Count active places by category
    public count(req: Request, res: Response): void {
        Place.count({
            include: [
                {
                  model: User,
                  as: 'FavoriteUsers',
                  where: { id: req.params.id }
                },
                {
                  model: Category
                }
              ],
              where: { is_active: true },
              group: ['Category.id']
            })
    }

    // Create a place using multer to upload pictures
    public create(req: Request, res: Response): void {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/places');
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
                const token = req.headers.authorization?.split(' ')[1]; // assuming the token is in the Authorization header
                validateToken(token!)
                .then(decoded => {
                    const usersId = decoded.usersId;
                    const place = req.body;
                    place.usersId = usersId;
                    Place.create(place)
                    .then((place) => {
                        const pictures: Express.Multer.File[] = req.files as Express.Multer.File[];
                        if(pictures){
                            pictures.forEach((picture : Express.Multer.File) => {
                                PicturePlace.create({
                                    url: picture.path,
                                    placesId: place.id
                                });
                            });
                        }
                        res.json(place);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ message: "Error creating place" });
                    });
                })
            }
        });
    }

// Search a place with parameters query, limit and offset
public search(req: Request, res: Response): void {
    const searchQuery = req.body.query || "";
    const limit = parseInt(req.body.limit) || 20;
    const offset = parseInt(req.body.offset) || 0;
    if (typeof searchQuery !== "string" || !searchQuery.length || isNaN(limit) || isNaN(offset)) {
        res.status(400).json({ message: "Invalid limit or offset value, or no query" });
    }
    Place.findAll({
        limit: limit,
        offset: offset,
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${searchQuery}%` } },
                { description: { [Op.like]: `%${searchQuery}%` } },
                { history: { [Op.like]: `%${searchQuery}%` } },
                { keyword: { [Op.like]: `%${searchQuery}%` } }
            ],
            where: { is_active: true },
        }
    })
    .then((places) => {
        res.json(places);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error searching places" });
    });
}

    // Delete a place
    public delete(req: Request, res: Response): void{
        Place.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((place) => res.json(place))
        .catch(error => {
            console.log(error);
            res.send('no place deleted');
        }
        );
    }

    // Update a place
    public update(req: Request, res: Response): void {
        let id = req.params.id;
        let placeUpdate = req.body;

        Place.findByPk(id)
        .then(place => {
            if (place !== null){
                place.set(placeUpdate);
                place.save();
                res.json({"message":"Place updated"});
            }
            else{
                res.json({"message":"no place with id : $(id)"});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({"message":"Update failed"});
        })
    }
}