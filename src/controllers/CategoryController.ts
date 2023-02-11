import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Place } from "../models/Place";
import { PicturePlace } from "../models/PicturePlace";
import { Category } from "../models/Category";
import { Accessibility } from "../models/Accessibility";
import sequelize, { Op } from "sequelize";

export class CategoryController extends CrudController {

    // Get all categories
    public listAll(req: Request, res: Response): void {
        Category.findAll()
            .then((categories) => res.json(categories))
            .catch(error => {
                console.log(error);
                res.send('no categories found');
            });
    }
}