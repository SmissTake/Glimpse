import { Request, Response } from "express";
import { CrudController } from "./CrudController";
import { Accessibility } from "../models/Accessibility";

export class AccessibilityController extends CrudController {
    // Get all accessibilities
    public listAll(req: Request, res: Response): void {
        Accessibility.findAll()
            .then((accessibilities) => res.json(accessibilities))
            .catch(error => {
                console.log(error);
                res.send('no accessibilities found');
            });
    }
}