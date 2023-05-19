import { JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * création du token JWT
 */
export function generateToken(usersId:number, pseudonym:String, userMail:String, role:String) {
    // Les informations que l'on souhaite enregistrer dans le token
    const payload = {
        usersId: usersId,
        name: pseudonym,
        mail: userMail,
        // Les accès à l'API que l'on souhaite ouvrir à ce partenaire
        accessTypes: [
            role
        ]
    };
    // Lecture du fichier private.key permettant de crypter le JWT
    const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key'));

    const signInOptions: SignOptions = {
        // RS256 utilises une paire de clé public/privée key.
        algorithm: 'RS256',
        // Durée de validité du token
        expiresIn: '10h'
    };

    // generation du token JWT
    // Note: la passphrase devrait être dans le .env
    return sign(payload, { key: privateKey, passphrase: process.env.PASSPHRASE! }, signInOptions);
}

interface TokenPayload {
    exp: number;
    accessTypes: string[];
    name: string;
    usersId: number;
}

/**
 * Vérifie que le token JWT est valide
 *
 * @param token Le token JWT à valider
 * @return Promise<TokenPayload> Une promesse contenant les éléments utiles (le payload) contenu dans le token
 */
export function validateToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));

    return new Promise(function (resolve, reject) {
        verify(token, publicKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded as TokenPayload);
        });
    });
}