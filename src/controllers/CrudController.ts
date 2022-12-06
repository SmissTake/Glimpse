import { Request, Response } from 'express';
 
export abstract class CrudController {
    create(req: Request, res: Response): void {
        throw new Error("Method create not implemented.");
    };
   
    read(req: Request, res: Response): void{
        throw new Error("Method read not implemented.");
    };
   
    update(req: Request, res: Response):void {
        throw new Error("Method update not implemented.");
    }
   
   
    delete(req: Request, res: Response): void {
        throw new Error("Method delete not implemented.");
    }
}