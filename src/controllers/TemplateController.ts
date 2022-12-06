import { Request, Response } from "express";
import { ModelTemplate } from "../models/ModelTemplate";
import { CrudController } from "./CrudController";
import { User } from "../models/UserTemplate";

export class TemplateController extends CrudController{
    public read(req: Request, res: Response): void{
        ModelTemplate.findByPk(req.params.id)
        .then((template) => res.json(template))
        .catch(error => {
            console.log(error);
            res.send('no template found');
        });
    }

    public showOne(req: Request, res: Response): void{
        ModelTemplate.findOne({ where: { name:req.params.name } })
        .then((template) => res.json(template))
        .catch(error => {
            console.log(error)
            res.send('no template found');
        });
    }

    public list(req: Request, res: Response): void{
        ModelTemplate.findOne({ where: { id:req.params.id }, include:[User] })
        .then((template) => res.json(template))
        .catch(error => {
            console.log(error)
            res.send('no template found');
        });
    }

    public create(req: Request, res: Response): void {
        ModelTemplate.create(req.body)
        .then(template => res.json(template))
        .catch(err => {
            console.log(err);
            res.json({"message":"Insertion impossible"});
        });
    }

    public update(req: Request, res: Response): void {
        let id = req.params.id;
        let templateUpdate = req.body;

        ModelTemplate.findByPk(id)
        .then(template => {
            if (template !== null){
                template.set(templateUpdate);
                template.save();
                res.json({"message":"Modification effectué"});
            }
            else{
                res.json({"message":"no template with id : $(id)"})
            }

        })
        .catch(err => {
            console.log(err);
            res.json({"message":"Modification impossible"});
        })
    }
}