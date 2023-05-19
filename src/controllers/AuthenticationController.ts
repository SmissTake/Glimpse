import { compare, hash } from "bcrypt";
import status from "http-status";
import { generateToken, validateToken } from "../authenticate/jwt";
import { BCRYPT_ROUND } from "../config/constants";
import { Permission } from "../models/Permission";
import { User } from "../models/User";
import { CrudController } from "./CrudController";
import { Request, Response } from 'express';

export class AuthenticateController extends CrudController {

    //Inscription
    public signin(req: Request, res: Response):void{
        let userInfo = req.body!;
        if (userInfo.password === undefined || userInfo.mail === undefined || userInfo.pseudonym === undefined) {
            res.json({"message":"Insertion impossible"});
        } else {
            hash(userInfo.password, BCRYPT_ROUND)
            .then(hashedPassword =>{
                userInfo.password = hashedPassword;

                User.create(userInfo, {fields:['pseudonym', 'mail', 'password']})
                .then(user =>{
                    let pseudonym = user.pseudonym;
                    let msg = `L'utilisateur ${pseudonym} a bien été ajouté`;
                    res.json({"message": msg});
                })
                .catch(err => {
                    console.log(err);
                    res.json({"message":"Insertion impossible 1"});
                })
            })
            .catch(err =>{
                console.log(err);
                res.json({"message":"Insertion impossible"});
            });
        }
    }

    //Authentification
    public async login (req: Request, res: Response):Promise<void>{
        const plainPassword = req.body!.password;
        const mail = req.body!.mail;

        if (plainPassword === undefined || mail === undefined) {
            res.status(status.UNAUTHORIZED).json('Invalid credentials 0');
        } else {
            const user = await User.findOne({ where: {mail:mail}});
    
            if(user === null){
                res.status(status.UNAUTHORIZED).json('Invalid credentials 1');
                return;
            }
    
            const bMatch = await compare(plainPassword, user!.password);
            if(!bMatch){
                res.status(status.UNAUTHORIZED).json('Invalid credentials 2');
            }
    
            const permission = await Permission.findByPk(user.permissionsId);
            if(permission === null){
                res.status(status.UNAUTHORIZED).json('Invalid credentials 3');
                return;
            }
            
            res.status(status.OK).json({
                'id':user.id,
                'token':generateToken(user.id, user.pseudonym, user.mail, permission.role)
            });
        }
    }

    public verifyToken(req: Request, res: Response){
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            validateToken(token)
                .then(decoded => {
                    return res.status(200).json({ message: 'Token is valid' });
                })
                .catch(err => {
                    return res.status(401).json({ message: 'Invalid token' });
                }
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}