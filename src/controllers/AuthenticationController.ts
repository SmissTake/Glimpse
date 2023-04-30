import { compare, hash } from "bcrypt";
import status from "http-status";
import { generateToken } from "../authenticate/jwt";
import { BCRYPT_ROUND } from "../config/constants";
import { Permission } from "../models/Permission";
import { User } from "../models/User";
import { CrudController } from "./CrudController";

export class AuthenticateController extends CrudController {

    //Inscription
    public signin(req: Request, res: Response):void{
        let userInfo = req.body!;
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

    //Authentification
    public async login (req: Request, res: Response):Promise<void>{
        const plainPassword = req.body!.password;
        const mail = req.body!.mail;

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
        
        res.status(status.OK).json({'token':generateToken(user.id, user.pseudonym, user.mail, permission.role)});
    }
}