import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Place } from "../models/Place";
import { PicturePlace } from "../models/PicturePlace";
import { Category } from "../models/Category";
import { Accessibility } from "../models/Accessibility";
import sequelize, { Op, where } from "sequelize";

export class CategoryController extends CrudController {

    // Get all categories
    public listAll(req: Request, res: Response): void {
        Category.findAll({
            where: { is_active: true },
        })
            .then((categories) => res.json(categories))
            .catch(error => {
                console.log(error);
                res.send('no categories found');
            });
    }

    // Get all places by category id
    public listPlaces(req: Request, res: Response): void {
        Place.findAll({
            include: [
                {
                    model: PicturePlace,
                    attributes: ['url'],
                    limit: 1
                },
                {
                    model: Category,
                    attributes: ['label'],
                    where: { id: req.params.id, is_active: true }
                },
                {
                    model: Accessibility,
                    attributes: ['label']
                }
            ],
            where: { is_active: true },
        })
            .then((places) => res.json(places))
            .catch(error => {
                console.log(error);
                res.send('no places found');
            });
    }
}